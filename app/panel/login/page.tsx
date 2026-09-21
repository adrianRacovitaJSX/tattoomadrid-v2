import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import { signIn } from "@/lib/panel/auth";

export const dynamic = "force-dynamic";

export default async function PanelLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function doLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        username: String(formData.get("username") ?? ""),
        password: String(formData.get("password") ?? ""),
        redirectTo: "/panel",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/panel/login?error=1");
      }
      throw err; // NEXT_REDIRECT del login correcto debe propagarse
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 border border-amber-500/30">
              <Lock className="h-5 w-5 text-amber-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">
              Acceso al panel
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Gestión de leads y reservas del estudio
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-300">
              Usuario o contraseña incorrectos.
            </div>
          )}

          <form action={doLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs uppercase tracking-wider text-zinc-500"
              >
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs uppercase tracking-wider text-zinc-500"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/50 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-zinc-600">
          La sesión se mantiene abierta 30 días en este dispositivo.
        </p>
      </div>
    </div>
  );
}
