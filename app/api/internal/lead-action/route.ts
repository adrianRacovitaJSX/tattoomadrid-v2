import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INTERNAL_TOKEN = "sns-n8n-vision-2026-x7q4";

const ALLOWED_ESTADOS = new Set([
  "nuevo",
  "contactado",
  "conversando",
  "cita_agendada",
  "completado",
  "no_contactar",
  "perdido",
  "pendiente_humano",
]);

type Body = {
  id?: number;
  action?: "notes" | "estado";
  notas_agente?: string;
  estado?: string;
};

export async function POST(req: NextRequest) {
  const token = req.headers.get("x-internal-token");
  if (token !== INTERNAL_TOKEN) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.id || !body.action) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 400 }
    );
  }

  const supaUrl = process.env.SUPABASE_URL;
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supaUrl || !supaKey) {
    return NextResponse.json({ ok: false, error: "env_not_configured" }, { status: 503 });
  }

  const patch: Record<string, unknown> = {};
  if (body.action === "notes") {
    patch.notas_agente = typeof body.notas_agente === "string" ? body.notas_agente : "";
  } else if (body.action === "estado") {
    if (!body.estado || !ALLOWED_ESTADOS.has(body.estado)) {
      return NextResponse.json(
        { ok: false, error: "invalid_estado" },
        { status: 400 }
      );
    }
    patch.estado = body.estado;
  } else {
    return NextResponse.json({ ok: false, error: "invalid_action" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${supaUrl.replace(/\/$/, "")}/rest/v1/leads?id=eq.${body.id}`,
      {
        method: "PATCH",
        headers: {
          apikey: supaKey,
          Authorization: `Bearer ${supaKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(patch),
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `supabase_${res.status}`, detail: await res.text() },
        { status: 500 }
      );
    }
    const rows = (await res.json()) as unknown[];
    return NextResponse.json({ ok: true, lead: rows[0] ?? null });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "update_error" },
      { status: 500 }
    );
  }
}
