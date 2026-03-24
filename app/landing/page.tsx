"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronDown,
  Loader2,
  MapPin,
  Shield,
  Calendar,
  Plus,
  ArrowRight,
  Instagram,
  ExternalLink,
} from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

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

/* ─────────── FADE-IN ON SCROLL ─────────── */
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

/* ─────────── DECORATIVE ELEMENTS ─────────── */
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

function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-2 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#be8f52]/30" />
      <div className="w-1.5 h-1.5 rotate-45 border border-[#be8f52]/40" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#be8f52]/30" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   1. BARRA DE URGENCIA (fixed top)
   ═══════════════════════════════════════════ */
function UrgencyBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#be8f52] text-black">
      <div className="container mx-auto max-w-6xl px-4 py-2.5 text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-wide font-[family-name:var(--font-dm-sans)]">
          <span className="mr-1.5">📅</span>
          Solo aceptamos 4 proyectos grandes al mes
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   2. HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[80svh] sm:min-h-[100svh] w-full flex flex-col justify-center overflow-hidden pt-10">
      {/* BG — hero image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/bg-tattoo-1.jpg"
          alt=""
          fill
          className="object-cover brightness-[0.25]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(190,143,82,0.08)_0%,transparent_60%)]" />
        {/* Fine decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52]/10 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl px-5 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Studio name badge */}
          <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-[11px] font-medium tracking-[0.2em] uppercase text-[#be8f52] border border-[#be8f52]/30 bg-[#be8f52]/5 backdrop-blur-sm font-[family-name:var(--font-dm-sans)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#be8f52]" />
            Saints &amp; Sinners by Gamboa
            <span className="w-1.5 h-1.5 rounded-full bg-[#be8f52]" />
          </span>

          <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white font-[family-name:var(--font-playfair)]">
            Tu próxima pieza empieza{" "}
            <span className="italic bg-gradient-to-r from-[#be8f52] via-[#d4a96a] to-[#a67a3d] bg-clip-text text-transparent">
              con una conversación
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-dm-sans)] font-light">
            Consulta gratuita, presupuesto cerrado y el artista perfecto para tu estilo.
            <br className="hidden sm:block" />{" "}
            Sin depósito. Sin compromiso.
          </p>

          {/* Availability */}
          <p className="mt-4 text-sm text-[#be8f52]/80 font-[family-name:var(--font-dm-sans)] font-medium tracking-wide">
            Próximas citas: Abril 2026
          </p>

          <motion.button
            onClick={scrollToForm}
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm sm:text-base tracking-wider uppercase hover:from-[#d4a96a] hover:to-[#be8f52] transition-all duration-300 cursor-pointer font-[family-name:var(--font-dm-sans)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            VER DISPONIBILIDAD Y PRECIO
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-zinc-500 font-[family-name:var(--font-dm-sans)]"
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

      {/* Scroll hint */}
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

/* ═══════════════════════════════════════════
   3. PORTFOLIO / GALERÍA
   ═══════════════════════════════════════════ */
const portfolioItems = [
  { title: "Espalda completa realismo", src: "/IMG_0843.jpg", aspect: "aspect-[3/4]", span: "md:col-span-2 md:row-span-2" },
  { title: "Pierna completa chicano", src: "/AA4A48F6-6483-4F4B-8A71-45887F2B7150.jpg", aspect: "aspect-[3/4]", span: "" },
  { title: "Manga realismo mitológico", src: "/resenas-sns/adrian.webp", aspect: "aspect-[3/4]", span: "" },
  { title: "Chicano", src: "/IMG_4380.jpg", aspect: "aspect-[3/4]", span: "md:row-span-2" },
  { title: "Manga japonesa", src: "/IMG_4381.jpg", aspect: "aspect-[3/4]", span: "" },
  { title: "Manga calavera y rosas", src: "/images/portfolio/gamboa-1.webp", aspect: "aspect-[3/4]", span: "" },
];

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.08} className={item.span}>
      <div className={`group relative overflow-hidden ${item.aspect} bg-zinc-900 border border-white/[0.04]`}>
        <Image
          src={item.src}
          alt={`${item.title} — Saints & Sinners Madrid`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes={item.span?.includes("col-span-2") ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          loading="lazy"
        />

        {/* Decorative corner marks */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#be8f52]/20 z-10" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#be8f52]/20 z-10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <p className="text-white text-sm font-semibold font-[family-name:var(--font-dm-sans)] tracking-wide drop-shadow-lg">
            {item.title}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

function Portfolio() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0d0d0d] to-[#0A0A0A]" />

      <div className="relative z-10 container mx-auto max-w-6xl px-5">
        <FadeIn className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 font-[family-name:var(--font-dm-sans)] mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Nuestro trabajo habla{" "}
            <span className="italic text-[#be8f52]">por nosotros</span>
          </h2>
          <p className="mt-4 text-zinc-500 text-base font-[family-name:var(--font-dm-sans)] font-light">
            Mangas, espaldas y piezas grandes. Es lo que mejor hacemos.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {portfolioItems.map((item, i) => (
            <PortfolioCard key={i} item={item} index={i} />
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <motion.button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm text-[#be8f52] border border-[#be8f52]/30 hover:bg-[#be8f52]/10 transition-colors font-[family-name:var(--font-dm-sans)] font-medium tracking-wider uppercase cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            QUIERO MI PRESUPUESTO GRATIS
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. TESTIMONIOS
   ═══════════════════════════════════════════ */
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
        <FadeIn className="text-center mb-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 font-[family-name:var(--font-dm-sans)] mb-4">
            Testimonios
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Lo que dicen{" "}
            <span className="italic text-[#be8f52]">nuestros clientes</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm group hover:border-[#be8f52]/20 transition-colors duration-500 overflow-hidden">
                {/* Corner ornaments */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#be8f52]/20 z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#be8f52]/20 z-10" />

                {/* Review photo */}
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

                {/* Content */}
                <div className="p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-3.5 h-3.5 fill-[#be8f52] text-[#be8f52]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-300 text-sm leading-relaxed font-[family-name:var(--font-dm-sans)] font-light italic">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <p className="mt-4 text-white text-sm font-semibold font-[family-name:var(--font-dm-sans)]">
                    — {t.name}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Ver en Google */}
        <FadeIn className="text-center mt-8">
          <Link
            href="https://www.google.com/maps/place/Saints+%26+Sinners+by+Gamboa/@40.4474,-3.6513,17z/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#be8f52] transition-colors font-[family-name:var(--font-dm-sans)]"
          >
            Ver todas las reseñas en Google
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. POR QUÉ SAINTS & SINNERS
   ═══════════════════════════════════════════ */
const reasons = [
  {
    num: "01",
    title: "Especialistas en piezas grandes",
    desc: "Mangas, espaldas, pechos completos. No es un extra de nuestra carta — es nuestra especialidad.",
  },
  {
    num: "02",
    title: "El artista correcto para tu proyecto",
    desc: "6 artistas, cada uno maestro en su estilo. Te recomendamos quién encaja mejor con tu idea. Sin ego, solo resultado.",
  },
  {
    num: "03",
    title: "Presupuesto cerrado desde el minuto uno",
    desc: "Te decimos cuántas sesiones, cuánto cuesta y cuándo empezamos. Sin letra pequeña, sin sorpresas.",
  },
];

function WhyUs() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d] to-transparent" />

      <div className="relative z-10 container mx-auto max-w-5xl px-5">
        <FadeIn className="text-center mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 font-[family-name:var(--font-dm-sans)] mb-4">
            Diferencia
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Por qué{" "}
            <span className="italic text-[#be8f52]">Saints &amp; Sinners</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {reasons.map((r, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative">
                <span className="block text-6xl font-black text-[#be8f52]/[0.07] font-[family-name:var(--font-playfair)] select-none leading-none mb-4">
                  {r.num}
                </span>
                <div className="w-8 h-px bg-[#be8f52]/40 mb-5" />
                <h3 className="text-lg font-semibold text-white mb-3 font-[family-name:var(--font-dm-sans)]">
                  {r.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-[family-name:var(--font-dm-sans)] font-light">
                  {r.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. CÓMO FUNCIONA + PRECIOS ORIENTATIVOS
   ═══════════════════════════════════════════ */
const processSteps = [
  {
    num: "1",
    title: "Cuéntanos tu idea",
    time: "30 segundos",
    desc: "Rellena el formulario. Solo necesitamos saber qué tienes en mente.",
  },
  {
    num: "2",
    title: "Consulta gratuita en el estudio",
    time: "Sin compromiso",
    desc: "Ves portfolios, conoces al artista, hablamos de tu proyecto sin prisa.",
  },
  {
    num: "3",
    title: "Sales con un plan cerrado",
    time: "Todo claro",
    desc: "Sesiones, precio y fechas. Listo para empezar cuando tú digas.",
  },
];

function ProcessAndPricing() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0e0e0e] to-[#0A0A0A]" />

      <div className="relative z-10 container mx-auto max-w-5xl px-5">
        {/* Process */}
        <FadeIn className="text-center mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 font-[family-name:var(--font-dm-sans)] mb-4">
            Proceso
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Cómo{" "}
            <span className="italic text-[#be8f52]">funciona</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {processSteps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="relative text-center md:text-left">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 border border-[#be8f52]/30 text-[#be8f52] font-bold text-lg font-[family-name:var(--font-playfair)] mb-5">
                  {s.num}
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#be8f52]/50 font-[family-name:var(--font-dm-sans)] mb-2">
                  {s.time}
                </p>
                <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-dm-sans)]">
                  {s.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-[family-name:var(--font-dm-sans)] font-light">
                  {s.desc}
                </p>
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 -right-4 w-8 border-t border-dashed border-[#be8f52]/20" />
                )}
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <motion.button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm tracking-wider uppercase hover:from-[#d4a96a] hover:to-[#be8f52] transition-all duration-300 cursor-pointer font-[family-name:var(--font-dm-sans)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            QUIERO MI PRESUPUESTO GRATIS
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   8. FORMULARIO DE CONVERSIÓN (multi-step)
   ═══════════════════════════════════════════ */
type FormStatus = "idle" | "loading" | "success" | "error";

const zones = [
  "Manga completa",
  "Media manga",
  "Espalda",
  "Pecho",
  "Pierna",
  "Otro",
];

function ConversionForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formStep, setFormStep] = useState(1);
  const [selectedZone, setSelectedZone] = useState("");
  const [customZone, setCustomZone] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get("website")) return;

    setStatus("loading");

    const eventId = generateEventId();
    const fbp = getFbp();

    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || "",
          project: selectedZone === "Otro" ? customZone || "Otro" : selectedZone,
          eventId,
          fbp,
          sourceUrl: window.location.href,
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
    <section id="formulario" className="py-16 sm:py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(190,143,82,0.06)_0%,transparent_50%)]" />

      <div className="relative z-10 container mx-auto max-w-xl px-5">
        <FadeIn>
          <div className="p-6 sm:p-10 border border-white/[0.06] bg-[#0e0e0e]">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-playfair)]">
                Reserva tu consulta{" "}
                <span className="italic text-[#be8f52]">gratuita</span>
              </h2>
              <p className="mt-2 text-zinc-500 text-sm font-[family-name:var(--font-dm-sans)]">
                Te respondemos en menos de 2 horas
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors duration-300 font-[family-name:var(--font-dm-sans)] ${
                  formStep >= 1
                    ? "border-[#be8f52] text-[#be8f52] bg-[#be8f52]/10"
                    : "border-zinc-700 text-zinc-600"
                }`}
              >
                1
              </div>
              <div className="w-8 h-px bg-zinc-700" />
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold border transition-colors duration-300 font-[family-name:var(--font-dm-sans)] ${
                  formStep >= 2
                    ? "border-[#be8f52] text-[#be8f52] bg-[#be8f52]/10"
                    : "border-zinc-700 text-zinc-600"
                }`}
              >
                2
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  No rellenar
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <AnimatePresence mode="wait">
                {formStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm text-zinc-400 mb-4 font-[family-name:var(--font-dm-sans)] text-center">
                      ¿Qué zona quieres tatuar?
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {zones.map((zone) => (
                        <button
                          key={zone}
                          type="button"
                          onClick={() => {
                            setSelectedZone(zone);
                            if (zone !== "Otro") setFormStep(2);
                          }}
                          className={`px-4 py-3.5 text-sm border transition-all duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)] font-medium ${
                            selectedZone === zone
                              ? "border-[#be8f52] text-[#be8f52] bg-[#be8f52]/10"
                              : "border-white/[0.08] text-zinc-400 hover:border-[#be8f52]/40 hover:text-white bg-white/[0.02]"
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>

                    {/* Input para "Otro" */}
                    {selectedZone === "Otro" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 flex gap-2"
                      >
                        <input
                          type="text"
                          value={customZone}
                          onChange={(e) => setCustomZone(e.target.value)}
                          placeholder="Ej: antebrazo, costillas, gemelo..."
                          className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-[#be8f52]/60 focus:ring-1 focus:ring-[#be8f52]/20 transition-colors text-sm font-[family-name:var(--font-dm-sans)]"
                        />
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="px-5 py-3 bg-[#be8f52] text-black font-bold text-sm cursor-pointer font-[family-name:var(--font-dm-sans)] hover:bg-[#d4a96a] transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {formStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Selected zone pill */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#be8f52] font-medium font-[family-name:var(--font-dm-sans)] tracking-wide uppercase">
                        Zona: {selectedZone}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer font-[family-name:var(--font-dm-sans)]"
                      >
                        Cambiar
                      </button>
                    </div>

                    <p className="text-sm text-zinc-400 font-[family-name:var(--font-dm-sans)]">
                      ¿Cómo te contactamos?
                    </p>

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]"
                      >
                        Nombre *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-[#be8f52]/60 focus:ring-1 focus:ring-[#be8f52]/20 transition-colors text-sm font-[family-name:var(--font-dm-sans)]"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]"
                      >
                        Teléfono *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-[#be8f52]/60 focus:ring-1 focus:ring-[#be8f52]/20 transition-colors text-sm font-[family-name:var(--font-dm-sans)]"
                        placeholder="612 345 678"
                      />
                    </div>

                    {/* Collapsible email */}
                    {!showEmail ? (
                      <button
                        type="button"
                        onClick={() => setShowEmail(true)}
                        className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-[#be8f52] transition-colors cursor-pointer font-[family-name:var(--font-dm-sans)]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Añadir email (opcional)
                      </button>
                    ) : (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label
                          htmlFor="email"
                          className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider font-[family-name:var(--font-dm-sans)]"
                        >
                          Email (opcional)
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-[#be8f52]/60 focus:ring-1 focus:ring-[#be8f52]/20 transition-colors text-sm font-[family-name:var(--font-dm-sans)]"
                          placeholder="tu@email.com"
                        />
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 mt-2 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm tracking-wider uppercase hover:from-[#d4a96a] hover:to-[#be8f52] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer font-[family-name:var(--font-dm-sans)]"
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
                          QUIERO MI PRESUPUESTO GRATIS
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center font-[family-name:var(--font-dm-sans)]">
                        Algo falló. Inténtalo de nuevo o escríbenos por Instagram.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Micro-copy */}
            <p className="mt-5 text-xs text-zinc-600 text-center font-[family-name:var(--font-dm-sans)]">
              Sin compromiso · Sin depósito · Respuesta en menos de 2h
            </p>

            {/* Trust badges */}
            <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-zinc-500 font-[family-name:var(--font-dm-sans)]">
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-[#be8f52]/60" />
                4.9 Google
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-[#be8f52]/60" />
                Licencia sanitaria CM
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#be8f52]/60" />
                Quedan 3 plazas esta semana
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   9. FAQ (3 preguntas)
   ═══════════════════════════════════════════ */
const faqs = [
  {
    q: "¿Cuánto tiempo tarda una manga completa?",
    a: "Depende del nivel de detalle. Normalmente se completa en 1 o 2 sesiones de varias horas, espaciadas para que la piel cicatrice bien. En la consulta te damos un calendario con todas las fechas.",
  },
  {
    q: "¿Cómo elegís al artista para mi proyecto?",
    a: "Tenemos 6 artistas especializados en estilos diferentes: realismo, japonés, blackwork, neotradicional, fine line… En la consulta te recomendamos quién encaja mejor con tu idea. Si no te convence, sin problema.",
  },
  {
    q: "¿Tengo que dejar señal para la consulta?",
    a: "No. La consulta es 100% gratuita y sin compromiso. Solo si decides seguir adelante empezamos a planificar.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.04] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-sm sm:text-base font-medium text-white pr-4 font-[family-name:var(--font-dm-sans)] group-hover:text-[#be8f52] transition-colors">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
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
            <p className="pb-5 text-sm text-zinc-500 leading-relaxed font-[family-name:var(--font-dm-sans)] font-light">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FaqSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-2xl px-5">
        <FadeIn className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#be8f52]/70 font-[family-name:var(--font-dm-sans)] mb-4">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Preguntas{" "}
            <span className="italic text-[#be8f52]">frecuentes</span>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="border border-white/[0.06] bg-white/[0.01] p-5 sm:p-8">
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   10. FOOTER MÍNIMO
   ═══════════════════════════════════════════ */
function FooterStrip() {
  return (
    <footer className="py-10 border-t border-white/[0.04]">
      <div className="container mx-auto max-w-4xl px-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 font-[family-name:var(--font-dm-sans)]">
            <MapPin className="w-3.5 h-3.5 text-[#be8f52]/50" />
            C. de los Hermanos Gómez, 5 · Ciudad Lineal · 28017 Madrid
          </div>

          <Link
            href="https://www.instagram.com/saintsandsinnersmadrid/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-[#be8f52] transition-colors font-[family-name:var(--font-dm-sans)]"
          >
            <Instagram className="w-3.5 h-3.5" />
            @saintsandsinnersmadrid
          </Link>

          <p className="text-xs text-zinc-700 font-[family-name:var(--font-dm-sans)]">
            © 2026 Saints &amp; Sinners by Gamboa
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   STICKY MOBILE CTA
   ═══════════════════════════════════════════ */
function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            onClick={scrollToForm}
            className="w-full py-3.5 bg-gradient-to-r from-[#be8f52] to-[#a67a3d] text-black font-bold text-sm tracking-wider uppercase active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2 font-[family-name:var(--font-dm-sans)]"
          >
            VER PRECIO Y DISPONIBILIDAD
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   WHATSAPP FLOTANTE
   ═══════════════════════════════════════════ */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            href="https://wa.me/34603211318?text=Hola%2C%20quiero%20info%20sobre%20una%20consulta%20gratuita%20para%20tatuaje"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pl-4 pr-5 py-3 bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/20 hover:bg-[#1fb855] transition-colors font-[family-name:var(--font-dm-sans)]"
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

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#be8f52]/30 selection:text-white">
      <GrainOverlay />
      <UrgencyBar />
      <Hero />
      <Portfolio />
      <Testimonials />
      <WhyUs />
      <ProcessAndPricing />
      <ConversionForm />
      <FaqSection />
      <FooterStrip />
      <StickyMobileCTA />
      <WhatsAppFloat />
    </div>
  );
}
