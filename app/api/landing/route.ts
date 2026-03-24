import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { Resend } from "resend";
import LandingAdminEmail from "@/emails/LandingAdmin";
import LandingUserEmail from "@/emails/LandingUser";

const resend = new Resend(process.env.RESEND_API_KEY);

const META_PIXEL_ID = process.env.META_PIXEL_ID || "2146708569419537";
const META_TOKEN = process.env.META_CONVERSIONS_API_TOKEN;
const META_API_VERSION = "v21.0";
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || null;

const N8N_LEAD_WEBHOOK_URL =
  process.env.N8N_LEAD_WEBHOOK_URL ||
  "https://snstattoomadrid.app.n8n.cloud/webhook/nuevo-lead";

/** Teléfono solo dígitos, prefijo 34 sin + (ej. 612 345 678 → 34612345678) */
function normalizePhoneForN8n(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.startsWith("34")) return digits;
  return `34${digits}`;
}

/** Envía lead a n8n; nunca lanza — fallos solo en log */
async function sendN8nLeadWebhook(payload: {
  nombre: string;
  telefono: string;
  email: string;
  descripcion_tatuaje: string;
}): Promise<void> {
  try {
    const res = await fetch(N8N_LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "n8n webhook error:",
        res.status,
        res.statusText,
        text.slice(0, 500)
      );
    }
  } catch (err) {
    console.error("n8n webhook fetch failed:", err);
  }
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
  sourceUrl,
  clientIp,
  userAgent,
}: {
  eventId: string;
  email: string;
  phone: string;
  firstName: string;
  fbp: string | null;
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
    const { name, phone, email, project, eventId, fbp, sourceUrl } = body;

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

    const telefonoN8n = normalizePhoneForN8n(String(phone));

    const emailStr = String(email || "").trim();

    // Siempre: admin email, CAPI, n8n
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
        sourceUrl: sourceUrl || "https://tattoomadrid.com/landing",
        clientIp,
        userAgent,
      }),
      sendN8nLeadWebhook({
        nombre: String(name).trim(),
        telefono: telefonoN8n,
        email: emailStr,
        descripcion_tatuaje: String(project).trim(),
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
