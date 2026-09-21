"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { PROMOS } from "@/lib/promos";

/** Barra fina de ofertas justo debajo del hero: un CTA por promo. */
const PromoBanner = () => (
  <motion.aside
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1 }}
    aria-label="Ofertas destacadas"
    className="relative z-20 border-y border-[#be8f52]/30 bg-[#be8f52]/10 backdrop-blur-sm"
  >
    <div className="container mx-auto flex max-w-6xl flex-col items-stretch divide-y divide-[#be8f52]/20 px-4 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
      {PROMOS.map((promo) => (
        <Link
          key={promo.id}
          href={promo.href}
          className="group flex flex-1 items-center justify-between gap-4 py-3 text-sm text-white transition-colors hover:text-[#be8f52] sm:justify-center sm:px-6"
        >
          <span>
            <span className="font-semibold">{promo.title}</span>
            <span className="text-zinc-400"> por </span>
            <span className="font-bold text-[#be8f52]">{promo.price}</span>
          </span>
          <ArrowRight
            size={16}
            className="flex-shrink-0 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  </motion.aside>
);

export default PromoBanner;
