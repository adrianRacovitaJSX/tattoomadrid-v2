"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { PROMOS, type Promo } from "@/lib/promos";

const PromoCard = ({ promo, index }: { promo: Promo; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-2xl border border-[#be8f52]/30 bg-zinc-900 shadow-xl transition-colors duration-300 hover:border-[#be8f52]/70"
  >
    <Link href={promo.href} className="flex h-full flex-col" aria-label={`${promo.title} por ${promo.price}`}>
      {/* Imagen */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={promo.image}
          alt={promo.imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

        {/* Precio destacado */}
        <div className="absolute bottom-4 left-4 flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {promo.price}
          </span>
          <span className="text-sm text-zinc-300">{promo.priceNote}</span>
        </div>

        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#be8f52] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-black">
          <Sparkles size={12} aria-hidden="true" />
          Oferta
        </span>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#be8f52]">
          {promo.kicker}
        </p>
        <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">{promo.title}</h3>
        <p className="mb-5 text-zinc-400">{promo.description}</p>

        <ul className="mb-8 space-y-2">
          {promo.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
              <Check size={16} className="mt-0.5 flex-shrink-0 text-[#be8f52]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#be8f52] px-6 py-3 text-base font-semibold text-black transition-colors duration-300 group-hover:bg-white">
          {promo.cta}
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  </motion.article>
);

const PromosSection = () => (
  <section
    id="ofertas"
    aria-labelledby="ofertas-title"
    className="relative overflow-hidden bg-zinc-950 py-20"
  >
    {/* Resplandor decorativo */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#be8f52]/10 blur-3xl" />

    <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <span className="mb-4 inline-block rounded-full border border-[#be8f52]/50 bg-black/50 px-3 py-1 text-sm font-medium text-[#be8f52]">
          Ofertas por tiempo limitado
        </span>
        <h2 id="ofertas-title" className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          Dos formas de <span className="text-[#be8f52]">empezar hoy</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Precios cerrados, sin sorpresas. Elige tu oferta y reserva en menos de un minuto.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {PROMOS.map((promo, i) => (
          <PromoCard key={promo.id} promo={promo} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default PromosSection;
