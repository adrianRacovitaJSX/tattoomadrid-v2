import Link from "next/link";
import { CalendarCheck2, Clock, User } from "lucide-react";
import { fetchUpcomingCitas, formatPhone, type Lead } from "@/lib/automations";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Day = { date: Date; label: string; citas: Lead[] };

function buildDays(days = 14): Day[] {
  const out: Day[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    const d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const label = d.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
    out.push({ date: d, label, citas: [] });
  }
  return out;
}

export default async function CalendarPage() {
  let citas: Lead[] = [];
  let error: string | null = null;
  try {
    citas = await fetchUpcomingCitas(14);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  const days = buildDays(14);
  for (const cita of citas) {
    if (!cita.fecha_cita) continue;
    const d = new Date(cita.fecha_cita);
    const key = d.toISOString().slice(0, 10);
    const day = days.find((x) => x.date.toISOString().slice(0, 10) === key);
    if (day) day.citas.push(cita);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Calendario</h2>
        <p className="text-sm text-zinc-500">
          Próximas citas agendadas (14 días) · {citas.length} total
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {days.map((day) => {
          const isToday = day.date.toDateString() === new Date().toDateString();
          return (
            <div
              key={day.date.toISOString()}
              className={`rounded-xl border ${
                isToday
                  ? "border-amber-500/40 bg-amber-500/5"
                  : day.citas.length > 0
                    ? "border-zinc-700 bg-zinc-900/70"
                    : "border-zinc-800 bg-zinc-900/30"
              } p-4 min-h-[140px]`}
            >
              <div className="mb-3 flex items-center justify-between">
                <p
                  className={`text-sm font-medium capitalize ${
                    isToday ? "text-amber-300" : "text-zinc-200"
                  }`}
                >
                  {day.label}
                  {isToday && (
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-amber-400">
                      hoy
                    </span>
                  )}
                </p>
                {day.citas.length > 0 && (
                  <span className="text-xs text-zinc-500 font-mono">
                    {day.citas.length}
                  </span>
                )}
              </div>
              {day.citas.length === 0 ? (
                <p className="text-xs text-zinc-600 italic">Sin citas</p>
              ) : (
                <ul className="space-y-2">
                  {day.citas.map((c) => {
                    const hora = c.fecha_cita
                      ? new Date(c.fecha_cita).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "Europe/Madrid",
                        })
                      : "—";
                    return (
                      <li key={c.id}>
                        <Link
                          href={`/automations/leads/${c.id}`}
                          className="block rounded-md border border-zinc-800 bg-zinc-900 p-2.5 hover:border-zinc-700 hover:bg-zinc-800/60 transition-colors"
                        >
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Clock className="h-3 w-3" />
                            <span className="font-mono text-zinc-300">{hora}</span>
                          </div>
                          <p className="mt-1 text-sm font-medium text-white">
                            {c.nombre || "Sin nombre"}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-500 truncate">
                            {c.descripcion_tatuaje || formatPhone(c.telefono)}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-xs text-zinc-500">
        <CalendarCheck2 className="inline-block h-3.5 w-3.5 mr-1.5" />
        Solo se muestran citas con estado <code>cita_agendada</code>. Las que ya pasaron sin marcar <code>completado</code> aparecerán en Analytics como no-show.
      </div>
    </div>
  );
}
