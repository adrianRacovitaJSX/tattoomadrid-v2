import { redirect } from "next/navigation";
import { auth } from "@/lib/panel/auth";
import { fetchPanelLeads, type PanelLead } from "@/lib/panel/data";
import { PanelLeadsView } from "@/components/panel/leads-panel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function hasSession(): Promise<boolean> {
  if (!process.env.AUTH_SECRET) return false;
  try {
    const session = await auth();
    return Boolean(session?.user);
  } catch {
    return false;
  }
}

export default async function PanelPage() {
  // Defensa en profundidad: no depender solo del middleware.
  if (!(await hasSession())) redirect("/panel/login");

  let leads: PanelLead[] = [];
  let error: string | null = null;
  try {
    leads = await fetchPanelLeads();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error desconocido";
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Tus leads</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Consultas recibidas, citas reservadas y pagos registrados. Filtra por fecha de entrada para ver un periodo concreto.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
          <p className="font-medium">Error al cargar los datos</p>
          <p className="mt-1 text-xs opacity-80">{error}</p>
        </div>
      )}

      <PanelLeadsView leads={leads} />
    </div>
  );
}

