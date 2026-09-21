/**
 * Atribución de leads: qué canal trajo al cliente.
 *
 * - En el navegador (`captureTouch` + `getAttributionPayload`) se guardan el
 *   primer contacto y el último contacto con señal (UTM, click id o referrer externo).
 * - En el servidor (`classifyAttribution`) se traduce a fuente / canal / plataforma.
 *
 * Este módulo no usa APIs de servidor: se importa desde cliente y desde la API.
 */

export type Touch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  fbclid?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  ttclid?: string;
  msclkid?: string;
  /** Host del referrer externo (sin ruta, por privacidad) */
  referrer?: string;
  /** Ruta de entrada al sitio, sin query */
  landing?: string;
  /** Navegador interno de una app: instagram | facebook | tiktok */
  inapp?: string;
  ts?: number;
};

export type AttributionPayload = {
  first?: Touch | null;
  last?: Touch | null;
};

export type Fuente =
  | "meta"
  | "google"
  | "tiktok"
  | "bing"
  | "ia"
  | "buscadores"
  | "email"
  | "referido"
  | "directo"
  | "otros";

export type Canal = "paid" | "organic" | "referral" | "direct";

export type Classification = {
  fuente: Fuente;
  canal: Canal;
  /** facebook | instagram | google_search | ... cuando se puede saber */
  plataforma: string | null;
  campana: string | null;
  /** true cuando "paid" se deduce sin UTM explícito (ver reglas) */
  inferido: boolean;
};

const PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
] as const;

const PAID_MEDIUMS = new Set([
  "paid",
  "cpc",
  "ppc",
  "cpm",
  "paid_social",
  "paidsocial",
  "paid-social",
  "social_paid",
  "ads",
  "ad",
  "display",
  "retargeting",
]);

const META_SOURCES = new Set(["facebook", "fb", "instagram", "ig", "meta", "an", "msg", "messenger", "audience_network"]);
const IG_SOURCES = new Set(["instagram", "ig"]);

const STORAGE_FIRST = "sns_attr_first";
const STORAGE_LAST = "sns_attr_last";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 días

/* ─────────────────────────── CLIENTE ─────────────────────────── */

function detectInApp(ua: string): string | undefined {
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) return "facebook";
  if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return "tiktok";
  return undefined;
}

function hasSignal(t: Touch): boolean {
  return PARAMS.some((k) => Boolean(t[k])) || Boolean(t.referrer) || Boolean(t.inapp);
}

function readStored(key: string): Touch | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const t = JSON.parse(raw) as Touch;
    if (t.ts && Date.now() - t.ts > TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return t;
  } catch {
    return null;
  }
}

function store(key: string, t: Touch) {
  try {
    localStorage.setItem(key, JSON.stringify(t));
  } catch {
    /* modo privado o storage bloqueado: seguimos sin persistir */
  }
}

/** Llamar una vez por carga de página completa (entrada al sitio). */
export function captureTouch(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  const t: Touch = { landing: url.pathname, ts: Date.now() };

  for (const k of PARAMS) {
    const v = url.searchParams.get(k);
    if (v) t[k] = v.slice(0, 200);
  }

  try {
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.hostname && ref.hostname !== url.hostname) t.referrer = ref.hostname.toLowerCase();
    }
  } catch {
    /* referrer inválido */
  }

  const inapp = detectInApp(navigator.userAgent || "");
  if (inapp) t.inapp = inapp;

  const first = readStored(STORAGE_FIRST);
  if (!first) store(STORAGE_FIRST, t);
  if (hasSignal(t)) store(STORAGE_LAST, t);
}

/** Lo que se envía con el formulario. */
export function getAttributionPayload(): AttributionPayload {
  if (typeof window === "undefined") return {};
  return { first: readStored(STORAGE_FIRST), last: readStored(STORAGE_LAST) };
}

/* ─────────────────────────── CLASIFICACIÓN ─────────────────────────── */

const lc = (v?: string) => (v || "").trim().toLowerCase();

function isHost(host: string, ...domains: string[]) {
  return domains.some((d) => host === d || host.endsWith(`.${d}`));
}

