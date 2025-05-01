"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const SeguridadTopSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 bg-black/75 z-10"></div>
      
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/images/seguridad-bg.jpg')", 
          backgroundPosition: "center",
          filter: "brightness(0.4)"
        }}
      ></div>
      
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#be8f52]/20 flex items-center justify-center">
                <Shield size={28} className="text-[#be8f52]" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Seguridad e <span className="text-[#be8f52]">Higiene</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              En Saints & Sinners Madrid, tu seguridad es nuestra prioridad absoluta. 
              Cumplimos y superamos todos los estándares sanitarios para garantizar una experiencia segura.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white/20">
                Certificación Sanitaria
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white/20">
                Material Estéril
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-white border border-white/20">
                Protocolos Estrictos
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Separador inferior con forma */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full">
          <path 
            fill="#f8fafc" 
            fillOpacity="1" 
            d="M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,149.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="fill-gray-50 dark:fill-zinc-950"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default SeguridadTopSection; 