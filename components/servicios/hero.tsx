"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SplitText from '@/components/ui/split-text';
import ShinyText from '@/components/ui/shiny-text';
import ParticlesBackground from '@/components/ui/particles-background';

const HeroSection = () => {
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
          {/* SLOGAN principal animado con Split Text */}
          <div className="mb-4 md:mb-6">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter mb-2 md:mb-3">
              <SplitText 
                text="NUESTROS" 
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
                <span>SERVICIOS</span>
              </ShinyText>
            </div>
          </div>
          
          <motion.p 
            className="text-base md:text-lg text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto px-2"
            variants={itemVariants}
          >
            En Saints & Sinners, tu estudio de tatuajes en Madrid, ofrecemos una amplia gama de servicios premium relacionados con el arte corporal. 
            Descubre lo que podemos hacer por ti en nuestro estudio.
          </motion.p>
          
          {/* Items de características */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-400"
            variants={itemVariants}
          >
            <motion.span 
              className="flex items-center px-2 py-1"
              whileHover={{ scale: 1.05, color: "#be8f52" }}
            >
              <Check size={14} className="text-[#be8f52] mr-1 sm:mr-2 sm:h-4 sm:w-4" /> Materiales premium
            </motion.span>
            <motion.span 
              className="flex items-center px-2 py-1"
              whileHover={{ scale: 1.05, color: "#be8f52" }}
            >
              <Check size={14} className="text-[#be8f52] mr-1 sm:mr-2 sm:h-4 sm:w-4" /> Artistas certificados
            </motion.span>
            <motion.span 
              className="flex items-center px-2 py-1"
              whileHover={{ scale: 1.05, color: "#be8f52" }}
            >
              <Check size={14} className="text-[#be8f52] mr-1 sm:mr-2 sm:h-4 sm:w-4" /> Diseños personalizados
            </motion.span>
            <motion.span 
              className="flex items-center px-2 py-1"
              whileHover={{ scale: 1.05, color: "#be8f52" }}
            >
              <Check size={14} className="text-[#be8f52] mr-1 sm:mr-2 sm:h-4 sm:w-4" /> Máxima higiene
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 