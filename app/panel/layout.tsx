import type { Metadata } from "next";
import { LogOut } from "lucide-react";
import { auth, signOut } from "@/lib/panel/auth";

export const metadata: Metadata = {
  title: "Panel de Clientes · Saints & Sinners",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = process.env.AUTH_SECRET ? await auth().catch(() => null) : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-tight text-white">
              Saints <span className="text-amber-400">&</span> Sinners
            </span>
            <span className="hidden sm:inline text-xs uppercase tracking-widest text-zinc-500 border-l border-zinc-800 pl-3">
              Panel de clientes
            </span>
          </div>
          {session?.user && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/panel/login" });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Cerrar sesión
              </button>
            </form>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
