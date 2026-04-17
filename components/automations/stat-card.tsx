import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "text-zinc-300",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            {label}
          </p>
          <p className={`mt-2 text-3xl font-semibold ${accent}`}>{value}</p>
          {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
        </div>
        {Icon && <Icon className="h-5 w-5 text-zinc-600" />}
      </div>
    </div>
  );
}

export function StatusDot({ status }: { status: "ok" | "warn" | "error" }) {
  const colors = {
    ok: "bg-green-500 shadow-green-500/50",
    warn: "bg-amber-500 shadow-amber-500/50",
    error: "bg-red-500 shadow-red-500/50",
  };
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full shadow-lg ${colors[status]}`}
      aria-label={status}
    />
  );
}
