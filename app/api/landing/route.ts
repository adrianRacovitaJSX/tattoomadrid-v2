import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { Resend } from "resend";
import LandingAdminEmail from "@/emails/LandingAdmin";
import LandingUserEmail from "@/emails/LandingUser";
import { registrarLead } from "@/lib/leads/save";
import {
  classifyAttribution,
  sanitizeAttribution,
  type AttributionPayload,
  type Touch,
} from "@/lib/attribution";

const resend = new Resend(process.env.RESEND_API_KEY);

const META_PIXEL_ID = process.env.META_PIXEL_ID || "2146708569419537";
const META_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const META_API_VERSION = "v21.0";
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || null;

/** Teléfono solo dígitos, prefijo 34 sin + (ej. 612 345 678 → 34612345678) */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.startsWith("34")) return digits;
  return `34${digits}`;
}


/** Respaldo si el navegador no pudo guardar la atribución: parámetros de la URL de envío. */
function touchFromUrl(sourceUrl: string, referer: string | null): Touch | null {
  try {
    const u = new URL(sourceUrl);
    const t: Touch = { landing: u.pathname };
    for (const k of [
      "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id",
      "fbclid", "gclid", "gbraid", "wbraid", "ttclid", "msclkid",
    ] as const) {
      const v = u.searchParams.get(k);
      if (v) t[k] = v.slice(0, 200);
    }
    if (referer) {
      const r = new URL(referer);
      if (r.hostname !== u.hostname) t.referrer = r.hostname.toLowerCase();
    }
    return t;
  } catch {
    return null;
  }
}

/** Cookie _fbc de Meta a partir del fbclid (mejora el emparejamiento en CAPI). */
function buildFbc(fbclid: string | undefined, ts: number | undefined): string | null {
  if (!fbclid) return null;
  return `fb.1.${ts ?? Date.now()}.${fbclid}`;
}

function sha256(value: string): string {
  return createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

async function sendMetaConversionEvent({
  eventId,
  email,
  phone,
  firstName,
  fbp,
  fbc,
  sourceUrl,
  clientIp,
  userAgent,
}: {
  eventId: string;
  email: string;
  phone: string;
  firstName: string;
  fbp: string | null;
  fbc: string | null;
  sourceUrl: string;
  clientIp: string;
  userAgent: string;
}) {
  if (!META_TOKEN) {
    console.warn("META_CONVERSIONS_API_TOKEN not set, skipping server event");
    return null;
  }

  const normalizedPhone = phone.replace(/[\s\-()]/g, "").replace(/^0+/, "");
  const phoneWithCountry = normalizedPhone.startsWith("+")
    ? normalizedPhone
    : `+34${normalizedPhone}`;

  const userData: Record<string, unknown> = {
    ph: [sha256(phoneWithCountry)],
    fn: [sha256(firstName)],
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  if (email) {
    userData.em = [sha256(email)];
  }

  if (fbp) {
    userData.fbp = fbp;
  }

  if (fbc) {
    userData.fbc = fbc;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Contact",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
      },
    ],
  };

  if (META_TEST_EVENT_CODE) {
    payload.test_event_code = META_TEST_EVENT_CODE;
  }

  try {
    const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_TOKEN}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Meta CAPI error:", JSON.stringify(result));
    }

    return result;
  } catch (err) {
    console.error("Meta CAPI fetch failed:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, project, eventId, fbp, sourceUrl, fbc: fbcCookie } = body;

    if (!name || !phone || !project) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";
    const userAgent = req.headers.get("user-agent") || "";

    const telefono = normalizePhone(String(phone));

    // ── Atribución (fuente del lead) ──
    const attribution: AttributionPayload = sanitizeAttribution(body.attribution);
    if (!attribution.last && !attribution.first) {
      const fallback = touchFromUrl(String(sourceUrl || ""), req.headers.get("referer"));
      if (fallback) attribution.last = fallback;
    }
    const clasif = classifyAttribution(attribution, userAgent);
    const clickTouch = [attribution.last, attribution.first].find((t) => t?.fbclid);
    const fbc =
      (typeof fbcCookie === "string" && fbcCookie) ||
      buildFbc(clickTouch?.fbclid, clickTouch?.ts);

    const emailStr = String(email || "").trim();

    // Siempre: email al estudio, evento de Meta y registro del lead en Supabase
    const promises: Promise<unknown>[] = [
      resend.emails.send({
        from: "Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>",
        to: process.env.ADMIN_EMAIL || "snstattoomadrid@gmail.com",
        subject: `🔥 Nueva consulta landing: ${name}`,
        react: LandingAdminEmail({
          name,
          email: emailStr || "(no proporcionado)",
          phone,
          project,
        }) as React.ReactElement,
      }),
      sendMetaConversionEvent({
        eventId: eventId || `server.${Date.now()}`,
        email: emailStr,
        phone,
        firstName: name.split(" ")[0],
        fbp: fbp || null,
        fbc,
        sourceUrl: sourceUrl || "https://tattoomadrid.com/landing",
        clientIp,
        userAgent,
      }),
      registrarLead({
        nombre: String(name).trim(),
        telefono,
        email: emailStr,
        descripcion_tatuaje: String(project).trim(),
        fuente: clasif.fuente,
        canal: clasif.canal,
        plataforma: clasif.plataforma,
        campana: clasif.campana,
        atribucion: { ...attribution, inferido: clasif.inferido },
      }),
    ];

    // Solo enviar email de confirmación si el usuario proporcionó email
    if (emailStr) {
      promises.push(
        resend.emails.send({
          from: "Saints & Sinners Tattoo Madrid <notificaciones@tattoomadrid.com>",
          to: emailStr,
          subject: "Hemos recibido tu consulta — Saints & Sinners",
          react: LandingUserEmail({ name }) as React.ReactElement,
        })
      );
    }

    const [adminRes] = await Promise.all(promises);

    return NextResponse.json({
      success: true,
      adminEmailId: (adminRes as { data?: { id?: string } })?.data?.id,
    });
  } catch (error: unknown) {
    console.error("Error landing form:", error);
    return NextResponse.json(
      {
        error: "Error al procesar la solicitud",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
