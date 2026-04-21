import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
export const maxDuration = 60;

const GEMINI_API_KEY = "AIzaSyBZRWZVkg767JVvefMx1_3hJffqqKbLw1Y";
const WHAPI_BEARER = "2XaE5PolDYlYQBp3Nlstur3D8QT28c1j";

const IMAGE_PROMPT =
  "Describe brevemente en español esta imagen que un cliente envía como referencia para un tatuaje. Incluye: estilo (realismo, geométrico, blackwork, old school, japonés, lettering, acuarela, minimalista...), qué elementos contiene o se tatuarían, tamaño relativo si se aprecia, y tono emocional. Máximo 3 frases, directo al grano.";

const AUDIO_PROMPT =
  "Transcribe fielmente en español este audio de WhatsApp que un cliente envía para describir el tatuaje que quiere. Devuelve SOLO la transcripción textual (sin etiquetas, sin comentarios). Si hay ruido o falta claridad, transcribe lo que se entienda.";

type Body = {
  mediaUrl?: string;
  mediaKind?: "image" | "audio";
  mimeType?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const url = body.mediaUrl;
  const kind = body.mediaKind === "audio" ? "audio" : "image";
  if (!url) {
    return NextResponse.json(
      { ok: false, error: "missing_mediaUrl", description: "" },
      { status: 400 }
    );
  }

  let mimeType = body.mimeType || (kind === "image" ? "image/jpeg" : "audio/ogg");
  let base64 = "";

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${WHAPI_BEARER}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return NextResponse.json({
        ok: false,
        error: `download_failed_${res.status}`,
        description: "",
      });
    }
    const ct = res.headers.get("content-type") || "";
    if (ct && !ct.includes("application/json")) {
      mimeType = ct.split(";")[0];
    }
    const arr = await res.arrayBuffer();
    base64 = Buffer.from(arr).toString("base64");
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "download_error",
      description: "",
    });
  }

  const prompt = kind === "audio" ? AUDIO_PROMPT : IMAGE_PROMPT;

  try {
    const gem = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType, data: base64 } },
              ],
            },
          ],
          generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
        }),
        signal: AbortSignal.timeout(30000),
      }
    );
    if (!gem.ok) {
      const errTxt = await gem.text();
      return NextResponse.json({
        ok: false,
        error: `gemini_${gem.status}`,
        detail: errTxt.slice(0, 500),
        description: "",
      });
    }
    const data = await gem.json();
    const description: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    return NextResponse.json({
      ok: !!description,
      description,
      mediaKind: kind,
      mimeType,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "gemini_error",
      description: "",
    });
  }
}
