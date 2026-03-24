"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Instagram,
  Clock,
  ChevronRight,
  Star,
  Shield,
  MapPin,
} from "lucide-react";

const nextSteps = [
  {
    icon: MessageCircle,
    title: "Revisa tu WhatsApp",
    desc: "Te acabamos de enviar un mensaje para confirmar que lo hemos recibido todo bien.",
    color: "text-[#25D366]",
    bgColor: "bg-[#25D366]/10",
    borderColor: "border-[#25D366]/20",
  },
  {
    icon: Phone,
    title: "Te llamamos en menos de 1 hora",
    desc: "Un asesor te llama para conocer tu idea, resolver dudas y buscar la mejor fecha para tu consulta presencial.",
    color: "text-[#be8f52]",
    bgColor: "bg-[#be8f52]/10",
    borderColor: "border-[#be8f52]/20",
  },
  {
    icon: Clock,
    title: "Consulta gratuita en el estudio",
    desc: "Conoces al artista, ves portfolios en persona y sales con un presupuesto cerrado. Sin compromiso.",
    color: "text-[#be8f52]",
    bgColor: "bg-[#be8f52]/10",
    borderColor: "border-[#be8f52]/20",
  },
];

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      {/* Top bar */}
      <div className="bg-[#be8f52] text-black">
        <div className="container mx-auto max-w-6xl px-4 py-2.5 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wide font-[family-name:var(--font-dm-sans)]">
            <span className="mr-1.5">📅</span>
            Solo aceptamos 4 proyectos grandes al mes
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-5 py-12 sm:py-20">
        <div className="max-w-xl w-full">
          {/* Success confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-16 h-16 text-[#be8f52] mx-auto mb-6" />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">
              Tu consulta está{" "}
              <span className="italic text-[#be8f52]">en marcha</span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg font-[family-name:var(--font-dm-sans)] font-light leading-relaxed">
              Hemos recibido tu solicitud. Ahora nos toca a nosotros.
            </p>
          </motion.div>

          {/* Next steps */}
          <div className="space-y-4 mb-12">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                className={`flex gap-4 p-5 border ${step.borderColor} bg-white/[0.02]`}
              >
                <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${step.bgColor}`}>
                  <step.icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm font-[family-name:var(--font-dm-sans)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-[family-name:var(--font-dm-sans)] font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA section: save WhatsApp + follow Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-3 mb-12"
          >
            <p className="text-xs text-zinc-600 text-center font-[family-name:var(--font-dm-sans)] uppercase tracking-widest mb-4">
              Mientras tanto
            </p>

            <Link
              href="https://wa.me/34603211318"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors group"
            >
              <span className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-sm font-medium text-white font-[family-name:var(--font-dm-sans)]">
                  Guarda nuestro WhatsApp: 603 21 13 18
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#25D366] transition-colors" />
            </Link>

            <Link
              href="https://www.instagram.com/saintsandsinnersmadrid/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 bg-white/[0.02] border border-white/[0.06] hover:border-[#be8f52]/20 transition-colors group"
            >
              <span className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-[#be8f52]" />
                <span className="text-sm font-medium text-white font-[family-name:var(--font-dm-sans)]">
                  Mira más trabajos en Instagram
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-[#be8f52] transition-colors" />
            </Link>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-zinc-600 font-[family-name:var(--font-dm-sans)]"
          >
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-[#be8f52]/50" />
              4.9 en Google
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#be8f52]/50" />
              13+ años de experiencia
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#be8f52]/50" />
              Ciudad Lineal, Madrid
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
