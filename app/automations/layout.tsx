import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Calendar,
  LayoutDashboard,
  Users,
  Workflow,
} from "lucide-react";
import { LiveRefresh } from "@/components/automations/live-refresh";
import { LiveClock } from "@/components/automations/live-clock";

export const metadata: Metadata = {
  title: "Automations · Saints & Sinners",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/automations", label: "Dashboard", icon: LayoutDashboard },
  { href: "/automations/leads", label: "Leads", icon: Users },
  { href: "/automations/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/automations/calendar", label: "Calendario", icon: Calendar },
  { href: "/automations/status", label: "Estado", icon: Activity },
];

async function getInitialTotal(): Promise<number> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return 0;
  try {
    const res = await fetch(
      `${url.replace(/\/$/, "")}/rest/v1/leads?select=id`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "count=exact",
        },
        cache: "no-store",
      }
    );
    const range = res.headers.get("content-range") || "";
    return Number(range.split("/")[1]) || 0;
  } catch {
    return 0;
  }
}

export default async function AutomationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTotal = await getInitialTotal();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Workflow className="h-6 w-6 text-amber-400" />
            <div>
              <h1 className="text-lg font-semibold">Automations</h1>
              <p className="text-xs text-zinc-500">
                Saints &amp; Sinners · Panel interno
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LiveClock />
            <LiveRefresh initialTotal={initialTotal} />
          </div>
        </header>

        <nav className="mb-8 flex flex-wrap gap-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {children}
      </div>
    </div>
  );
}
