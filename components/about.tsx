"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import CircularText from '@/components/ui/circular-text';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Variantes para animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-hex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path fill="none" stroke="currentColor" strokeWidth="1" className="text-[#be8f52]/20" d="M20,1 L1,10 L1,30 L20,39 L39,30 L39,10 Z" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)"></rect>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-white dark:from-zinc-950/0 dark:via-zinc-950/80 dark:to-zinc-950"></div>
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-[#be8f52]/10 blur-3xl"></div>
      <div className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-[#be8f52]/10 blur-3xl"></div>
      
      {/* Elemento circular decorativo */}
      <div className="absolute top-32 right-10 hidden lg:block">
        <CircularText 
          text="SAINTS AND SINNERS • TATTOO MADRID • DESDE 2010 •" 
          diameter={140} 
          fontSize={12}
          className="text-[#be8f52]/60" 
          direction="clockwise"
          duration={30}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Imagen del estudio con animación y efectos */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#be8f52]/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
              <Image
                src="/images/tattoomadrid.webp"
                alt="Saints & Sinners Tattoo Studio"
                width={600}
                height={400}
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Badge decorativo */}
              <div className="absolute -bottom-5 -right-5 w-32 h-32 md:w-40 md:h-40">
                <CircularText 
                  text="• ESTUDIO PREMIUM • DISEÑOS EXCLUSIVOS •" 
                  diameter={100} 
                  fontSize={10} 
                  className="text-[#be8f52]"
                  direction="counterclockwise"
                  duration={15}
                />
              </div>
            </div>
            
            {/* Datos destacados */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <ScrollReveal delay={0.2} direction="up" className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md border border-[#be8f52]/10 text-center">
                <p className="text-2xl font-bold text-[#be8f52]">13+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Años de experiencia</p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3} direction="up" className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md border border-[#be8f52]/10 text-center">
                <p className="text-2xl font-bold text-[#be8f52]">5K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clientes satisfechos</p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4} direction="up" className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md border border-[#be8f52]/10 text-center">
                <p className="text-2xl font-bold text-[#be8f52]">6</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Artistas exclusivos</p>
              </ScrollReveal>
            </div>
          </ScrollReveal>
          
          {/* Texto de la sección */}
          <div>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Nuestro <span className="text-[#be8f52]">estudio de tatuajes en Madrid</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  En <span className="font-medium text-[#be8f52]">Saints & Sinners</span>, creamos arte corporal que trasciende lo convencional. Con más de 13 años de experiencia, nos hemos establecido como uno de los estudios de tatuajes más reconocidos de Madrid.
                </p>
                
                <p>
                  Nuestro equipo de artistas del estudio combina técnicas tradicionales con innovaciones contemporáneas, ofreciendo estilos que van desde el clásico Old School hasta el detallado Realismo y la elegancia del Fine Line.
                </p>
                
                <p>
                  Trabajamos con estrictos protocolos de higiene y utilizamos únicamente equipos y tintas de primera calidad, garantizando no solo resultados excepcionales sino también la máxima seguridad para todos los clientes de nuestro estudio de tatuajes.
                </p>
              </div>
              
              {/* Servicios en lista con iconos */}
              <ScrollReveal delay={0.2} direction="right" className="my-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Servicios de nuestro estudio:</h3>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Tatuajes personalizados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Cover ups</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Micropigmentación</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Eliminación con láser</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Diseños exclusivos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#be8f52]">✦</span>
                    <span className="text-gray-600 dark:text-gray-300">Asesoramiento artístico</span>
                  </li>
                </ul>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3} direction="up">
                <Button variant="default" size="lg" className="mt-6 bg-[#be8f52] hover:bg-[#a17a45] text-white border-none"
                onClick={() => {
                  window.location.href = '/artistas';
                }}>
                  Conoce a nuestros artistas
                </Button>
              </ScrollReveal>
            </ScrollReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;