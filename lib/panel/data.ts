export type PanelLead = {
  id: number;
  nombre: string | null;
  telefono: string;
  email: string | null;
  descripcion_tatuaje: string | null;
  estado: string | null;
  fecha_entrada: string | null;
  fecha_cita: string | null;
  ultimo_contacto: string | null;
  precio_pagado: number | null;
  fecha_pago: string | null;
  fuente: string | null;
  canal: string | null;
  plataforma: string | null;
  campana: string | null;
};

export type PanelStats = {
  totalLeads: number;
  citasReservadas: number;
  completados: number;
  totalCobrado: number;
  cobradoEsteMes: number;
};

function supabaseUrl(): string {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error("SUPABASE_URL not set");
  return url.replace(/\/$/, "");
}

function supabaseHeaders(): Record<string, string> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function fetchPanelLeads(limit = 1000): Promise<PanelLead[]> {
  const res = await fetch(
    `${supabaseUrl()}/rest/v1/leads?select=*&order=fecha_entrada.desc.nullslast&limit=${limit}`,
    { headers: supabaseHeaders(), cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
  const rows = (await res.json()) as Array<Record<string, unknown>>;
  // select=* tolera que las columnas de pago y atribución aún no existan (pre-migración)
  return rows.map((r) => ({
    id: Number(r.id),
    nombre: (r.nombre as string) ?? null,
    telefono: String(r.telefono ?? ""),
    email: (r.email as string) ?? null,
    descripcion_tatuaje: (r.descripcion_tatuaje as string) ?? null,
    estado: (r.estado as string) ?? null,
    fecha_entrada: (r.fecha_entrada as string) ?? null,
    fecha_cita: (r.fecha_cita as string) ?? null,
    ultimo_contacto: (r.ultimo_contacto as string) ?? null,
    precio_pagado:
      r.precio_pagado === null || r.precio_pagado === undefined
        ? null
        : Number(r.precio_pagado),
    fecha_pago: (r.fecha_pago as string) ?? null,
    fuente: (r.fuente as string) ?? null,
    canal: (r.canal as string) ?? null,
    plataforma: (r.plataforma as string) ?? null,
    campana: (r.campana as string) ?? null,
  }));
}

export async function updatePanelLead(
  id: number,
  fields: Record<string, unknown>
): Promise<void> {
  const res = await fetch(`${supabaseUrl()}/rest/v1/leads?id=eq.${id}`, {
    method: "PATCH",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify(fields),
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
}

export function computeStats(leads: PanelLead[]): PanelStats {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let citasReservadas = 0;
  let completados = 0;
  let totalCobrado = 0;
  let cobradoEsteMes = 0;

  for (const l of leads) {
    if (l.estado === "cita_agendada") citasReservadas++;
    if (l.estado === "completado") completados++;
    if (l.precio_pagado && l.precio_pagado > 0) {
      totalCobrado += l.precio_pagado;
      if (l.fecha_pago && new Date(l.fecha_pago).getTime() >= monthStart) {
        cobradoEsteMes += l.precio_pagado;
      }
    }
  }

  return {
    totalLeads: leads.length,
    citasReservadas,
    completados,
    totalCobrado,
    cobradoEsteMes,
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
