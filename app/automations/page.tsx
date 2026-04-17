import Link from "next/link";
import {
  CalendarCheck2,
  MessageSquare,
  UserPlus,
  Users,
  Workflow,
} from "lucide-react";
import {
  estadoLabel,
  fetchActiveSessions,
  fetchLeadByPhone,
  fetchLeadCountsByEstado,
  fetchRecentLeads,
  fetchN8nWorkflows,
  fetchWhapiHealth,
  formatPhone,
  formatRelative,
  LEAD_ACTIVE_SET,
} from "@/lib/automations";
import { StatCard, StatusDot } from "@/components/automations/stat-card";
import { EstadoBadge } from "@/components/automations/estado-badge";

export const dynamic = "force-dynamic";

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("automations fetch error:", err);
    return fallback;
  }
}

export default async function AutomationsDashboard() {
  const [counts, recentLeads, sessions, workflows, whapi] = await Promise.all([
    safeFetch(fetchLeadCountsByEstado, {} as Record<string, number>),
    safeFetch(() => fetchRecentLeads(7, 10), []),
    safeFetch(fetchActiveSessions, []),
    safeFetch(fetchN8nWorkflows, [] as Awaited<
      ReturnType<typeof fetchN8nWorkflows>
    >),
    safeFetch(fetchWhapiHealth, { status: "unknown" }),
  ]);

  const totalLeads = Object.values(counts).reduce((a, b) => a + b, 0);
  const nuevos = counts["nuevo"] || 0;
  const conversando = counts["conversando"] || 0;
  const agendados = counts["cita_agendada"] || 0;

  // Cross-reference sessions with active leads
  const activeSessions: Array<{
    session_id: string;
    last_id: number;
    msg_count: number;
    lead?: Awaited<ReturnType<typeof fetchLeadByPhone>>;
  }> = [];
  for (const s of sessions.slice(0, 10)) {
    const lead = await safeFetch(() => fetchLeadByPhone(s.session_id), null);
    if (lead && LEAD_ACTIVE_SET.has(lead.estado || "")) {
      activeSessions.push({ ...s, lead });
    }
  }

  const mainWorkflows = workflows.filter((w) => w.name.startsWith("FLUJO"));
  const activeWf = mainWorkflows.filter((w) => w.active).length;
  const whapiOk = /^(AUTH|ready|ok|connected|authenticated)$/i.test(
    whapi.status
  );

  return (
    <div className="space-y-8">
      {/* Stats grid */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Resumen
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Leads totales"
            value={totalLeads}
            hint="En base de datos"
            icon={Users}
            accent="text-white"
          />
          <StatCard
            label="Nuevos"
            value={nuevos}
            hint="Sin contactar"
            icon={UserPlus}
            accent="text-blue-400"
          />
          <StatCard
            label="Conversando"
            value={conversando}
            hint="Con el agente IA"
            icon={MessageSquare}
            accent="text-amber-400"
          />
          <StatCard
            label="Citas agendadas"
            value={agendados}
            hint="Confirmadas"
            icon={CalendarCheck2}
            accent="text-green-400"
          />
        </div>
      </section>

      {/* System health */}
      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Estado del sistema
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <Workflow className="h-5 w-5 text-zinc-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">n8n</p>
                <p className="text-xs text-zinc-500">
                  {activeWf} de {mainWorkflows.length} flujos activos
                </p>
              </div>
              <StatusDot
                status={
                  mainWorkflows.length === 0
                    ? "error"
                    : activeWf > 0
                      ? "ok"
                      : "warn"
                }
              />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-zinc-400" />
              <div className="flex-1">
                <p className="text-sm font-medium">WhatsApp (Whapi)</p>
                <p className="text-xs text-zinc-500">
                  {whapiOk
                    ? whapi.channel
                      ? `Canal ${whapi.channel}`
                      : "Canal conectado"
                    : `Estado: ${whapi.status}`}
                </p>
              </div>
              <StatusDot status={whapiOk ? "ok" : "error"} />
            </div>
          </div>

          <Link
            href="/automations/status"
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center text-sm text-zinc-400 hover:border-zinc-700 hover:text-white transition-colors"
          >
            Ver detalle completo →
          </Link>
        </div>
      </section>

      {/* Active conversations */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Conversaciones activas
          </h2>
          <Link
            href="/automations/leads"
            className="text-xs text-amber-400 hover:text-amber-300"
          >
            Ver todos los leads →
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          {activeSessions.length === 0 ? (
            <p className="p-8 text-center text-sm text-zinc-500">
              No hay conversaciones activas en este momento.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Lead</th>
                  <th className="px-4 py-3 text-left font-medium">Teléfono</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-center font-medium">
                    Mensajes
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    Últ. contacto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {activeSessions.map((s) => (
                  <tr key={s.session_id} className="hover:bg-zinc-800/40">
                    <td className="px-4 py-3">
                      <Link
                        href={`/automations/leads/${s.lead!.id}`}
                        className="font-medium text-white hover:text-amber-300"
                      >
                        {s.lead!.nombre || "Sin nombre"}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-mono text-xs">
                      {formatPhone(s.lead!.telefono)}
                    </td>
                    <td className="px-4 py-3">
                      <EstadoBadge estado={s.lead!.estado} />
                    </td>
                    <td className="px-4 py-3 text-center text-zinc-400">
                      {s.msg_count}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-500 text-xs">
                      {formatRelative(s.lead!.ultimo_contacto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Recent leads */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Leads recientes (7 días)
          </h2>
          <span className="text-xs text-zinc-600">{recentLeads.length}</span>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          {recentLeads.length === 0 ? (
            <p className="p-8 text-center text-sm text-zinc-500">
              No hay leads en los últimos 7 días.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {recentLeads.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/automations/leads/${l.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-500/20 to-zinc-700 flex items-center justify-center text-xs font-medium text-amber-300">
                        {(l.nombre || "?").slice(0, 1).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {l.nombre || "Sin nombre"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {l.descripcion_tatuaje?.slice(0, 60) ||
                            "Sin descripción"}
                          {(l.descripcion_tatuaje?.length || 0) > 60 && "…"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <EstadoBadge estado={l.estado} />
                      <span className="text-xs text-zinc-500 w-16 text-right">
                        {formatRelative(l.fecha_entrada)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
