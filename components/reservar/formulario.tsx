"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTISTS } from "@/lib/artists";
import { getAttributionPayload } from "@/lib/attribution";
import { WhatsAppLink } from "@/components/site/cta-link";
import { track } from "@/components/site/track";

/**
 * Formulario de cita. Envía a /api/landing, el mismo flujo que las landings:
 * registra el lead en Supabase con su atribución, avisa al estudio por email
 * y manda el evento de conversión a Meta. Las referencias en imagen se piden
 * por WhatsApp tras el envío (la API no guarda archivos).
 */

const SIZES = ["Pequeño (hasta 10 cm)", "Mediano (10–20 cm)", "Grande (más de 20 cm)", "Manga, pierna o espalda"];

type Field = "name" | "phone" | "email" | "idea" | "privacy";
type Errors = Partial<Record<Field, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").replace(/\D/g, "");
  const email = String(data.get("email") || "").trim();
  const idea = String(data.get("idea") || "").trim();

  if (name.length < 2) errors.name = "Escribe tu nombre.";
  if (phone.length < 9 || phone.length > 13) errors.phone = "Escribe un teléfono válido, por ejemplo 612 345 678.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Revisa el email o déjalo vacío.";
  if (idea.length < 5) errors.idea = "Cuéntanos en una frase qué te quieres tatuar.";
  if (!data.get("privacy")) errors.privacy = "Necesitamos que aceptes la política de privacidad para contactarte.";
  return errors;
}

const inputCls = (invalid: boolean) =>
  cn(
    "block h-12 w-full rounded-[4px] border bg-ink px-4 text-base text-bone placeholder:text-ash/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30",
    invalid ? "border-destructive" : "border-line hover:border-bone/30"
  );

const labelCls = "mb-2 block text-sm font-medium text-bone";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
      <AlertCircle aria-hidden className="size-4 shrink-0" /> {message}
    </p>
  );
}

export default function ReservaForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [firstName, setFirstName] = useState("");

  // Valida un campo al salir de él, solo si ya había error o tiene contenido.
  const onBlur = (field: Field) => {
    if (!formRef.current) return;
    const all = validate(new FormData(formRef.current));
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot

    const found = validate(data);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const artistSlug = String(data.get("artist") || "");
    const artist = ARTISTS.find((a) => a.slug === artistSlug)?.name ?? "Sin preferencia";
    const project = [
      "RESERVA WEB",
      `Idea: ${String(data.get("idea")).trim()}`,
      data.get("placement") && `Zona: ${String(data.get("placement")).trim()}`,
      data.get("size") && `Tamaño: ${data.get("size")}`,
      `Artista: ${artist}`,
    ]
      .filter(Boolean)
      .join(" · ");

    setStatus("loading");
    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name")).trim(),
          phone: String(data.get("phone")).trim(),
          email: String(data.get("email") || "").trim(),
          project,
          eventId: `${Date.now()}.${Math.random().toString(36).slice(2, 11)}`,
          sourceUrl: window.location.href,
          attribution: getAttributionPayload(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setFirstName(String(data.get("name")).trim().split(" ")[0]);
      setStatus("success");
      track("generate_lead", { form: "reservar", artist: artistSlug || "sin_preferencia" });
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-[4px] border border-line bg-surface-1 p-6 sm:p-8">
        <CheckCircle2 aria-hidden className="size-8 text-gold" />
        <h2 className="font-display mt-4 text-3xl text-bone">Recibido{firstName ? `, ${firstName}` : ""}</h2>
        <p className="mt-3 leading-relaxed text-ash">
          Te escribimos por WhatsApp con propuesta y fechas. Si tienes fotos de referencia, mándalas ya por WhatsApp y el artista las verá antes.
        </p>
        <div className="mt-6">
          <WhatsAppLink placement="reservar-exito" message="Hola, acabo de enviar el formulario de cita. Os mando mis referencias:">
            Enviar referencias por WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    );
  }

  const errorProps = (field: Field) =>
    errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="rounded-[4px] border border-line bg-surface-1 p-6 sm:p-8">
      {/* Honeypot: invisible para personas, los bots lo rellenan */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          No rellenar
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <div role="alert" className="mb-6 rounded-[4px] border border-destructive/40 bg-destructive/10 p-4 text-sm text-bone">
          <p className="font-medium">No hemos podido enviar el formulario.</p>
          <p className="mt-1 text-ash">Vuelve a intentarlo o escríbenos por WhatsApp y te atendemos al momento.</p>
          <div className="mt-3">
            <WhatsAppLink placement="reservar-error">Escribir por WhatsApp</WhatsAppLink>
          </div>
        </div>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Tus datos</legend>
        <div>
          <label htmlFor="name" className={labelCls}>
            Nombre <span className="text-gold">*</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="given-name" required onBlur={() => onBlur("name")} className={inputCls(!!errors.name)} {...errorProps("name")} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Teléfono (WhatsApp) <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="612 345 678"
            onBlur={() => onBlur("phone")}
            className={inputCls(!!errors.phone)}
            {...errorProps("phone")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            Email <span className="font-normal text-ash">(opcional)</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" onBlur={() => onBlur("email")} className={inputCls(!!errors.email)} {...errorProps("email")} />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </fieldset>

      <fieldset className="mt-8 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
        <legend className="sr-only">Tu tatuaje</legend>
        <div className="sm:col-span-2">
          <label htmlFor="idea" className={labelCls}>
            ¿Qué te quieres tatuar? <span className="text-gold">*</span>
          </label>
          <textarea
            id="idea"
            name="idea"
            rows={4}
            required
            placeholder="Ej.: una manga realista con un león y un reloj, en black and grey"
            onBlur={() => onBlur("idea")}
            className={cn(inputCls(!!errors.idea), "h-auto resize-y py-3")}
            {...errorProps("idea")}
          />
          <FieldError id="idea-error" message={errors.idea} />
        </div>
        <div>
          <label htmlFor="placement" className={labelCls}>
            Zona del cuerpo
          </label>
          <input id="placement" name="placement" type="text" placeholder="Antebrazo, espalda…" className={inputCls(false)} />
        </div>
        <div>
          <label htmlFor="size" className={labelCls}>
            Tamaño aproximado
          </label>
          <select id="size" name="size" defaultValue="" className={cn(inputCls(false), "cursor-pointer")}>
            <option value="">No lo sé aún</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="artist" className={labelCls}>
            Artista
          </label>
          <select id="artist" name="artist" defaultValue="" className={cn(inputCls(false), "cursor-pointer")}>
            <option value="">Sin preferencia: recomendadme</option>
            {ARTISTS.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className="mt-8 border-t border-line pt-6">
        <div className="flex items-start gap-3">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            required
            onChange={() => errors.privacy && onBlur("privacy")}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--color-gold)]"
            {...errorProps("privacy")}
          />
          <label htmlFor="privacy" className="text-sm leading-relaxed text-ash">
            He leído y acepto la{" "}
            <Link href="/privacidad" className="text-gold underline-offset-2 hover:underline">
              política de privacidad
            </Link>
            . Usaremos tus datos solo para responder a tu consulta. <span className="text-gold">*</span>
          </label>
        </div>
        <FieldError id="privacy-error" message={errors.privacy} />

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-gold px-7 font-medium text-ink transition-colors hover:bg-gold-strong disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden className="size-5 animate-spin" /> Enviando…
            </>
          ) : (
            "Enviar solicitud"
          )}
        </button>
        <p className="mt-3 text-xs text-ash">Sin compromiso. Te respondemos por WhatsApp.</p>
      </div>
    </form>
  );
}
