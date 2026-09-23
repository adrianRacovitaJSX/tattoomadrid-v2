/**
 * Registro de leads en Supabase desde la web.
 *
 * La web es la responsable de que el lead quede guardado para la gestión
 * (panel /panel). No envía WhatsApp ni toca Whapi: de eso se ocupan los
 * flujos de n8n, que trabajan de forma independiente sobre esta misma tabla.
 */

export type NuevoLead = {
  nombre: string;
  telefono: string;
  email: string;
  descripcion_tatuaje: string;
  fuente: string;
  canal: string;
  plataforma: string | null;
  campana: string | null;
  atribucion: Record<string, unknown>;
};

export type ResultadoLead =
  | { ok: true; accion: "creado" | "actualizado"; id: number | null }
  | { ok: false; error: string };

/** Ventana en la que una nueva consulta del mismo teléfono se considera el mismo lead. */
const VENTANA_DUPLICADO_MS = 30 * 24 * 60 * 60 * 1000;

/** Estados en los que no se reutiliza el lead: ese ciclo ya se cerró. */
const ESTADOS_CERRADOS = new Set(["completado", "perdido"]);

function supabase(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function headers(key: string, extra: Record<string, string> = {}) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

type LeadExistente = {
  id: number;
  estado: string | null;
  fecha_entrada: string | null;
  descripcion_tatuaje: string | null;
};

async function buscarPorTelefono(
  url: string,
  key: string,
  telefono: string
): Promise<LeadExistente | null> {
  const res = await fetch(
    `${url}/rest/v1/leads?select=id,estado,fecha_entrada,descripcion_tatuaje` +
      `&telefono=eq.${encodeURIComponent(telefono)}` +
      `&order=fecha_entrada.desc.nullslast&limit=1`,
    { headers: headers(key), signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const rows = (await res.json()) as LeadExistente[];
  return rows[0] ?? null;
}

function esReutilizable(lead: LeadExistente): boolean {
  if (ESTADOS_CERRADOS.has(lead.estado || "")) return false;
  if (!lead.fecha_entrada) return true;
  const t = new Date(lead.fecha_entrada).getTime();
  if (!Number.isFinite(t)) return true;
  return Date.now() - t < VENTANA_DUPLICADO_MS;
}

/**
 * Escribe la fila. Si las columnas de atribución todavía no existen
 * (migración sin aplicar), reintenta sin ellas para no perder el lead.
 */
async function escribir(
  url: string,
  key: string,
  base: Record<string, unknown>,
  atribucion: Record<string, unknown>,
  query: string,
  method: "POST" | "PATCH"
): Promise<Response> {
  const enviar = (row: Record<string, unknown>) =>
    fetch(`${url}/rest/v1/leads${query}`, {
      method,
      headers: headers(key, { Prefer: "return=representation" }),
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8000),
    });

  let res = await enviar({ ...base, ...atribucion });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.warn(
      "Lead: escritura con atribución falló, reintento sin esas columnas:",
      res.status,
      text.slice(0, 300)
    );
    res = await enviar(base);
  }
  return res;
}

/** Registra el lead. Nunca lanza: los fallos quedan en log. */
export async function registrarLead(lead: NuevoLead): Promise<ResultadoLead> {
  const conf = supabase();
  if (!conf) {
    console.error(
      "Lead no guardado: faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY",
      lead.telefono
    );
    return { ok: false, error: "Supabase no configurado" };
  }
  const { url, key } = conf;

  const atribucion = {
    fuente: lead.fuente,
    canal: lead.canal,
    plataforma: lead.plataforma,
    campana: lead.campana,
    atribucion: lead.atribucion,
  };

  try {
    const existente = await buscarPorTelefono(url, key, lead.telefono).catch((e) => {
      console.warn("Lead: no se pudo comprobar duplicados:", e);
      return null;
    });

    // ── Mismo teléfono con lead reciente aún abierto: se actualiza, no se duplica ──
    if (existente && esReutilizable(existente)) {
      const anterior = (existente.descripcion_tatuaje || "").trim();
      const nueva = lead.descripcion_tatuaje.trim();
      const descripcion =
        anterior && nueva && anterior !== nueva ? `${anterior} | ${nueva}` : nueva || anterior;

      const res = await escribir(
        url,
        key,
        {
          nombre: lead.nombre || undefined,
          email: lead.email || undefined,
          descripcion_tatuaje: descripcion,
        },
        atribucion,
        `?id=eq.${existente.id}`,
        "PATCH"
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Lead: error al actualizar:", res.status, text.slice(0, 500));
        return { ok: false, error: `Supabase ${res.status}` };
      }
      return { ok: true, accion: "actualizado", id: existente.id };
    }

    // ── Lead nuevo ──
    const res = await escribir(
      url,
      key,
      {
        nombre: lead.nombre,
        telefono: lead.telefono,
        email: lead.email,
        descripcion_tatuaje: lead.descripcion_tatuaje,
        estado: "nuevo",
        fecha_entrada: new Date().toISOString(),
        num_seguimientos: "0",
      },
      atribucion,
      "",
      "POST"
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Lead: error al crear:", res.status, text.slice(0, 500));
      return { ok: false, error: `Supabase ${res.status}` };
    }
    const rows = (await res.json().catch(() => [])) as Array<{ id?: number }>;
    return { ok: true, accion: "creado", id: rows[0]?.id ?? null };
  } catch (err) {
    console.error("Lead: fallo al registrar:", err);
    return { ok: false, error: err instanceof Error ? err.message : "Error desconocido" };
  }
}
