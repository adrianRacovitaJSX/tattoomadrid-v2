"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, Clock, Users, Palette, Loader2, CheckCircle2, MapPin } from "lucide-react";

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

/* ═══════════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden">
      {/* Video BG */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover brightness-[0.3]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/backgrounds/bg-tattoo-1.jpg"
        >
          <source src="/videos/tattoo-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl px-5 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase text-[#be8f52] border border-[#be8f52]/40 rounded-full bg-black/40 backdrop-blur-sm">
            Saints &amp; Sinners by Gamboa
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Tu manga. Tu espalda.{" "}
            <span className="bg-gradient-to-r from-[#be8f52] to-[#d4a96a] bg-clip-text text-transparent">
              Tu proyecto.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Primera consulta gratuita. Sin compromiso. Sin depósito.
          </p>

          <motion.button
            onClick={scrollToForm}
            className="mt-8 inline-block px-8 py-4 bg-[#be8f52] text-black font-bold text-base sm:text-lg rounded-lg hover:bg-[#d4a96a] transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            RESERVA TU CONSULTA GRATUITA
          </motion.button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-400 font-medium"
        >
          {["13 años", "6 artistas", "+5.000 clientes", "Ciudad Lineal, Madrid"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#be8f52]" />
                {item}
              </span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/40" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. SOCIAL PROOF STRIP
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    text: "Me hicieron la manga completa en 4 sesiones. Todo planificado desde el primer día, sin sorpresas.",
    name: "Carlos R.",
    detail: "Manga japonesa",
  },
  {
    text: "Llevaba meses buscando estudio. Desde la primera consulta supe que era aquí. Profesionalidad total.",
    name: "Laura M.",
    detail: "Espalda completa",
  },
  {
    text: "Me asesoraron con el artista perfecto para mi estilo. El resultado superó lo que tenía en mente.",
    name: "Alejandro P.",
    detail: "Pecho completo",
  },
  {
    text: "Honestidad con los plazos y el precio desde el minuto uno. Eso en Madrid no se encuentra fácil.",
    name: "Marta S.",
    detail: "Media manga realista",
  },
];

function SocialProof() {
  return (
    <section className="py-16 sm:py-20 bg-zinc-950/80">
      <div className="container mx-auto max-w-5xl px-5">
        <FadeIn className="text-center mb-10">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#be8f52] text-[#be8f52]" />
            ))}
          </div>
          <p className="text-zinc-400 text-sm sm:text-base">
            Valorado con 5 estrellas por cientos de clientes en Madrid
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="p-5 sm:p-6 rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#be8f52] text-[#be8f52]" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-3 text-xs text-[#be8f52] font-medium">
                  {t.name}{" "}
                  <span className="text-zinc-500">· {t.detail}</span>
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
   3. WHY SAINTS & SINNERS
   ═══════════════════════════════════════════ */
const reasons = [
  {
    icon: Palette,
    title: "Especialistas en piezas grandes",
    desc: "Mangas, espaldas, pechos completos. Es lo que mejor hacemos y donde más experiencia tenemos.",
  },
  {
    icon: Users,
    title: "6 artistas, cada uno en su estilo",
    desc: "Te decimos quién es el artista correcto para tu proyecto. Sin ego, solo resultado.",
  },
  {
    icon: Clock,
    title: "Planificación sesión por sesión",
    desc: "Sin sorpresas de precio ni de tiempo. Sabes exactamente qué esperar antes de empezar.",
  },
];

function WhyUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl px-5">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Por qué <span className="text-[#be8f52]">Saints &amp; Sinners</span>
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, i) => (
            <FadeIn key={i} delay={i * 0.15} className="text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-[#be8f52]/10 border border-[#be8f52]/20 mb-5">
                <r.icon className="w-6 h-6 text-[#be8f52]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{r.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{r.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. HOW IT WORKS
   ═══════════════════════════════════════════ */
const steps = [
  {
    num: "01",
    title: "Rellena el formulario",
    desc: "30 segundos. Solo necesitamos saber qué tienes en mente.",
  },
  {
    num: "02",
    title: "Consulta gratuita presencial",
    desc: "Ves el portfolio, conoces al artista, hablamos de tu proyecto sin prisa.",
  },
  {
    num: "03",
    title: "Sales con un plan real",
    desc: "Sesiones, precio aproximado y fechas. Sin letra pequeña.",
  },
];

function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-zinc-950/60">
      <div className="container mx-auto max-w-5xl px-5">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Cómo <span className="text-[#be8f52]">funciona</span>
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15} className="relative text-center sm:text-left">
              <span className="text-5xl font-black text-[#be8f52]/15 absolute -top-4 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 select-none">
                {s.num}
              </span>
              <div className="pt-8">
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 -right-4 w-8 border-t border-dashed border-[#be8f52]/25" />
              )}
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          <motion.button
            onClick={scrollToForm}
            className="px-8 py-4 bg-[#be8f52] text-black font-bold text-base rounded-lg hover:bg-[#d4a96a] transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            RESERVA TU CONSULTA GRATUITA
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. CONVERSION FORM
   ═══════════════════════════════════════════ */
type FormStatus = "idle" | "loading" | "success" | "error";

function ConversionForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
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
          email: data.get("email"),
          project: data.get("project"),
          eventId,
          fbp,
          sourceUrl: window.location.href,
        }),
      });

      if (!res.ok) throw new Error("Error");
      window.fbq?.("track", "Contact", {}, { eventID: eventId });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="formulario" className="py-16 sm:py-24">
        <div className="container mx-auto max-w-xl px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 sm:p-10 rounded-2xl bg-zinc-900 border border-[#be8f52]/30 text-center"
          >
            <CheckCircle2 className="w-14 h-14 text-[#be8f52] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">¡Consulta reservada!</h3>
            <p className="text-zinc-400">
              Te contactamos en menos de 2 horas para confirmar tu cita. Revisa tu
              teléfono y tu email.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="formulario" className="py-16 sm:py-24">
      <div className="container mx-auto max-w-xl px-5">
        <FadeIn>
          <div className="p-6 sm:p-10 rounded-2xl bg-zinc-900 border border-white/5">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
              Reserva tu consulta{" "}
              <span className="text-[#be8f52]">gratuita</span>
            </h2>
            <p className="text-zinc-400 text-sm text-center mb-8">
              Cuéntanos tu idea. Te respondemos en menos de 2 horas.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label>
                  No rellenar
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Nombre *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#be8f52] focus:ring-1 focus:ring-[#be8f52]/50 transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#be8f52] focus:ring-1 focus:ring-[#be8f52]/50 transition-colors"
                    placeholder="612 345 678"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#be8f52] focus:ring-1 focus:ring-[#be8f52]/50 transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  ¿Qué proyecto tienes en mente? *
                </label>
                <textarea
                  id="project"
                  name="project"
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#be8f52] focus:ring-1 focus:ring-[#be8f52]/50 transition-colors resize-none"
                  placeholder="Ej: manga completa brazo derecho, estilo japonés"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-[#be8f52] text-black font-bold text-base rounded-lg hover:bg-[#d4a96a] transition-colors duration-300 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    ENVIANDO...
                  </>
                ) : (
                  "RESERVAR MI CONSULTA"
                )}
              </motion.button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Algo falló. Inténtalo de nuevo o escríbenos por Instagram.
                </p>
              )}
            </form>

            <p className="mt-4 text-xs text-zinc-500 text-center">
              Sin depósito. Sin compromiso. Te respondemos en menos de 2h.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. FAQ — OBJECTION KILLER
   ═══════════════════════════════════════════ */
const faqs = [
  {
    q: "¿Cuánto cuesta una manga?",
    a: "Depende del tamaño, el detalle y el número de sesiones. Una manga completa suele estar entre 2.000 € y 5.000 €+. Sabemos que la inversión importa — por eso la consulta es gratuita: para darte un presupuesto real basado en tu proyecto concreto, sin rodeos.",
  },
  {
    q: "¿Cuánto tiempo tarda?",
    a: "Una manga completa se hace en varias sesiones de 4-6 horas, espaciadas para que la piel descanse y cicatrice bien. En la consulta te planificamos todas las sesiones con fechas orientativas para que sepas exactamente cuánto durará tu proyecto.",
  },
  {
    q: "¿Cómo sé que elegiré al artista correcto?",
    a: "Tenemos 6 artistas especializados en estilos diferentes: realismo, japonés, blackwork, neotradicional… No eliges tú solo. En la consulta te recomendamos el artista que mejor encaja con tu idea. Si no te convence, no pasa nada.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-base sm:text-lg font-medium text-white pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#be8f52]" />
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
            <p className="pb-5 text-sm text-zinc-400 leading-relaxed">{a}</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Preguntas <span className="text-[#be8f52]">frecuentes</span>
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 sm:p-8">
            {faqs.map((f, i) => (
              <FaqItem key={i} {...f} />
            ))}
          </div>
        </FadeIn>

        <FadeIn className="text-center mt-10">
          <motion.button
            onClick={scrollToForm}
            className="px-8 py-4 bg-[#be8f52] text-black font-bold text-base rounded-lg hover:bg-[#d4a96a] transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            RESERVA TU CONSULTA GRATUITA
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. FOOTER STRIP
   ═══════════════════════════════════════════ */
function FooterStrip() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container mx-auto max-w-4xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#be8f52]" />
          <span>Ciudad Lineal, Madrid</span>
        </div>

        <a
          href="https://www.instagram.com/saintsandsinnersmadrid/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-[#be8f52] transition-colors"
        >
          @saintsandsinnersmadrid
        </a>

        <span>© 2026 Saints &amp; Sinners by Gamboa</span>
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
      setVisible(window.scrollY > window.innerHeight * 0.6);
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
          className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/90 backdrop-blur-md border-t border-white/10 sm:hidden"
        >
          <button
            onClick={scrollToForm}
            className="w-full py-3.5 bg-[#be8f52] text-black font-bold text-sm rounded-lg active:scale-[0.98] transition-transform cursor-pointer"
          >
            RESERVAR MI CONSULTA GRATUITA
          </button>
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
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <SocialProof />
      <WhyUs />
      <HowItWorks />
      <ConversionForm />
      <FaqSection />
      <FooterStrip />
      <StickyMobileCTA />
    </div>
  );
}
