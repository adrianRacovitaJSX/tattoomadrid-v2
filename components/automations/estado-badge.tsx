import { estadoLabel } from "@/lib/automations";

export function EstadoBadge({ estado }: { estado: string | null }) {
  const { label, color } = estadoLabel(estado);
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}
