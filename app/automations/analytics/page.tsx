import {
  CalendarCheck2,
  Euro,
  TrendingUp,
  UserX,
  Clock,
} from "lucide-react";
import { fetchAnalytics } from "@/lib/automations";
import { StatCard } from "@/components/automations/stat-card";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AnalyticsPage() {
  let data;
  let error: string | null = null;
  try {
    data = await fetchAnalytics();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
        <p className="font-medium">Error al cargar analytics</p>
        <p className="mt-1 text-xs opacity-80">{error}</p>
      </div>
    );
  }

  const maxDaily = Math.max(1, ...data.last30Days.map((d) => d.count));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Analítica</h2>
        <p className="text-sm text-zinc-500">
          Métricas de conversión, ingresos estimados y rendimiento del embudo
        </p>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue estimado"
          value={`${data.revenueEstimate.toLocaleString("es-ES")}€`}
          hint={`${data.agendadas} señales · ${data.completadas} completadas`}
          icon={Euro}
          accent="text-green-400"
        />
        <StatCard
          label="Citas agendadas"
          value={data.agendadas}
          hint="Activas en calendario"
          icon={CalendarCheck2}
          accent="text-amber-400"
        />
        <StatCard
          label="Tasa de no-show"
          value={`${data.noShowRate}%`}
          hint="Citas pasadas sin completar"
          icon={UserX}
          accent={data.noShowRate > 15 ? "text-red-400" : "text-zinc-200"}
        />
        <StatCard
          label="Tiempo a cita"
          value={`${data.avgDaysToCita}d`}
          hint="Media desde el primer contacto"
          icon={Clock}
          accent="text-blue-400"
        />
      </section>

      {/* Funnel */}
      <section>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Embudo de conversión
        </h3>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="space-y-3">
            {data.funnel.map((stage, i) => {
              const width = Math.max(5, stage.pct);
              const prev = i > 0 ? data.funnel[i - 1] : null;
              const dropOff =
                prev && prev.count > 0
                  ? Math.round(((prev.count - stage.count) / prev.count) * 100)
                  : 0;
              return (
                <div key={stage.key}>
                  <div className="flex items-center justify-between mb-1.5 text-sm">
                    <span className="font-medium text-zinc-200">
                      {stage.label}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      {i > 0 && dropOff > 0 && (
                        <span className="text-red-400/80">-{dropOff}%</span>
                      )}
                      <span className="font-mono text-zinc-300">
                        {stage.count}
                      </span>
                      <span className="font-mono w-12 text-right text-zinc-400">
                        {stage.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-8 bg-zinc-800/50 rounded-md overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        i === 0
                          ? "bg-blue-500/30"
                          : i === 1
                            ? "bg-cyan-500/40"
                            : i === 2
                              ? "bg-amber-500/40"
                              : i === 3
                                ? "bg-green-500/40"
                                : "bg-emerald-500/50"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Daily leads last 30 days */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Leads por día · últimos 30 días
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
            <TrendingUp className="h-3.5 w-3.5" />
            {data.last30Days.reduce((a, b) => a + b.count, 0)} en total
          </span>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex items-end gap-1.5 h-40">
            {data.last30Days.map((d) => {
              const h = (d.count / maxDaily) * 100;
              return (
                <div
                  key={d.date}
                  className="flex-1 flex flex-col items-center justify-end group"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-full mt-[-8px] text-[10px] text-zinc-400 pointer-events-none bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded whitespace-nowrap">
                    {d.date} · {d.count}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-amber-500/40 to-amber-400/60 rounded-t hover:from-amber-500/60 hover:to-amber-400/80 transition-colors"
                    style={{ height: `${h || 2}%`, minHeight: d.count > 0 ? "4px" : "2px" }}
                    title={`${d.date}: ${d.count}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-zinc-600 font-mono">
            <span>{data.last30Days[0]?.date.slice(5)}</span>
            <span>
              {data.last30Days[Math.floor(data.last30Days.length / 2)]?.date.slice(
                5
              )}
            </span>
            <span>{data.last30Days[data.last30Days.length - 1]?.date.slice(5)}</span>
          </div>
        </div>
      </section>

      {/* Notas */}
      <section>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-400">
          <p className="font-medium text-zinc-300 mb-2">Cómo se calculan los números</p>
          <ul className="space-y-1 text-xs text-zinc-500 list-disc list-inside">
            <li>
              Revenue estimado: <code>50€ × citas_agendadas + 150€ × citas_completadas</code> (ajustable)
            </li>
            <li>
              No-show: citas con <code>fecha_cita</code> en el pasado que siguen en <code>cita_agendada</code> (no se marcaron <code>completado</code>)
            </li>
            <li>
              Tiempo a cita: días entre <code>fecha_entrada</code> y <code>fecha_cita</code> para leads con cita
            </li>
            <li>
              Embudo: cada etapa incluye los leads que ya pasaron (acumulativo). El % es sobre leads no-opt-out
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
