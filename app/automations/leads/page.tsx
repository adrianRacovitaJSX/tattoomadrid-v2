import Link from "next/link";
import { Search } from "lucide-react";
import { fetchLeads, formatPhone, formatRelative } from "@/lib/automations";
import { EstadoBadge } from "@/components/automations/estado-badge";

export const dynamic = "force-dynamic";

export default async function LeadsListPage() {
  let leads: Awaited<ReturnType<typeof fetchLeads>> = [];
  let error: string | null = null;
  try {
    leads = await fetchLeads(200);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Leads</h2>
          <p className="text-sm text-zinc-500">
            {leads.length} lead{leads.length !== 1 && "s"} en total
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
          <p className="font-medium">Error al cargar leads</p>
          <p className="mt-1 text-xs opacity-80">{error}</p>
        </div>
      )}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        {leads.length === 0 && !error ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <Search className="h-8 w-8 text-zinc-700 mb-3" />
            <p className="text-sm text-zinc-500">No hay leads registrados.</p>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leads.map((l) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
