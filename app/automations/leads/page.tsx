import { fetchLeads } from "@/lib/automations";
import { LeadsTable } from "@/components/automations/leads-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadsListPage() {
  let leads: Awaited<ReturnType<typeof fetchLeads>> = [];
  let error: string | null = null;
  try {
    leads = await fetchLeads(500);
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Leads</h2>
        <p className="text-sm text-zinc-500">
          {leads.length} lead{leads.length !== 1 && "s"} en total
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
          <p className="font-medium">Error al cargar leads</p>
          <p className="mt-1 text-xs opacity-80">{error}</p>
        </div>
      )}

      <LeadsTable leads={leads} />
    </div>
  );
}
