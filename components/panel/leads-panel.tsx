"use client";

import { useMemo, useState, useTransition } from "react";
import {
  CalendarCheck,
  CalendarRange,
  Check,
  CheckCircle2,
  Euro,
  Megaphone,
  MessageCircle,
  Pencil,
  Search,
  Undo2,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { computeStats, formatEuro, type PanelLead } from "@/lib/panel/data";
import { FUENTE_LABEL, PLATAFORMA_LABEL } from "@/lib/attribution";
import {
  marcarPerdido,
  marcarReservado,
  quitarPago,
  registrarPago,
} from "@/lib/panel/actions";

const FILTROS: Array<{ value: string; label: string }> = [
  { value: "", label: "Todos" },
  { value: "activos", label: "En conversación" },
  { value: "cita_agendada", label: "Con cita" },
  { value: "completado", label: "Completados" },
  { value: "perdido", label: "Perdidos" },
];

const ACTIVOS = new Set(["nuevo", "contactado", "conversando", "pendiente_humano"]);

/** YYYY-MM-DD en hora local (para <input type="date">) */
function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

type DateRange = { desde: string; hasta: string };

const PRESETS: Array<{ id: string; label: string; range: () => DateRange }> = [
  { id: "todo", label: "Todo", range: () => ({ desde: "", hasta: "" }) },
  {
    id: "hoy",
    label: "Hoy",
    range: () => {
      const t = toInputDate(new Date());
      return { desde: t, hasta: t };
    },
  },
  {
    id: "7d",
    label: "Últimos 7 días",
    range: () => {
      const d = new Date();
      d.setDate(d.getDate() - 6);
      return { desde: toInputDate(d), hasta: toInputDate(new Date()) };
    },
  },
  {
    id: "30d",
    label: "Últimos 30 días",
    range: () => {
      const d = new Date();
      d.setDate(d.getDate() - 29);
      return { desde: toInputDate(d), hasta: toInputDate(new Date()) };
    },
  },
  {
    id: "mes",
    label: "Este mes",
    range: () => {
      const n = new Date();
      return {
        desde: toInputDate(new Date(n.getFullYear(), n.getMonth(), 1)),
        hasta: toInputDate(n),
      };
    },
  },
  {
    id: "mes-ant",
    label: "Mes pasado",
    range: () => {
      const n = new Date();
      return {
        desde: toInputDate(new Date(n.getFullYear(), n.getMonth() - 1, 1)),
        hasta: toInputDate(new Date(n.getFullYear(), n.getMonth(), 0)),
      };
    },
  },
];

function inRange(iso: string | null, r: DateRange): boolean {
  if (!r.desde && !r.hasta) return true;
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (r.desde && t < new Date(`${r.desde}T00:00:00`).getTime()) return false;
  if (r.hasta && t > new Date(`${r.hasta}T23:59:59.999`).getTime()) return false;
  return true;
}

/* ─────────── FUENTE DEL LEAD ─────────── */
type GrupoFuente = { key: string; label: string; cls: string; order: number };

const GRUPOS: Record<string, Omit<GrupoFuente, "key">> = {
  meta_paid: { label: "Meta Ads", cls: "bg-blue-500/15 text-blue-300 border-blue-500/30", order: 1 },
  meta_organic: { label: "Meta orgánico", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30", order: 2 },
  google_paid: { label: "Google Ads", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30", order: 3 },
  google_organic: { label: "Google orgánico", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", order: 4 },
  tiktok: { label: "TikTok", cls: "bg-pink-500/15 text-pink-300 border-pink-500/30", order: 5 },
  ia: { label: "IA (ChatGPT…)", cls: "bg-violet-500/15 text-violet-300 border-violet-500/30", order: 6 },
  directo: { label: "Directo", cls: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30", order: 7 },
  otros: { label: "Otros", cls: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30", order: 8 },
  sin_datos: { label: "Sin datos", cls: "bg-zinc-800/60 text-zinc-500 border-zinc-700/60", order: 9 },
};

function grupoFuente(l: PanelLead): GrupoFuente {
  const key = (() => {
    if (!l.fuente) return "sin_datos";
    if (l.fuente === "meta") return l.canal === "paid" ? "meta_paid" : "meta_organic";
    if (l.fuente === "google") return l.canal === "paid" ? "google_paid" : "google_organic";
    if (l.fuente === "tiktok" || l.fuente === "ia" || l.fuente === "directo") return l.fuente;
    return "otros";
  })();
  return { key, ...GRUPOS[key] };
}

function detalleFuente(l: PanelLead): string | null {
  const parts: string[] = [];
  if (l.plataforma) parts.push(PLATAFORMA_LABEL[l.plataforma] ?? l.plataforma);
  else if (l.fuente && !GRUPOS[l.fuente]) parts.push(FUENTE_LABEL[l.fuente] ?? l.fuente);
  if (l.campana) parts.push(l.campana);
  return parts.length ? parts.join(" · ") : null;
}

function FuenteBadge({ lead }: { lead: PanelLead }) {
  const g = grupoFuente(lead);
  const detalle = detalleFuente(lead);
  return (
    <div className="min-w-0">
      <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${g.cls}`}>
        {g.label}
      </span>
      {detalle && (
        <p className="mt-0.5 max-w-[160px] truncate text-[11px] text-zinc-500" title={detalle}>
          {detalle}
        </p>
      )}
    </div>
  );
}

function estadoInfo(estado: string | null): { label: string; cls: string } {
  switch (estado) {
    case "nuevo":
      return { label: "Nuevo", cls: "bg-blue-500/15 text-blue-300" };
    case "contactado":
      return { label: "Contactado", cls: "bg-cyan-500/15 text-cyan-300" };
    case "conversando":
      return { label: "Conversando", cls: "bg-amber-500/15 text-amber-300" };
    case "cita_agendada":
      return { label: "Cita reservada", cls: "bg-green-500/15 text-green-300" };
    case "completado":
      return { label: "Completado", cls: "bg-emerald-500/15 text-emerald-300" };
    case "pendiente_humano":
      return { label: "Atención manual", cls: "bg-purple-500/15 text-purple-300" };
    case "no_contactar":
      return { label: "No contactar", cls: "bg-red-500/15 text-red-300" };
    case "perdido":
      return { label: "Perdido", cls: "bg-zinc-500/15 text-zinc-400" };
    default:
      return { label: estado || "—", cls: "bg-zinc-500/15 text-zinc-400" };
  }
}

function formatCita(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-ES", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
}

function formatFecha(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PanelLeadsView({ leads }: { leads: PanelLead[] }) {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("");
  const [rango, setRango] = useState<DateRange>({ desde: "", hasta: "" });
  const [fuenteFiltro, setFuenteFiltro] = useState("");

  const activePreset = useMemo(() => {
    const hit = PRESETS.find((p) => {
      const r = p.range();
      return r.desde === rango.desde && r.hasta === rango.hasta;
    });
    return hit?.id ?? "custom";
  }, [rango]);

  /** Leads dentro del rango de fechas (por fecha de entrada). Base para las métricas. */
  const enRango = useMemo(
    () => leads.filter((l) => inRange(l.fecha_entrada, rango)),
    [leads, rango]
  );

  const stats = useMemo(() => computeStats(enRango), [enRango]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enRango.filter((l) => {
      if (fuenteFiltro && grupoFuente(l).key !== fuenteFiltro) return false;
      if (filtro === "activos") {
        if (!ACTIVOS.has(l.estado || "")) return false;
      } else if (filtro && l.estado !== filtro) {
        return false;
      }
      if (q) {
        const hay =
          (l.nombre || "").toLowerCase().includes(q) ||
          (l.telefono || "").includes(q) ||
          (l.descripcion_tatuaje || "").toLowerCase().includes(q);
        if (!hay) return false;
      }
      return true;
    });
  }, [enRango, search, filtro, fuenteFiltro]);

  /** Desglose por fuente dentro del rango de fechas */
  const porFuente = useMemo(() => {
    const map = new Map<string, { g: GrupoFuente; leads: number; citas: number; completados: number; cobrado: number }>();
    for (const l of enRango) {
      const g = grupoFuente(l);
      const row = map.get(g.key) ?? { g, leads: 0, citas: 0, completados: 0, cobrado: 0 };
      row.leads++;
      if (l.estado === "cita_agendada" || l.estado === "completado") row.citas++;
      if (l.estado === "completado") row.completados++;
      if (l.precio_pagado && l.precio_pagado > 0) row.cobrado += l.precio_pagado;
      map.set(g.key, row);
    }
    return [...map.values()].sort((a, b) => b.leads - a.leads || a.g.order - b.g.order);
  }, [enRango]);

  const hayRango = Boolean(rango.desde || rango.hasta);

  return (
    <div className="space-y-6">
      {/* Filtro por fechas */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-zinc-500">
            <CalendarRange className="h-4 w-4" />
            Fecha de entrada
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setRango(p.range())}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  activePreset === p.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <label className="flex items-center gap-1.5 text-xs text-zinc-500">
              Desde
              <input
                type="date"
                value={rango.desde}
                max={rango.hasta || undefined}
                onChange={(e) => setRango((r) => ({ ...r, desde: e.target.value }))}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-xs text-zinc-200 [color-scheme:dark] focus:border-amber-500/60 focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-1.5 text-xs text-zinc-500">
              Hasta
              <input
                type="date"
                value={rango.hasta}
                min={rango.desde || undefined}
                onChange={(e) => setRango((r) => ({ ...r, hasta: e.target.value }))}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-xs text-zinc-200 [color-scheme:dark] focus:border-amber-500/60 focus:outline-none"
              />
            </label>
            {hayRango && (
              <button
                onClick={() => setRango({ desde: "", hasta: "" })}
                className="inline-flex items-center gap-1 rounded-md border border-zinc-800 px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-300"
                aria-label="Quitar filtro de fechas"
              >
                <X className="h-3.5 w-3.5" />
                Quitar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Métricas del rango */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label={hayRango ? "Leads en el periodo" : "Leads totales"}
          value={String(stats.totalLeads)}
        />
        <StatCard
          icon={CalendarCheck}
          label="Citas reservadas"
          value={String(stats.citasReservadas)}
          accent="text-green-400"
        />
        <StatCard
          icon={CheckCircle2}
          label="Tatuajes completados"
          value={String(stats.completados)}
          accent="text-emerald-400"
        />
        <StatCard
          icon={Euro}
          label={hayRango ? "Cobrado en el periodo" : "Total cobrado"}
          value={formatEuro(stats.totalCobrado)}
          sub={hayRango ? undefined : `${formatEuro(stats.cobradoEsteMes)} este mes`}
          accent="text-amber-400"
        />
      </div>

      {/* Desglose por fuente */}
      <FuenteBreakdown
        rows={porFuente}
        total={enRango.length}
        selected={fuenteFiltro}
        onSelect={(k) => setFuenteFiltro((cur) => (cur === k ? "" : k))}
      />

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o tatuaje…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-9 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filtro === f.value
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {fuenteFiltro && (
          <button
            onClick={() => setFuenteFiltro("")}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${GRUPOS[fuenteFiltro].cls}`}
            aria-label="Quitar filtro de fuente"
          >
            {GRUPOS[fuenteFiltro].label}
            <X className="h-3 w-3" />
          </button>
        )}
        <span className="text-xs text-zinc-500 whitespace-nowrap">
          {filtered.length} de {enRango.length}
          {hayRango && enRango.length !== leads.length ? ` (${leads.length} en total)` : ""}
        </span>
      </div>

      {/* Desktop: tabla */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50">
        {filtered.length === 0 ? (
          <EmptyState hasLeads={leads.length > 0} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Entrada</th>
                  <th className="px-4 py-3 text-left font-medium">Cliente</th>
                  <th className="px-4 py-3 text-left font-medium">Fuente</th>
                  <th className="px-4 py-3 text-left font-medium">Tatuaje</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Cita</th>
                  <th className="px-4 py-3 text-right font-medium">Pagado</th>
                  <th className="px-4 py-3 text-right font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {filtered.map((l) => (
                  <LeadRow key={l.id} lead={l} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Móvil: tarjetas */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
            <EmptyState hasLeads={leads.length > 0} />
          </div>
        ) : (
          filtered.map((l) => <LeadCard key={l.id} lead={l} />)
        )}
      </div>
    </div>
  );
}

type FuenteRow = { g: GrupoFuente; leads: number; citas: number; completados: number; cobrado: number };

function FuenteBreakdown({
  rows,
  total,
  selected,
  onSelect,
}: {
  rows: FuenteRow[];
  total: number;
  selected: string;
  onSelect: (key: string) => void;
}) {
  if (total === 0) return null;
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3 text-zinc-500">
        <Megaphone className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">De dónde vienen</span>
        <span className="ml-auto text-[11px] text-zinc-600">Pulsa una fuente para filtrar</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Fuente</th>
              <th className="px-4 py-2 text-right font-medium">Leads</th>
              <th className="px-4 py-2 text-right font-medium">% del total</th>
              <th className="px-4 py-2 text-right font-medium">Citas</th>
              <th className="px-4 py-2 text-right font-medium">Conversión</th>
              <th className="px-4 py-2 text-right font-medium">Cobrado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/70">
            {rows.map((r) => {
              const pct = Math.round((r.leads / total) * 100);
              const conv = r.leads ? Math.round((r.citas / r.leads) * 100) : 0;
              const active = selected === r.g.key;
              return (
                <tr
                  key={r.g.key}
                  onClick={() => onSelect(r.g.key)}
                  className={`cursor-pointer transition-colors ${active ? "bg-amber-500/10" : "hover:bg-zinc-800/40"}`}
                >
                  <td className="px-4 py-2.5">
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${r.g.cls}`}>
                      {r.g.label}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-white tabular-nums">{r.leads}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-400 tabular-nums">
                    <div className="flex items-center justify-end gap-2">
                      <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800 sm:block">
                        <div className="h-full rounded-full bg-amber-500/60" style={{ width: `${pct}%` }} />
                      </div>
                      {pct}%
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-green-300/90 tabular-nums">{r.citas}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-300 tabular-nums">{conv}%</td>
                  <td className="px-4 py-2.5 text-right text-emerald-300 tabular-nums">
                    {r.cobrado > 0 ? formatEuro(r.cobrado) : <span className="text-zinc-600">—</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex items-center gap-2 text-zinc-500">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className={`mt-2 text-2xl font-semibold ${accent || "text-white"}`}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}

function EmptyState({ hasLeads }: { hasLeads: boolean }) {
  return (
    <div className="p-12 text-center">
      <p className="text-sm text-zinc-500">
        {hasLeads
          ? "Ningún lead coincide con los filtros."
          : "Todavía no hay leads registrados."}
      </p>
    </div>
  );
}

/** Acciones compartidas fila/tarjeta */
function useLeadActions(lead: PanelLead) {
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [importe, setImporte] = useState(
    lead.precio_pagado ? String(lead.precio_pagado) : ""
  );
  const [error, setError] = useState<string | null>(null);

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const res = await action();
      if (!res.ok) setError(res.error || "Error al guardar");
      else setEditing(false);
    });
  }

  function guardarPago() {
    const val = parseFloat(importe.replace(",", "."));
    if (!Number.isFinite(val) || val <= 0) {
      setError("Introduce un importe válido");
      return;
    }
    run(() => registrarPago(lead.id, val));
  }

  return {
    isPending,
    editing,
    setEditing,
    importe,
    setImporte,
    error,
    guardarPago,
    reservar: () => run(() => marcarReservado(lead.id)),
    deshacerPago: () => run(() => quitarPago(lead.id)),
    perder: () => run(() => marcarPerdido(lead.id)),
  };
}

function PagoForm({
  a,
}: {
  a: ReturnType<typeof useLeadActions>;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={a.importe}
          onChange={(e) => a.setImporte(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && a.guardarPago()}
          placeholder="0"
          autoFocus
          className="w-24 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1.5 pr-6 text-right text-sm text-zinc-100 focus:border-amber-500/60 focus:outline-none"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
          €
        </span>
      </div>
      <button
        onClick={a.guardarPago}
        disabled={a.isPending}
        className="rounded-md bg-emerald-500/20 border border-emerald-500/40 p-1.5 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50"
        title="Guardar pago"
      >
        <Check className="h-4 w-4" />
      </button>
      <button
        onClick={() => a.setEditing(false)}
        disabled={a.isPending}
        className="rounded-md border border-zinc-800 p-1.5 text-zinc-500 hover:text-zinc-300"
        title="Cancelar"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ActionButtons({
  lead,
  a,
  compact,
}: {
  lead: PanelLead;
  a: ReturnType<typeof useLeadActions>;
  compact?: boolean;
}) {
  const isCompletado = lead.estado === "completado";
  const isPerdido = lead.estado === "perdido";
  const isOptOut = lead.estado === "no_contactar";

  if (a.editing) return <PagoForm a={a} />;

  return (
    <div
      className={`flex flex-wrap items-center gap-1.5 ${compact ? "" : "justify-end"}`}
    >
      {!isCompletado && !isOptOut && lead.estado !== "cita_agendada" && !isPerdido && (
        <button
          onClick={a.reservar}
          disabled={a.isPending}
          className="inline-flex items-center gap-1.5 rounded-md border border-green-500/30 bg-green-500/10 px-2.5 py-1.5 text-xs text-green-300 hover:bg-green-500/20 disabled:opacity-50"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          Reservado
        </button>
      )}
      {!isCompletado && !isOptOut && (
        <button
          onClick={() => a.setEditing(true)}
          disabled={a.isPending}
          className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 disabled:opacity-50"
        >
          <Euro className="h-3.5 w-3.5" />
          Registrar pago
        </button>
      )}
      {isCompletado && (
        <>
          <button
            onClick={() => a.setEditing(true)}
            disabled={a.isPending}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
            title="Editar importe"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </button>
          <button
            onClick={a.deshacerPago}
            disabled={a.isPending}
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 disabled:opacity-50"
            title="Quitar pago (vuelve a Cita reservada)"
          >
            <Undo2 className="h-3.5 w-3.5" />
          </button>
        </>
      )}
      {!isCompletado && !isPerdido && !isOptOut && (
        <button
          onClick={a.perder}
          disabled={a.isPending}
          className="inline-flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1.5 text-xs text-zinc-600 hover:text-red-300 hover:border-red-900 disabled:opacity-50"
          title="Marcar como perdido"
        >
          <XCircle className="h-3.5 w-3.5" />
        </button>
      )}
      {isPerdido && (
        <button
          onClick={a.reservar}
          disabled={a.isPending}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
        >
          <Undo2 className="h-3.5 w-3.5" />
          Recuperar
        </button>
      )}
    </div>
  );
}

function WaLink({ telefono }: { telefono: string }) {
  return (
    <a
      href={`https://wa.me/${telefono.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-green-400/80 hover:text-green-300"
      title="Abrir en WhatsApp"
    >
      <MessageCircle className="h-3.5 w-3.5" />
      <span className="font-mono">+{telefono.replace(/\D/g, "")}</span>
    </a>
  );
}

function LeadRow({ lead }: { lead: PanelLead }) {
  const a = useLeadActions(lead);
  const e = estadoInfo(lead.estado);

  return (
    <tr className="hover:bg-zinc-800/40 align-top">
      <td className="px-4 py-3 text-xs text-zinc-500 whitespace-nowrap">
        {formatFecha(lead.fecha_entrada)}
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-white">{lead.nombre || "Sin nombre"}</p>
        <WaLink telefono={lead.telefono} />
      </td>
      <td className="px-4 py-3">
        <FuenteBadge lead={lead} />
      </td>
      <td className="px-4 py-3 text-zinc-400 max-w-[220px]">
        <p className="truncate" title={lead.descripcion_tatuaje || undefined}>
          {lead.descripcion_tatuaje || "—"}
        </p>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${e.cls}`}
        >
          {e.label}
        </span>
      </td>
      <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">
        {formatCita(lead.fecha_cita)}
      </td>
      <td className="px-4 py-3 text-right whitespace-nowrap">
        {lead.precio_pagado ? (
          <div>
            <p className="font-semibold text-emerald-300">
              {formatEuro(lead.precio_pagado)}
            </p>
            <p className="text-[11px] text-zinc-600">
              {formatFecha(lead.fecha_pago)}
            </p>
          </div>
        ) : (
          <span className="text-zinc-600">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col items-end gap-1">
          <ActionButtons lead={lead} a={a} />
          {a.error && <p className="text-[11px] text-red-400">{a.error}</p>}
        </div>
      </td>
    </tr>
  );
}

function LeadCard({ lead }: { lead: PanelLead }) {
  const a = useLeadActions(lead);
  const e = estadoInfo(lead.estado);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="font-medium text-white">{lead.nombre || "Sin nombre"}</p>
          <WaLink telefono={lead.telefono} />
          <FuenteBadge lead={lead} />
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${e.cls}`}
        >
          {e.label}
        </span>
      </div>

      {lead.descripcion_tatuaje && (
        <p className="text-sm text-zinc-400 line-clamp-2">
          {lead.descripcion_tatuaje}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        <span>
          Entrada: <span className="text-zinc-300">{formatFecha(lead.fecha_entrada)}</span>
        </span>
        <span>
          Cita: <span className="text-zinc-300">{formatCita(lead.fecha_cita)}</span>
        </span>
        {lead.precio_pagado ? (
          <span>
            Pagado:{" "}
            <span className="font-semibold text-emerald-300">
              {formatEuro(lead.precio_pagado)}
            </span>{" "}
            <span className="text-zinc-600">({formatFecha(lead.fecha_pago)})</span>
          </span>
        ) : null}
      </div>

      <div className="border-t border-zinc-800 pt-3">
        <ActionButtons lead={lead} a={a} compact />
        {a.error && <p className="mt-1 text-[11px] text-red-400">{a.error}</p>}
      </div>
    </div>
  );
}
