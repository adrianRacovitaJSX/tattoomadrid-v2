"use client";

import {
  Ban,
  Check,
  Copy,
  MessageCircle,
  Save,
  StickyNote,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ACTION_TOKEN = "sns-n8n-vision-2026-x7q4";

type Props = {
  leadId: number;
  telefono: string;
  estado: string | null;
  initialNotas: string | null;
};

export function LeadActions({ leadId, telefono, estado, initialNotas }: Props) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [savingEstado, setSavingEstado] = useState<string | null>(null);
  const [notas, setNotas] = useState(initialNotas || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  const digits = telefono.replace(/\D/g, "");
  const waLink = `https://wa.me/${digits}`;

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(`+${digits}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function changeEstado(nuevo: string) {
    if (!confirm(`¿Cambiar estado a "${nuevo}"?`)) return;
    setSavingEstado(nuevo);
    try {
      const res = await fetch("/api/internal/lead-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-token": ACTION_TOKEN,
        },
        body: JSON.stringify({
          id: leadId,
          action: "estado",
          estado: nuevo,
        }),
      });
      if (res.ok) router.refresh();
    } finally {
      setSavingEstado(null);
    }
  }

  async function saveNotes() {
    setSavingNotes(true);
    setNotesSaved(false);
    try {
      const res = await fetch("/api/internal/lead-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-token": ACTION_TOKEN,
        },
        body: JSON.stringify({
          id: leadId,
          action: "notes",
          notas_agente: notas,
        }),
      });
      if (res.ok) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 2000);
        router.refresh();
      }
    } finally {
      setSavingNotes(false);
    }
  }

  const isOptOut = estado === "no_contactar";
  const isActive =
    estado === "conversando" || estado === "nuevo" || estado === "contactado";

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm font-medium text-green-300 hover:border-green-500/50 hover:bg-green-500/15 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Abrir en WhatsApp
        </a>
        <button
          onClick={copyPhone}
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-400" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copiar teléfono
            </>
          )}
        </button>
        {isActive && (
          <button
            onClick={() => changeEstado("no_contactar")}
            disabled={savingEstado === "no_contactar"}
            className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300 hover:border-red-500/50 hover:bg-red-500/15 transition-colors disabled:opacity-60"
          >
            <Ban className="h-4 w-4" />
            Marcar no contactar
          </button>
        )}
        {isOptOut && (
          <button
            onClick={() => changeEstado("conversando")}
            disabled={savingEstado === "conversando"}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 transition-colors disabled:opacity-60"
          >
            <UserCheck className="h-4 w-4" />
            Reactivar conversación
          </button>
        )}
      </div>

      {/* Notas agente */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
            <StickyNote className="h-3.5 w-3.5" />
            Notas internas
          </label>
          <button
            onClick={saveNotes}
            disabled={savingNotes || notas === (initialNotas || "")}
            className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-medium text-amber-300 hover:bg-amber-500/25 disabled:opacity-50"
          >
            {notesSaved ? (
              <>
                <Check className="h-3 w-3" />
                Guardado
              </>
            ) : (
              <>
                <Save className="h-3 w-3" />
                {savingNotes ? "Guardando..." : "Guardar"}
              </>
            )}
          </button>
        </div>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={3}
          placeholder="Anota aquí detalles del cliente, incidencias, preferencias..."
          className="w-full resize-y rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
      </div>
    </div>
  );
}
