"use client";

import {
  Bot,
  CalendarCheck,
  Check,
  Copy,
  Image as ImageIcon,
  Mic,
  Search,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage, ParsedChatMessage } from "@/lib/automations";
import { parseChatMessage } from "@/lib/automations";

function formatCitaDate(iso: string): string {
  const d = new Date(iso.length === 16 ? `${iso}:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
}

export function ChatView({
  messages,
  leadName,
}: {
  messages: ChatMessage[];
  leadName?: string | null;
}) {
  const parsed = useMemo(
    () => messages.map(parseChatMessage).filter((m) => m.type !== "system"),
    [messages]
  );
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) bottomRef.current?.scrollIntoView({ block: "end" });
  }, [parsed.length, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return parsed;
    return parsed.filter((m) =>
      `${m.bodyText} ${m.mediaDescription || ""}`.toLowerCase().includes(q)
    );
  }, [parsed, query]);

  if (parsed.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-zinc-500">
          Todavía no hay conversación con este lead.
        </p>
      </div>
    );
  }

  const stats = {
    total: parsed.length,
    human: parsed.filter((m) => m.type === "human").length,
    ai: parsed.filter((m) => m.type === "ai").length,
  };

  async function copyMessage(m: ParsedChatMessage) {
    try {
      const text = m.mediaDescription
        ? `${m.bodyText ? m.bodyText + "\n\n" : ""}Descripción: ${m.mediaDescription}`
        : m.bodyText;
      await navigator.clipboard.writeText(text || m.rawContent);
      setCopiedId(m.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  }

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 flex flex-wrap items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur px-4 py-3 md:-mx-6 md:px-6">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>
            <span className="font-medium text-zinc-200">{stats.total}</span>{" "}
            mensajes
          </span>
          <span className="text-zinc-700">·</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-500" />
            {stats.human} cliente
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            {stats.ai} agente
          </span>
        </div>
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en la conversación..."
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 pl-8 pr-8 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Limpiar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {query && filtered.length === 0 && (
          <p className="p-4 text-center text-xs text-zinc-500">
            Ningún mensaje coincide con &ldquo;{query}&rdquo;.
          </p>
        )}
        {filtered.map((m) => {
          const isHuman = m.type === "human";
          return (
            <div
              key={m.id}
              className={`group flex gap-3 ${isHuman ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isHuman ? "bg-zinc-800" : "bg-amber-500/20"
                }`}
                title={isHuman ? leadName || "Cliente" : "Agente IA"}
              >
                {isHuman ? (
                  <User className="h-4 w-4 text-zinc-400" />
                ) : (
                  <Bot className="h-4 w-4 text-amber-400" />
                )}
              </div>
              <div
                className={`relative max-w-[78%] ${
                  isHuman ? "" : "flex flex-col items-end"
                }`}
              >
                {/* Media chip */}
                {(m.kind === "image" || m.kind === "audio") && (
                  <MediaChip
                    kind={m.kind}
                    description={m.mediaDescription}
                    align={isHuman ? "left" : "right"}
                  />
                )}

                {/* Fallback chip */}
                {m.kind === "media_fallback" && (
                  <div
                    className={`mb-1 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1 text-[11px] text-zinc-400`}
                  >
                    <ImageIcon className="h-3 w-3" />
                    Media recibida (sin transcripción)
                  </div>
                )}

                {/* Main bubble (only if there's body text) */}
                {m.bodyText && (
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-sm ${
                      isHuman
                        ? "bg-zinc-800 text-zinc-100 rounded-tl-sm"
                        : "bg-gradient-to-br from-amber-500/15 to-amber-600/10 border border-amber-500/20 text-zinc-100 rounded-tr-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {m.bodyText}
                    </p>
                  </div>
                )}

                {/* Cita confirmation */}
                {m.citaAt && (
                  <div
                    className={`mt-1 inline-flex items-center gap-1.5 rounded-md border border-green-500/30 bg-green-500/10 px-2 py-1 text-[11px] text-green-300`}
                  >
                    <CalendarCheck className="h-3 w-3" />
                    Cita creada · {formatCitaDate(m.citaAt)}
                  </div>
                )}

                {/* Copy button */}
                <button
                  onClick={() => copyMessage(m)}
                  className={`absolute top-1 ${isHuman ? "right-0 translate-x-full pl-2" : "left-0 -translate-x-full pr-2"} opacity-0 transition-opacity group-hover:opacity-100`}
                  title="Copiar"
                >
                  {copiedId === m.id ? (
                    <Check className="h-3.5 w-3.5 text-green-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-500 hover:text-zinc-300" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

function MediaChip({
  kind,
  description,
  align,
}: {
  kind: "image" | "audio";
  description?: string;
  align: "left" | "right";
}) {
  const Icon = kind === "image" ? ImageIcon : Mic;
  const title = kind === "image" ? "Imagen de referencia" : "Nota de voz";
  return (
    <div
      className={`mb-1 flex ${align === "right" ? "justify-end" : "justify-start"}`}
    >
      <div className="max-w-full rounded-lg border border-zinc-700 bg-zinc-900/70 px-3 py-2">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-200">
          <Icon className="h-3.5 w-3.5 text-amber-400" />
          {title}
        </div>
        {description && (
          <p className="mt-1 max-w-prose text-[12px] italic text-zinc-400 leading-relaxed">
            &ldquo;{description}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