function classifyTouch(t: Touch): Classification {
  const src = lc(t.utm_source);
  const med = lc(t.utm_medium);
  const ref = lc(t.referrer);
  const campana = t.utm_campaign?.trim() || null;
  const paidMedium = PAID_MEDIUMS.has(med);

  // ── Google Ads (click id automático) ──
  if (t.gclid || t.gbraid || t.wbraid) {
    return { fuente: "google", canal: "paid", plataforma: "google_ads", campana, inferido: false };
  }

  // ── Meta ──
  const metaByUtm = META_SOURCES.has(src);
  const metaByRef = isHost(ref, "facebook.com", "instagram.com", "fb.me", "fb.com", "messenger.com");
  const metaByApp = t.inapp === "instagram" || t.inapp === "facebook";
  if (metaByUtm || t.fbclid || metaByRef || metaByApp) {
    const plataforma =
      IG_SOURCES.has(src) || ref.includes("instagram") || t.inapp === "instagram"
        ? "instagram"
        : src === "an" || src === "audience_network"
          ? "audience_network"
          : src === "msg" || src === "messenger" || ref.includes("messenger")
            ? "messenger"
            : "facebook";

    if (paidMedium) return { fuente: "meta", canal: "paid", plataforma, campana, inferido: false };
    if (metaByUtm && med && !paidMedium) return { fuente: "meta", canal: "organic", plataforma, campana, inferido: false };

    // Sin utm_medium: los anuncios de SNS llevan a /landing*, que no se enlaza
    // desde perfiles ni publicaciones. fbclid + entrada por /landing ⇒ anuncio.
    if (t.fbclid && (t.landing || "").startsWith("/landing")) {
      return { fuente: "meta", canal: "paid", plataforma, campana, inferido: true };
    }
    return { fuente: "meta", canal: "organic", plataforma, campana, inferido: false };
  }

  // ── TikTok ──
  if (t.ttclid) return { fuente: "tiktok", canal: "paid", plataforma: "tiktok", campana, inferido: false };
  if (src === "tiktok" || isHost(ref, "tiktok.com") || t.inapp === "tiktok") {
    return { fuente: "tiktok", canal: paidMedium ? "paid" : "organic", plataforma: "tiktok", campana, inferido: false };
  }

  // ── Microsoft Ads / Bing ──
  if (t.msclkid) return { fuente: "bing", canal: "paid", plataforma: "microsoft_ads", campana, inferido: false };

  // ── Google con UTM (p. ej. Google Business Profile: utm_source=google&utm_medium=organic) ──
  if (src === "google") {
    const plataforma = med === "gbp" || lc(t.utm_campaign).includes("gbp") ? "google_business" : null;
    return { fuente: "google", canal: paidMedium ? "paid" : "organic", plataforma, campana, inferido: false };
  }

  // ── Asistentes de IA ──
  if (
    ["chatgpt.com", "chat.openai.com", "openai.com", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "claude.ai"].some(
      (d) => isHost(ref, d)
    ) ||
    ["chatgpt", "chatgpt.com", "perplexity", "gemini", "copilot", "claude"].includes(src)
  ) {
    return { fuente: "ia", canal: "referral", plataforma: ref || src || null, campana, inferido: false };
  }

  // ── Buscadores (orgánico) ──
  if (/(^|\.)google\.[a-z.]+$/.test(ref) && !ref.startsWith("mail.")) {
    const plataforma = ref.startsWith("maps.") ? "google_maps" : "google_search";
    return { fuente: "google", canal: "organic", plataforma, campana, inferido: false };
  }
  if (isHost(ref, "bing.com")) return { fuente: "bing", canal: "organic", plataforma: "bing", campana, inferido: false };
  if (["duckduckgo.com", "yahoo.com", "ecosia.org", "yandex.com", "search.brave.com"].some((d) => isHost(ref, d))) {
    return { fuente: "buscadores", canal: "organic", plataforma: ref, campana, inferido: false };
  }

  // ── Email ──
  if (med === "email" || src === "newsletter" || isHost(ref, "mail.google.com", "outlook.live.com")) {
    return { fuente: "email", canal: "referral", plataforma: src || ref || null, campana, inferido: false };
  }

  // ── Otras UTM ──
  if (src) {
    return { fuente: "otros", canal: paidMedium ? "paid" : "referral", plataforma: src, campana, inferido: false };
  }

  // ── Referrer externo ──
  if (ref) return { fuente: "referido", canal: "referral", plataforma: ref, campana, inferido: false };

  return { fuente: "directo", canal: "direct", plataforma: null, campana, inferido: false };
}

/**
 * Último contacto con señal y, si no hay, el primero.
 * `userAgent` del servidor como respaldo si el navegador no guardó nada
 * (p. ej. localStorage bloqueado dentro de Instagram).
 */
export function classifyAttribution(p: AttributionPayload | null | undefined, userAgent = ""): Classification {
  const touch: Touch | null | undefined = p?.last && hasSignal(p.last) ? p.last : p?.first;
  const t: Touch = { ...(touch || {}) };
  if (!t.inapp && userAgent) {
    const inapp = detectInApp(userAgent);
    if (inapp) t.inapp = inapp;
  }
  return classifyTouch(t);
}

/** Limpia el payload recibido del cliente antes de guardarlo (tamaño y claves conocidas). */
export function sanitizeAttribution(p: unknown): AttributionPayload {
  const clean = (x: unknown): Touch | null => {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    const out: Touch = {};
    for (const k of [...PARAMS, "referrer", "landing", "inapp"] as const) {
      const v = o[k];
      if (typeof v === "string" && v) out[k] = v.slice(0, 200);
    }
    if (typeof o.ts === "number" && Number.isFinite(o.ts)) out.ts = o.ts;
    return out;
  };
  const obj = (p && typeof p === "object" ? p : {}) as Record<string, unknown>;
  return { first: clean(obj.first), last: clean(obj.last) };
}

/* ─────────────────────────── ETIQUETAS (panel) ─────────────────────────── */

export const FUENTE_LABEL: Record<string, string> = {
  meta: "Meta",
  google: "Google",
  tiktok: "TikTok",
  bing: "Bing",
  ia: "IA (ChatGPT…)",
  buscadores: "Otros buscadores",
  email: "Email",
  referido: "Web externa",
  directo: "Directo",
  otros: "Otros",
};

export const CANAL_LABEL: Record<string, string> = {
  paid: "Pago",
  organic: "Orgánico",
  referral: "Referido",
  direct: "Directo",
};

export const PLATAFORMA_LABEL: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  messenger: "Messenger",
  audience_network: "Audience Network",
  google_ads: "Google Ads",
  google_search: "Búsqueda",
  google_maps: "Maps",
  google_business: "Ficha de Google",
  microsoft_ads: "Microsoft Ads",
  tiktok: "TikTok",
};
