"use client";

import { useEffect } from "react";
import {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
} from "web-vitals/attribution";

const ENDPOINT = "/api/vitals";

// Tipo amplio: cada métrica del paquete /attribution añade su propio campo
// `attribution` con forma específica. No nos importa la forma concreta aquí.
type AnyAttributionMetric = {
  name: string;
  value: number;
  rating?: string;
  id: string;
  navigationType?: string;
  attribution?: unknown;
};

// Reporta cada métrica al endpoint sin bloquear la UI usando sendBeacon
// (cae a fetch keepalive si no está disponible). Captura attribution para
// detectar qué elemento/acción provocó la métrica — útil para depurar INP.
function send(metric: AnyAttributionMetric) {
  try {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
      navigationType: metric.navigationType,
      attribution: metric.attribution,
      url: window.location.href,
      ts: Date.now(),
    });

    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(ENDPOINT, body);
      if (ok) return;
    }

    fetch(ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      /* swallow — RUM no debe romper la página */
    });
  } catch {
    /* swallow */
  }
}

export default function WebVitals() {
  useEffect(() => {
    onCLS(send);
    onFCP(send);
    onINP(send);
    onLCP(send);
    onTTFB(send);
  }, []);

  return null;
}
