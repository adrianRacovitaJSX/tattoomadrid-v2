import { AlertTriangle, CheckCircle2, ExternalLink, XCircle } from "lucide-react";
import {
  fetchN8nWorkflows,
  fetchN8nExecutions,
  fetchWhapiHealth,
} from "@/lib/automations";

export const dynamic = "force-dynamic";

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error("status fetch error:", err);
    return fallback;
  }
}

export default async function StatusPage() {
  const [workflows, whapi] = await Promise.all([
    safeFetch(fetchN8nWorkflows, [] as Awaited<
      ReturnType<typeof fetchN8nWorkflows>
    >),
    safeFetch(fetchWhapiHealth, { status: "unknown" }),
  ]);

  // Get FLUJO 2 execution stats
  const flujo2 = workflows.find((w) => w.name.includes("FLUJO 2"));
  const recentExecutions = flujo2
    ? await safeFetch(() => fetchN8nExecutions(flujo2.id, 30), [])
    : [];

  const successes = recentExecutions.filter((e) => e.status === "success")
    .length;
  const errors = recentExecutions.filter((e) => e.status === "error").length;

  const whapiOk = /^(AUTH|ready|ok|connected|authenticated)$/i.test(
    whapi.status
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Estado del sistema</h2>
        <p className="text-sm text-zinc-500">
          Salud en tiempo real de los servicios conectados
        </p>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ServiceCard
          name="n8n"
          ok={workflows.length > 0}
          desc={`${workflows.length} workflows detectados`}
          url="https://sns-automatization.pikapod.net"
        />
        <ServiceCard
          name="Whapi Cloud"
          ok={whapiOk}
          desc={`Estado: ${whapi.status}`}
          url="https://panel.whapi.cloud"
        />
      </div>

      {/* Workflows */}
      <section>
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
          Workflows n8n
        </h3>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          {workflows.length === 0 ? (
            <p className="p-8 text-center text-sm text-zinc-500">
              No se pudo conectar con n8n. Verifica N8N_API_KEY.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-zinc-900/80 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Workflow</th>
                  <th className="px-4 py-3 text-left font-medium">Estado</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Actualizado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {workflows.map((w) => (
                  <tr key={w.id}>
                    <td className="px-4 py-3 font-medium">{w.name}</td>
                    <td className="px-4 py-3">
                      {w.active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
                          <XCircle className="h-3.5 w-3.5" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-zinc-500">
                      {new Date(w.updatedAt).toLocaleDateString("es-ES")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Recent executions */}
      {flujo2 && (
        <section>
          <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-zinc-500">
            Últimas ejecuciones · FLUJO 2
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-xs text-zinc-500">Últimas 30</p>
              <p className="mt-1 text-2xl font-semibold">
                {recentExecutions.length}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-xs text-zinc-500">Éxito</p>
              <p className="mt-1 text-2xl font-semibold text-green-400">
                {successes}
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <p className="text-xs text-zinc-500">Error</p>
              <p className="mt-1 text-2xl font-semibold text-red-400">
                {errors}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ServiceCard({
  name,
  ok,
  desc,
  url,
}: {
  name: string;
  ok: boolean;
  desc: string;
  url?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{name}</h3>
            {ok ? (
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-400" />
            )}
          </div>
          <p className="mt-1 text-sm text-zinc-500">{desc}</p>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white"
            aria-label={`Abrir ${name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}
