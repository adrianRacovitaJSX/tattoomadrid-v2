"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Search, X } from "lucide-react";
import { EstadoBadge } from "@/components/automations/estado-badge";
import { formatPhone, formatRelative, type Lead } from "@/lib/automations";

const ESTADOS = [
  "nuevo",
  "contactado",
  "conversando",
  "cita_agendada",
  "completado",
  "no_contactar",
  "perdido",
  "pendiente_humano",
];

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState<string>("");
  const [sinceDays, setSinceDays] = useState<number>(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearch("");
        searchRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cutoff = sinceDays > 0 ? Date.now() - sinceDays * 24 * 60 * 60 * 1000 : 0;
    return leads.filter((l) => {
      if (estado && l.estado !== estado) return false;
      if (cutoff && l.fecha_entrada) {
        if (new Date(l.fecha_entrada).getTime() < cutoff) return false;
      }
      if (q) {
        const hay =
          (l.nombre || "").toLowerCase().includes(q) ||
          (l.telefono || "").toLowerCase().includes(q) ||
          (l.email || "").toLowerCase().includes(q) ||
          (l.descripcion_tatuaje || "").toLowerCase().includes(q);
        if (!hay) return false;
      }
      return true;
    });
  }, [leads, search, estado, sinceDays]);

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Buscar por nombre, teléfono, email o descripción… (/)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
        >
          <option value="">Todos los estados</option>
          {ESTADOS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={sinceDays}
          onChange={(e) => setSinceDays(Number(e.target.value))}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-zinc-600"
        >
          <option value={0}>Todo el tiempo</option>
          <option value={1}>Último día</option>
          <option value={7}>Últimos 7 días</option>
          <option value={30}>Últimos 30 días</option>
          <option value={90}>Últimos 90 días</option>
        </select>

        <span className="text-xs text-zinc-500 whitespace-nowrap">
          {filtered.length} de {leads.length}
        </span>
      </div>

      {/* Tabla */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-zinc-500">
              {leads.length === 0
                ? "No hay leads registrados."
                : "Ningún lead coincide con los filtros."}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nombre</th>
                <th className="px-4 py-3 text-left font-medium">Teléfono</th>
                <th className="px-4 py-3 text-left font-medium">Tatuaje</th>
                <th className="px-4 py-3 text-left font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Entrada</th>
                <th className="px-4 py-3 text-right font-medium">
                  Últ. contacto
                </th>
                <th className="px-4 py-3 text-center font-medium w-12">WA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-zinc-800/40">
                  <td className="px-4 py-3">
                    <Link
                      href={`/automations/leads/${l.id}`}
                      className="font-medium text-white hover:text-amber-300"
                    >
                      {l.nombre || "Sin nombre"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 font-mono text-xs">
                    {formatPhone(l.telefono)}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 max-w-xs truncate">
                    {l.descripcion_tatuaje || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <EstadoBadge estado={l.estado} />
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-500 text-xs">
                    {formatRelative(l.fecha_entrada)}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-500 text-xs">
                    {formatRelative(l.ultimo_contacto)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <a
                      href={`https://wa.me/${l.telefono.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-green-400/70 hover:bg-green-500/10 hover:text-green-300"
                      title="Abrir WhatsApp"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
