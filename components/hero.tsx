"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

import SplitText from '@/components/ui/split-text';
import ShinyText from '@/components/ui/shiny-text';
import ParticlesBackground from '@/components/ui/particles-background';

// Componente para estadísticas
const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center px-4">
    <div className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-[#be8f52] bg-clip-text text-transparent">
      {value}
    </div>
    <div className="text-zinc-400 text-sm sm:text-base">{label}</div>
  </div>
);

const HeroSection = () => {
  const videoRef = useRef(null);
  
  // Variantes de animación para los elementos de contenedor
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Array de beneficios, el tercero no se mostrará en móvil
  const benefits = [
    { title: "+15 Años", desc: "De experiencia creando arte en piel", icon: "⭐" },
    { title: "4 Artistas", desc: "Especialistas en diferentes estilos", icon: "👨‍🎨" },
    // Esta card no se mostrará en móvil (sm:block)
    { title: "100% Seguro", desc: "Higiene y protocolos certificados", icon: "🛡️", hideOnMobile: true }
  ];

  return (
    <section className="relative min-h-[600px] h-screen w-full overflow-hidden">
      {/* Fondo de video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover brightness-[0.4]"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/videos/tattoo-background.mp4" type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/70"></div>
        
        {/* Fondo de partículas animadas */}
        <ParticlesBackground 
          count={40} 
          color="#be8f52" 
          minSize={1} 
          maxSize={4} 
          speed={0.5}
          className="z-10 opacity-40"
        />
      </div>
      
      {/* Contenedor principal con animaciones - Nueva estructura */}
      <motion.div 
        className="absolute inset-0 flex items-center z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-6xl pt-2 sm:pt-20 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Contenido de texto - Lado izquierdo */}
            <div className="w-full md:w-7/12 space-y-8 text-center md:text-left">
              <div>
                <div className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm border border-[#be8f52]/50 rounded-full mb-4 text-sm text-[#be8f52] font-medium">
                  Estudio de Tatuajes en Madrid
                </div>
                <div className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  <SplitText 
                    text="TRANSFORMAMOS" 
                    className="text-[#be8f52] leading-tight"
                    delay={0.5}
                    stagger={0.05}
                  />
                  <div className="text-white">
                    <ShinyText
                      text=""
                      className="text-3xl md:text-4xl lg:text-5xl font-bold relative"
                      highlightWidth={10}
                      speed={1.5}
                    >
                      <span className="leading-tight">IDEAS EN ARTE</span>
                      <span className="whitespace-nowrap leading-tight block md:inline"> SOBRE TU PIEL</span>
                    </ShinyText>
                  </div>
                </div>
              </div>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto md:mx-0 leading-relaxed">
                <strong className="text-white font-medium">Saints & Sinners Tattoo Madrid</strong>, 
                tu estudio de tatuajes profesional. Nuestros artistas expertos crean tatuajes 
                personalizados con técnicas profesionales y los más altos estándares de calidad.
              </p>

              {/* Botones de acción */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                variants={itemVariants}
              >
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Link 
                    href="/reservar" 
                    className="block w-full px-8 py-3 md:py-4 bg-[#be8f52] text-black font-medium text-base md:text-lg rounded-lg hover:bg-[#be8f52]/90 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="relative z-10">RESERVA TU CITA</span>
                    <motion.span 
                      className="absolute inset-0 bg-white"
                      initial={{ translateY: "100%" }}
                      whileHover={{ translateY: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.03 }} 
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Link 
                    href="/artistas" 
                    className="block w-full px-8 py-3 md:py-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white font-medium text-base md:text-lg rounded-lg hover:border-[#be8f52] hover:text-[#be8f52] transition-all duration-300"
                  >
                    VER ARTISTAS
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Estadísticas */}
              <div className="pt-8 mt-4 grid grid-cols-2 lg:flex lg:flex-row lg:justify-start gap-2 sm:gap-4 lg:gap-8 border-t border-zinc-800/50">
                <StatItem value="+15" label="Años de experiencia" />
                <StatItem value="1000+" label="Clientes satisfechos" />
              </div>
            </div>
            
            {/* Imagen de la derecha */}
            <div className="w-full md:w-5/12 mt-12 md:mt-0 hidden md:flex justify-center">
              <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px]">
                {/* Imagen principal con efecto glassmorphism */}
                <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden bg-zinc-800/20 backdrop-blur-sm shadow-2xl">
                  <Image 
                    src="/images/tattooo.jpg" 
                    alt="Saints & Sinners Tattoo Madrid - Estudio de Tatuajes" 
                    width={500} 
                    height={500}
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                
                {/* Elementos decorativos */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#be8f52]/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-[#be8f52]/30 rounded-full blur-xl"></div>
                
                {/* Etiqueta decorativa */}
                <div className="absolute -bottom-6 right-8 sm:right-8 bg-zinc-900/90 backdrop-blur-xl px-6 py-3 rounded-xl border border-zinc-700/50 transform rotate-[-4deg] shadow-xl z-10 sm:z-auto sm:translate-y-0 translate-y-8">
                  <p className="text-[#be8f52] font-medium">Tatuajes en Madrid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tarjeta de testimonio flotante - Oculta en móvil */}
      <motion.div 
        className="absolute bottom-24 right-8 max-w-sm p-4 md:p-5 rounded-lg backdrop-blur-md bg-black/60 border border-white/10 z-20 hidden md:block shadow-xl"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        whileHover={{ 
          y: -5, 
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
          scale: 1.02
        }}
      >
        <div>
          <div className="flex text-[#be8f52] mb-2 text-sm">
            <span>★★★★★</span>
          </div>
          <p className="text-white text-xs md:text-sm italic">"La mejor experiencia de tatuaje que he tenido. Profesionales increíbles con un talento único."</p>
          <p className="text-[#be8f52] text-xs mt-2 font-medium">Laura M. • Cliente desde 2020</p>
        </div>
      </motion.div>
      
      {/* Iconos sociales */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 right-4 md:right-8 flex gap-4 md:gap-5 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {[
          { href: "https://www.instagram.com/saintsandsinnersmadrid/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
          { href: "https://www.tiktok.com/@saintsandsinnersbygamboa", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" }
        ].map((social, i) => (
          <motion.a 
            key={i}
            href={social.href}
            className="text-white/80 hover:text-[#be8f52] transition-colors relative"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.path}/>
            </svg>
            <motion.span 
              className="absolute -inset-3 rounded-full bg-white/5 -z-10"
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0, 0.2, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          </motion.a>
        ))}
      </motion.div>
      
      {/* Indicador de desplazamiento - Adaptado para móvil */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-white/70 text-xs tracking-widest font-light mb-1 md:mb-2 hidden sm:block">DESCUBRE MÁS</span>
        <motion.div 
          className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-1 md:w-1.5 md:h-1.5 bg-[#be8f52] rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;