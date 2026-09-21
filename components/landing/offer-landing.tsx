"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAttributionPayload } from "@/lib/attribution";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Instagram,
  Loader2,
  MapPin,
  Shield,
  Star,
} from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* ─────────── CONFIG ─────────── */
export type OfferLandingConfig = {
  /** Etiqueta que viaja en `descripcion_tatuaje` para reconocer la oferta en el panel y en n8n */
  projectLabel: string;
  urgency: string;
  headlineStart: string;
  headlineAccent: string;
  subtitle: string;
  price: string;
  priceNote: string;
  availability: string;
  ctaLabel: string;
  heroImage: string;
  galleryKicker: string;
  galleryTitle: string;
  galleryAccent: string;
  gallerySubtitle: string;
  gallery: Array<{ title: string; src: string; span?: string }>;
  includedTitle: string;
  includedAccent: string;
  included: Array<{ title: string; desc: string }>;
  steps: Array<{ num: string; title: string; time: string; desc: string }>;
  formTitle: string;
  formAccent: string;
  formQuestion: string;
  formOptions: string[];
  formPlaceholder: string;
  faqs: Array<{ q: string; a: string }>;
  whatsappText: string;
};

/* ─────────── HELPERS ─────────── */
function scrollToForm() {
  document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
}

function generateEventId() {
  return `${Date.now()}.${Math.random().toString(36).slice(2, 11)}`;
}

function getFbp(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)_fbp=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const SANS = "font-[family-name:var(--font-dm-sans)]";
const SERIF = "font-[family-name:var(--font-playfair)]";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

function PrimaryButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm sm:text-base tracking-wider uppercase hover:from-[#d4a96a] hover:to-[#be8f52] transition-all duration-300 cursor-pointer ${SANS} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
}

