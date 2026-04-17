"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff, RefreshCw } from "lucide-react";

const POLL_INTERVAL_MS = 15000;

function playBeep() {
  try {
    const AC =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        : null;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.stop(ctx.currentTime + 0.4);
  } catch {
    /* noop */
  }
}

export function LiveRefresh({ initialTotal }: { initialTotal: number }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [audio, setAudio] = useState(false);
  const [lastTotal, setLastTotal] = useState(initialTotal);
  const [unread, setUnread] = useState(0);
  const titleRef = useRef<string>("");

  useEffect(() => {
    if (typeof document !== "undefined") titleRef.current = document.title;
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const base = titleRef.current || "Automations";
    document.title = unread > 0 ? `(${unread}) ${base}` : base;
  }, [unread]);

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(async () => {
      try {
        const res = await fetch("/api/automations/lead-count", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { total: number };
        if (data.total > lastTotal) {
          const diff = data.total - lastTotal;
          setUnread((n) => n + diff);
          if (audio) playBeep();
          router.refresh();
        }
        setLastTotal(data.total);
      } catch {
        /* noop */
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [enabled, audio, lastTotal, router]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          setUnread(0);
          router.refresh();
        }}
        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/70 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-700 hover:text-white"
        aria-label="Refrescar"
        title="Refrescar"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        {unread > 0 ? `${unread} nuevos` : "Refrescar"}
      </button>
      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        className={`rounded-md border px-2.5 py-1.5 text-xs ${
          enabled
            ? "border-green-700/50 bg-green-900/20 text-green-400"
            : "border-zinc-800 bg-zinc-900/70 text-zinc-500"
        }`}
        title={enabled ? "Auto-refresh activo" : "Auto-refresh pausado"}
      >
        {enabled ? "🟢 Live" : "⏸ Pausado"}
      </button>
      <button
        type="button"
        onClick={() => setAudio((v) => !v)}
        className={`rounded-md border px-2 py-1.5 text-xs ${
          audio
            ? "border-amber-700/50 bg-amber-900/20 text-amber-400"
            : "border-zinc-800 bg-zinc-900/70 text-zinc-500"
        }`}
        title={audio ? "Sonido activo" : "Sonido desactivado"}
        aria-label={audio ? "Desactivar sonido" : "Activar sonido"}
      >
        {audio ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
