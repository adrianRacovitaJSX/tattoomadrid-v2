import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Repeat,
} from "lucide-react";
import {
  fetchChatBySession,
  fetchLeadById,
  formatPhone,
  formatRelative,
} from "@/lib/automations";
import { ChatView } from "@/components/automations/chat-view";
import { EstadoBadge } from "@/components/automations/estado-badge";
import { LeadActions } from "@/components/automations/lead-actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead = await fetchLeadById(id).catch(() => null);
  if (!lead) notFound();

  const chat = await fetchChatBySession(lead.telefono).catch(() => []);

  const fechaCitaTxt = lead.fecha_cita
    ? new Date(lead.fecha_cita).toLocaleString("es-ES", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      })
    : "—";

  return (
    <div className="space-y-6">
      <Link
        href="/automations/leads"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a leads
      </Link>

      {/* Header card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-amber-500/30 to-zinc-700 flex items-center justify-center text-2xl font-semibold text-amber-300">
              {(lead.nombre || "?").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {lead.nombre || "Sin nombre"}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <span className="font-mono">
                    {formatPhone(lead.telefono)}
                  </span>
                </span>
                {lead.email && (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {lead.email}
                  </span>
                )}
                <EstadoBadge estado={lead.estado} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-zinc-800 pt-6">
          <InfoField
            label="Entrada"
            value={formatRelative(lead.fecha_entrada)}
          />
          <InfoField
            label="Último contacto"
            value={formatRelative(lead.ultimo_contacto)}
          />
          <InfoField
            label="Seguimientos"
            value={String(lead.num_seguimientos ?? 0)}
            icon={Repeat}
          />
          <InfoField
            label="Cita"
            value={fechaCitaTxt}
            icon={lead.fecha_cita ? Calendar : undefined}
            accent={lead.fecha_cita ? "text-green-400" : undefined}
          />
        </div>

        {lead.descripcion_tatuaje && (
          <div className="mt-6 border-t border-zinc-800 pt-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Descripción del tatuaje
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {lead.descripcion_tatuaje}
            </p>
          </div>
        )}
      </div>

      {/* Actions + Notes */}
      <LeadActions
        leadId={lead.id}
        telefono={lead.telefono}
        estado={lead.estado}
        initialNotas={lead.notas_agente}
      />

      {/* Chat */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-zinc-500" />
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Conversación
          </h3>
        </div>
        <div className="relative max-h-[70vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 md:p-6">
          <ChatView messages={chat} leadName={lead.nombre} />
        </div>
      </div>
    </div>
  );
}

function InfoField({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: typeof Calendar;
  accent?: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <div className="mt-1 flex items-center gap-1.5">
        {Icon && <Icon className="h-3.5 w-3.5 text-green-400" />}
        <p className={`text-sm ${accent || "text-zinc-300"}`}>{value}</p>
      </div>
    </div>
  );
}