function SectionHeading({
  kicker,
  title,
  accent,
  subtitle,
}: {
  kicker: string;
  title: string;
  accent: string;
  subtitle?: string;
}) {
  return (
    <FadeIn className="text-center mb-12">
      <p className={`text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 ${SANS} mb-4`}>
        {kicker}
      </p>
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white ${SERIF}`}>
        {title} <span className="italic text-[#be8f52]">{accent}</span>
      </h2>
      {subtitle && (
        <p className={`mt-4 text-zinc-500 text-base ${SANS} font-light`}>{subtitle}</p>
      )}
    </FadeIn>
  );
}

/* ─────────── 1. BARRA DE URGENCIA ─────────── */
function UrgencyBar({ text }: { text: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#be8f52] text-black">
      <div className="container mx-auto max-w-6xl px-4 py-2.5 text-center">
        <p className={`text-xs sm:text-sm font-semibold tracking-wide ${SANS}`}>{text}</p>
      </div>
    </div>
  );
}

/* ─────────── 2. HERO ─────────── */
function Hero({ c }: { c: OfferLandingConfig }) {
  return (
    <section className="relative min-h-[85svh] sm:min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-10">
      <div className="absolute inset-0 z-0">
        <Image
          src={c.heroImage}
          alt=""
          fill
          className="object-cover brightness-[0.25]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(190,143,82,0.08)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl px-5 pt-16 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className={`inline-flex items-center gap-2 px-5 py-2 mb-8 text-[11px] font-medium tracking-[0.2em] uppercase text-[#be8f52] border border-[#be8f52]/30 bg-[#be8f52]/5 backdrop-blur-sm ${SANS}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#be8f52]" />
            Saints &amp; Sinners by Gamboa
            <span className="w-1.5 h-1.5 rounded-full bg-[#be8f52]" />
          </span>

          <h1 className={`text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white ${SERIF}`}>
            {c.headlineStart}{" "}
            <span className="italic bg-gradient-to-r from-[#be8f52] via-[#d4a96a] to-[#a67a3d] bg-clip-text text-transparent">
              {c.headlineAccent}
            </span>
          </h1>

          {/* Precio */}
          <div className="mt-8 flex flex-col items-center gap-1">
            <span className={`text-6xl sm:text-7xl md:text-8xl font-black text-white leading-none ${SERIF}`}>
              {c.price}
            </span>
            <span className={`text-sm sm:text-base text-[#be8f52] tracking-wide ${SANS} font-medium`}>
              {c.priceNote}
            </span>
          </div>

          <p className={`mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed ${SANS} font-light`}>
            {c.subtitle}
          </p>

          <p className={`mt-4 text-sm text-[#be8f52]/80 ${SANS} font-medium tracking-wide`}>
            {c.availability}
          </p>

          <PrimaryButton onClick={scrollToForm} className="mt-8">
            {c.ctaLabel}
          </PrimaryButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={`mt-14 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-zinc-500 ${SANS}`}
        >
          {[
            { icon: Star, text: "4.9 en Google" },
            { icon: null, text: "13+ años" },
            { icon: null, text: "+5.000 clientes" },
            { icon: MapPin, text: "Ciudad Lineal, Madrid" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-1.5 px-2">
              {item.icon ? (
                <item.icon className="w-3.5 h-3.5 text-[#be8f52]/70" />
              ) : (
                <span className="w-1 h-1 rounded-full bg-[#be8f52]/50" />
              )}
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-5 h-5 text-white/20" />
      </motion.div>
    </section>
  );
}

/* ─────────── 3. GALERÍA ─────────── */
function Gallery({ c }: { c: OfferLandingConfig }) {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d0d] to-[#0A0A0A]" />
      <div className="relative z-10 container mx-auto max-w-6xl px-5">
        <SectionHeading
          kicker={c.galleryKicker}
          title={c.galleryTitle}
          accent={c.galleryAccent}
          subtitle={c.gallerySubtitle}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {c.gallery.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.08} className={item.span ?? ""}>
              <div className="group relative overflow-hidden aspect-[3/4] bg-zinc-900 border border-white/[0.04]">
                <Image
                  src={item.src}
                  alt={`${item.title} — Saints & Sinners Madrid`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes={item.span?.includes("col-span-2") ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#be8f52]/20 z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#be8f52]/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <p className={`text-white text-sm font-semibold ${SANS} tracking-wide drop-shadow-lg`}>
                    {item.title}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <motion.button
            type="button"
            onClick={scrollToForm}
            className={`inline-flex items-center gap-2 px-6 py-3 text-sm text-[#be8f52] border border-[#be8f52]/30 hover:bg-[#be8f52]/10 transition-colors ${SANS} font-medium tracking-wider uppercase cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {c.ctaLabel}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────── 4. QUÉ INCLUYE ─────────── */
function Included({ c }: { c: OfferLandingConfig }) {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d] to-transparent" />
      <div className="relative z-10 container mx-auto max-w-5xl px-5">
        <SectionHeading kicker="La oferta" title={c.includedTitle} accent={c.includedAccent} />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {c.included.map((r, i) => (
            <FadeIn key={r.title} delay={i * 0.12}>
              <div className="h-full p-6 border border-white/[0.06] bg-white/[0.02] hover:border-[#be8f52]/20 transition-colors duration-500">
                <div className="inline-flex items-center justify-center w-9 h-9 border border-[#be8f52]/40 text-[#be8f52] mb-4">
                  <Check className="w-4 h-4" />
                </div>
                <h3 className={`text-lg font-semibold text-white mb-2 ${SANS}`}>{r.title}</h3>
                <p className={`text-sm text-zinc-500 leading-relaxed ${SANS} font-light`}>{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── 5. TESTIMONIOS ─────────── */
const testimonials = [
  {
    text: "Tengo varios tatuajes aquí y todos perfectos, Gamboa sabe!! 💪",
    name: "Adrian Liviu Racovita",
    img: "/resenas-sns/adrian.webp",
  },
  {
    text: "Vine hacerme un tatuaje con mi mejor amiga y la verdad que 10/10 una atención buena. Nos tatuó Alex y la verdad que muy buen tatuador.",
    name: "Pamela Velastegui",
    img: "/resenas-sns/pamela.webp",
  },
  {
    text: "Excelente ambiente y la calidad del tatuaje por el tatuador Gamboa muy profesional muy recomendado volveré seguro",
    name: "Jorge Pinho",
    img: "/resenas-sns/jorge.webp",
  },
];

function Testimonials() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,143,82,0.04)_0%,transparent_50%)]" />
      <div className="relative z-10 container mx-auto max-w-5xl px-5">
        <SectionHeading kicker="Testimonios" title="Lo que dicen" accent="nuestros clientes" />

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.12}>
              <div className="relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group hover:border-[#be8f52]/20 transition-colors duration-500 overflow-hidden h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={t.img}
                    alt={`Reseña de ${t.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#be8f52] text-[#be8f52]" />
                    ))}
                  </div>
                  <p className={`text-zinc-300 text-sm leading-relaxed ${SANS} font-light italic`}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className={`mt-4 text-white text-sm font-semibold ${SANS}`}>— {t.name}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── 6. PROCESO ─────────── */
function Process({ c }: { c: OfferLandingConfig }) {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0e0e0e] to-[#0A0A0A]" />
      <div className="relative z-10 container mx-auto max-w-5xl px-5">
        <SectionHeading kicker="Proceso" title="Cómo" accent="funciona" />

        <div className="grid md:grid-cols-3 gap-8">
          {c.steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.15}>
              <div className="relative text-center md:text-left">
                <div className={`inline-flex items-center justify-center w-12 h-12 border border-[#be8f52]/30 text-[#be8f52] font-bold text-lg ${SERIF} mb-5`}>
                  {s.num}
                </div>
                <p className={`text-[10px] tracking-[0.2em] uppercase text-[#be8f52]/50 ${SANS} mb-2`}>{s.time}</p>
                <h3 className={`text-lg font-semibold text-white mb-2 ${SANS}`}>{s.title}</h3>
                <p className={`text-sm text-zinc-500 leading-relaxed ${SANS} font-light`}>{s.desc}</p>
                {i < c.steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-4 w-8 border-t border-dashed border-[#be8f52]/20" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <PrimaryButton onClick={scrollToForm}>{c.ctaLabel}</PrimaryButton>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────── 7. FORMULARIO ─────────── */
type FormStatus = "idle" | "loading" | "success" | "error";

const inputCls = `w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-[#be8f52]/60 focus:ring-1 focus:ring-[#be8f52]/20 transition-colors text-sm ${SANS}`;
const labelCls = `block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider ${SANS}`;

function ConversionForm({ c }: { c: OfferLandingConfig }) {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selected, setSelected] = useState("");
  const [idea, setIdea] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot

    setStatus("loading");
    const eventId = generateEventId();
    const fbp = getFbp();

    const details = [selected, idea.trim()].filter(Boolean).join(" · ");
    const project = details ? `${c.projectLabel} — ${details}` : c.projectLabel;

    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || "",
          project,
          eventId,
          fbp,
          sourceUrl: window.location.href,
          attribution: getAttributionPayload(),
          fbc: document.cookie.match(/(?:^|;\s*)_fbc=([^;]*)/)?.[1] ?? null,
        }),
      });
      if (!res.ok) throw new Error("Error");
      window.fbq?.("track", "Contact", {}, { eventID: eventId });
      router.push("/landing/gracias");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="formulario" className="py-16 sm:py-24 relative scroll-mt-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(190,143,82,0.06)_0%,transparent_50%)]" />
      <div className="relative z-10 container mx-auto max-w-xl px-5">
        <FadeIn>
          <div className="p-6 sm:p-10 border border-white/[0.06] bg-[#0e0e0e]">
            <div className="text-center mb-8">
              <p className={`text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 ${SANS} mb-3`}>
                {c.price} · {c.priceNote}
              </p>
              <h2 className={`text-2xl sm:text-3xl font-bold text-white ${SERIF}`}>
                {c.formTitle} <span className="italic text-[#be8f52]">{c.formAccent}</span>
              </h2>
              <p className={`mt-2 text-zinc-500 text-sm ${SANS}`}>Te respondemos por WhatsApp en menos de 2 horas</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  No rellenar
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div>
                <p className={`${labelCls} mb-2.5`}>{c.formQuestion}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {c.formOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelected(opt === selected ? "" : opt)}
                      aria-pressed={selected === opt}
                      className={`px-3 py-3 text-sm border transition-all duration-200 cursor-pointer ${SANS} font-medium ${
                        selected === opt
                          ? "border-[#be8f52] text-[#be8f52] bg-[#be8f52]/10"
                          : "border-white/[0.08] text-zinc-400 hover:border-[#be8f52]/40 hover:text-white bg-white/[0.02]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder={c.formPlaceholder}
                  maxLength={200}
                  className={`${inputCls} mt-2.5`}
                />
              </div>

              <div>
                <label htmlFor="name" className={labelCls}>Nombre *</label>
                <input id="name" name="name" type="text" required autoComplete="name" className={inputCls} placeholder="Tu nombre" />
              </div>

              <div>
                <label htmlFor="phone" className={labelCls}>Teléfono *</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputCls} placeholder="612 345 678" />
              </div>

              <div>
                <label htmlFor="email" className={labelCls}>Email (opcional)</label>
                <input id="email" name="email" type="email" autoComplete="email" className={inputCls} placeholder="tu@email.com" />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className={`w-full py-4 mt-2 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm tracking-wider uppercase hover:from-[#d4a96a] hover:to-[#be8f52] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer ${SANS}`}
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  <>
                    {c.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {status === "error" && (
                <p className={`text-red-400 text-sm text-center ${SANS}`}>
                  Algo falló. Inténtalo de nuevo o escríbenos por WhatsApp.
                </p>
              )}
            </form>

            <p className={`mt-5 text-xs text-zinc-600 text-center ${SANS}`}>
              Sin compromiso · Sin depósito · Respuesta en menos de 2h
            </p>

            <div className={`mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-zinc-500 ${SANS}`}>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-[#be8f52]/60" />4.9 Google</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#be8f52]/60" />Licencia sanitaria CM</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#be8f52]/60" />{c.availability}</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────── 8. FAQ ─────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.04] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className={`text-sm sm:text-base font-medium text-white pr-4 ${SANS} group-hover:text-[#be8f52] transition-colors`}>
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown className="w-4 h-4 text-[#be8f52]/60" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`pb-5 text-sm text-zinc-500 leading-relaxed ${SANS} font-light`}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection({ c }: { c: OfferLandingConfig }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-2xl px-5">
        <SectionHeading kicker="FAQ" title="Preguntas" accent="frecuentes" />
        <FadeIn>
          <div className="border border-white/[0.06] bg-white/[0.01] p-5 sm:p-8">
            {c.faqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────── 9. FOOTER ─────────── */
function FooterStrip() {
  return (
    <footer className="py-10 border-t border-white/[0.04]">
      <div className="container mx-auto max-w-4xl px-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className={`flex items-center gap-1.5 text-sm text-zinc-500 ${SANS}`}>
            <MapPin className="w-3.5 h-3.5 text-[#be8f52]/50" />
            C. de los Hermanos Gómez, 5 · Ciudad Lineal · 28017 Madrid
          </div>
          <Link
            href="https://www.instagram.com/saintsandsinnersmadrid/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#be8f52] transition-colors ${SANS}`}
          >
            <Instagram className="w-3.5 h-3.5" />
            @saintsandsinnersmadrid
          </Link>
          <p className={`text-xs text-zinc-700 ${SANS}`}>© 2026 Saints &amp; Sinners by Gamboa</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── STICKY CTA MÓVIL + WHATSAPP ─────────── */
function useScrolledPast(px: number) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > px);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [px]);
  return visible;
}

function StickyMobileCTA({ c }: { c: OfferLandingConfig }) {
  const visible = useScrolledPast(200);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/[0.06] sm:hidden"
        >
          <button
            type="button"
            onClick={scrollToForm}
            className={`w-full py-3.5 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm tracking-wider uppercase active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2 ${SANS}`}
          >
            {c.ctaLabel} · {c.price}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WhatsAppFloat({ text }: { text: string }) {
  const visible = useScrolledPast(500);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50"
        >
          <Link
            href={`https://wa.me/34603211318?text=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 pl-4 pr-5 py-3 bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/20 hover:bg-[#1fb855] transition-colors ${SANS}`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────── LANDING ─────────── */
export default function OfferLanding({ config: c }: { config: OfferLandingConfig }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#be8f52]/30 selection:text-white">
      <GrainOverlay />
      <UrgencyBar text={c.urgency} />
      <Hero c={c} />
      <Gallery c={c} />
      <Included c={c} />
      <Testimonials />
      <Process c={c} />
      <ConversionForm c={c} />
      <FaqSection c={c} />
      <FooterStrip />
      <StickyMobileCTA c={c} />
      <WhatsAppFloat text={c.whatsappText} />
    </div>
  );
}
