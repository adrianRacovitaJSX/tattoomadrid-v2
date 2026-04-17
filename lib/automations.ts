export type Lead = {
  id: number;
  nombre: string | null;
  telefono: string;
  email: string | null;
  descripcion_tatuaje: string | null;
  estado: string | null;
  fecha_entrada: string | null;
  fecha_cita: string | null;
  ultimo_contacto: string | null;
  num_seguimientos: number | null;
};

export type ChatMessage = {
  id: number;
  session_id: string;
  message: {
    type: "human" | "ai" | "system";
    content: string;
    additional_kwargs?: Record<string, unknown>;
  };
};

export type Execution = {
  id: string;
  finished: boolean;
  mode: string;
  status: "success" | "error" | "waiting" | "running";
  startedAt: string;
  stoppedAt: string | null;
  workflowId: string;
};

const LEAD_ACTIVE_STATES = ["nuevo", "conversando", "cita_agendada"] as const;
export const LEAD_ACTIVE_SET = new Set<string>(LEAD_ACTIVE_STATES);

function supabaseUrl() {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error("SUPABASE_URL not set");
  return url.replace(/\/$/, "");
}

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

async function supabaseFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${supabaseUrl()}/rest/v1/${path}`, {
    headers: supabaseHeaders(),
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

export async function fetchLeads(limit = 50): Promise<Lead[]> {
  return supabaseFetch<Lead[]>(
    `leads?select=*&order=fecha_entrada.desc.nullslast&limit=${limit}`
  );
}

export async function fetchLeadById(id: string | number): Promise<Lead | null> {
  const rows = await supabaseFetch<Lead[]>(`leads?id=eq.${id}&select=*&limit=1`);
  return rows[0] ?? null;
}

export async function fetchLeadByPhone(phone: string): Promise<Lead | null> {
  const rows = await supabaseFetch<Lead[]>(
    `leads?telefono=eq.${encodeURIComponent(phone)}&select=*&limit=1`
  );
  return rows[0] ?? null;
}

export async function fetchChatBySession(
  sessionId: string
): Promise<ChatMessage[]> {
  return supabaseFetch<ChatMessage[]>(
    `n8n_chat_histories?session_id=eq.${encodeURIComponent(
      sessionId
    )}&select=*&order=id.asc`
  );
}

export async function fetchLeadCountsByEstado(): Promise<
  Record<string, number>
> {
  const leads = await supabaseFetch<Pick<Lead, "estado">[]>(
    `leads?select=estado`
  );
  const counts: Record<string, number> = {};
  for (const l of leads) {
    const key = l.estado || "desconocido";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export async function fetchRecentLeads(days = 7, limit = 20): Promise<Lead[]> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return supabaseFetch<Lead[]>(
    `leads?fecha_entrada=gte.${since}&select=*&order=fecha_entrada.desc&limit=${limit}`
  );
}

export async function fetchActiveSessions(): Promise<
  { session_id: string; last_id: number; msg_count: number }[]
> {
  const rows = await supabaseFetch<{ session_id: string; id: number }[]>(
    `n8n_chat_histories?select=session_id,id&order=id.desc`
  );
  const map = new Map<string, { last_id: number; msg_count: number }>();
  for (const r of rows) {
    const cur = map.get(r.session_id);
    if (!cur) {
      map.set(r.session_id, { last_id: r.id, msg_count: 1 });
    } else {
      cur.msg_count += 1;
    }
  }
  return Array.from(map, ([session_id, v]) => ({ session_id, ...v })).sort(
    (a, b) => b.last_id - a.last_id
  );
}

// --- n8n API ---

function n8nBase() {
  const url = process.env.N8N_API_URL;
  if (!url) throw new Error("N8N_API_URL not set");
  return url.replace(/\/$/, "");
}

function n8nHeaders() {
  const key = process.env.N8N_API_KEY;
  if (!key) throw new Error("N8N_API_KEY not set");
  return { "X-N8N-API-KEY": key, "Content-Type": "application/json" };
}

export async function fetchN8nWorkflows(): Promise<
  { id: string; name: string; active: boolean; updatedAt: string }[]
> {
  const res = await fetch(`${n8nBase()}/api/v1/workflows`, {
    headers: n8nHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`n8n ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as { data: Array<Record<string, unknown>> };
  return body.data.map((w) => ({
    id: String(w.id),
    name: String(w.name),
    active: Boolean(w.active),
    updatedAt: String(w.updatedAt),
  }));
}

export async function fetchN8nExecutions(
  workflowId?: string,
  limit = 50
): Promise<Execution[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (workflowId) params.set("workflowId", workflowId);
  const res = await fetch(
    `${n8nBase()}/api/v1/executions?${params.toString()}`,
    { headers: n8nHeaders(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`n8n ${res.status}: ${await res.text()}`);
  const body = (await res.json()) as { data: Execution[] };
  return body.data;
}

// --- Whapi ---

export async function fetchWhapiHealth(): Promise<{
  status: string;
  channel?: string;
}> {
  const token = process.env.WHAPI_TOKEN;
  if (!token) return { status: "not_configured" };
  try {
    const res = await fetch("https://gate.whapi.cloud/health", {
      headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return { status: `error_${res.status}` };
    const data = (await res.json()) as Record<string, unknown>;
    const rawStatus = data.status;
    const statusText =
      typeof rawStatus === "string"
        ? rawStatus
        : rawStatus && typeof rawStatus === "object"
          ? String(
              (rawStatus as Record<string, unknown>).text ||
                (rawStatus as Record<string, unknown>).code ||
                "unknown"
            )
          : "unknown";
    const user = data.user as Record<string, unknown> | undefined;
    const channel =
      (data.channel_name as string) ||
      (user?.name as string) ||
      (user?.phone as string) ||
      "";
    return { status: statusText, channel };
  } catch {
    return { status: "unreachable" };
  }
}

// --- Utilities ---

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("34") && digits.length === 11) {
    const rest = digits.slice(2);
    return `+34 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
  }
  return `+${digits}`;
}

export function formatRelative(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h}h`;
  const days = Math.floor(h / 24);
  if (days < 7) return `hace ${days}d`;
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
}

export function estadoLabel(estado: string | null): {
  label: string;
  color: string;
} {
  switch (estado) {
    case "nuevo":
      return { label: "Nuevo", color: "bg-blue-500/20 text-blue-400" };
    case "conversando":
      return { label: "Conversando", color: "bg-amber-500/20 text-amber-400" };
    case "cita_agendada":
      return { label: "Cita agendada", color: "bg-green-500/20 text-green-400" };
    case "no_contactar":
      return { label: "Opt-out", color: "bg-red-500/20 text-red-400" };
    case "pendiente_humano":
      return {
        label: "Humano",
        color: "bg-purple-500/20 text-purple-400",
      };
    default:
      return {
        label: estado || "—",
        color: "bg-zinc-500/20 text-zinc-400",
      };
  }
}
