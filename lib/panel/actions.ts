"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/panel/auth";
import { updatePanelLead } from "@/lib/panel/data";

type ActionResult = { ok: true } | { ok: false; error: string };

async function assertSession(): Promise<void> {
  if (!process.env.AUTH_SECRET) throw new Error("No autorizado");
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");
}

export async function marcarReservado(id: number): Promise<ActionResult> {
  try {
    await assertSession();
    await updatePanelLead(id, { estado: "cita_agendada" });
    revalidatePath("/panel");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error" };
  }
}

export async function registrarPago(
  id: number,
  importe: number
): Promise<ActionResult> {
  try {
    await assertSession();
    if (!Number.isFinite(importe) || importe <= 0 || importe > 100000) {
      return { ok: false, error: "Importe no válido" };
    }
    await updatePanelLead(id, {
      estado: "completado",
      precio_pagado: Math.round(importe * 100) / 100,
      fecha_pago: new Date().toISOString(),
    });
    revalidatePath("/panel");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error" };
  }
}

export async function quitarPago(id: number): Promise<ActionResult> {
  try {
    await assertSession();
    await updatePanelLead(id, {
      estado: "cita_agendada",
      precio_pagado: null,
      fecha_pago: null,
    });
    revalidatePath("/panel");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error" };
  }
}

export async function marcarPerdido(id: number): Promise<ActionResult> {
  try {
    await assertSession();
    await updatePanelLead(id, { estado: "perdido" });
    revalidatePath("/panel");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error" };
  }
}
