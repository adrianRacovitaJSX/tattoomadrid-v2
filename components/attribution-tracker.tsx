"use client";

import { useEffect } from "react";
import { captureTouch } from "@/lib/attribution";

/** Guarda UTMs, click ids y referrer de la visita (primer y último contacto). */
export default function AttributionTracker() {
  useEffect(() => {
    captureTouch();
  }, []);
  return null;
}
