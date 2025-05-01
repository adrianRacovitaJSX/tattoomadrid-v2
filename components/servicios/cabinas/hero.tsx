"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Check } from 'lucide-react';
import SplitText from '@/components/ui/split-text';
import ShinyText from '@/components/ui/shiny-text';
import ParticlesBackground from '@/components/ui/particles-background';

const CabinasHeroSection = () => {
  // Variantes de animación para los elementos de contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative pt-24 pb-24 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 min-h-[600px] flex items-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
      </div>
      
      <div className="absolute top-20 -left-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
      
      {/* Fondo de partículas animadas */}
      <ParticlesBackground 
        count={40} 
        color="#be8f52" 
        minSize={1} 
        maxSize={4} 
        speed={0.5}
        className="z-10 opacity-40"
      />
      
      {/* Contenedor principal con animaciones */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Decoración */}
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-[#be8f52]/20 rounded-full mb-6"
            variants={itemVariants}
          >
            <Home size={18} className="text-[#be8f52] mr-2" />
            <span className="text-[#be8f52] font-medium text-sm">Espacios Profesionales</span>
          </motion.div>
          
          {/* SLOGAN principal animado con Split Text */}
          <div className="mb-4 md:mb-6">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-2 md:mb-3">
              <SplitText 
                text="CABINAS" 
                className="text-[#be8f52] leading-tight"
                delay={0.5}
                stagger={0.05}
              />
            </div>

            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              <ShinyText
                text=""
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative mb-2 md:mb-4"
                highlightWidth={10}
                speed={1.5}
              >
                <span>PARA TATUADORES</span>
              </ShinyText>
            </div>
          </div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto px-2"
            variants={itemVariants}
          >
            Espacios totalmente equipados para tatuadores independientes. Alquila tu cabina por días o semanas con tarifas flexibles y todo el material necesario.
          </motion.p>
          
          {/* Items de características */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
            variants={itemVariants}
          >
            <div className="inline-flex items-center px-3 py-1 bg-zinc-800/60 rounded-full">
              <Check size={14} className="text-[#be8f52] mr-1.5" />
              <span className="text-white text-sm">Equipamiento completo</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-zinc-800/60 rounded-full">
              <Check size={14} className="text-[#be8f52] mr-1.5" />
              <span className="text-white text-sm">Tarifas flexibles</span>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-zinc-800/60 rounded-full">
              <Check size={14} className="text-[#be8f52] mr-1.5" />
              <span className="text-white text-sm">Ubicación central</span>
            </div>
          </motion.div>
          
          {/* Botón CTA */}
          <motion.div variants={itemVariants}>
            <a 
              href="/contacto" 
              className="px-8 py-4 bg-[#be8f52] text-black font-medium inline-flex items-center hover:bg-[#be8f52]/90 transition-all"
            >
              Consulta disponibilidad
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CabinasHeroSection; 