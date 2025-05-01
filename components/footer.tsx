"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, Mail, Clock, ChevronRight, ChevronUp, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Configuración de animación
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };
  
  return (
    <footer className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 text-white overflow-hidden">
      {/* Efectos decorativos */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#be8f52]/50 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#be8f52]/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl opacity-20"></div>
      
      {/* Patrón sutil */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 mix-blend-overlay pointer-events-none bg-repeat"></div>
      
      {/* Contenido principal del footer */}
      <div className="relative pt-20 pb-10 border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {/* Columna 1: Logo e información */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative h-12 w-24">
                  <Image 
                    src="/images/logo-gamboa.png" 
                    alt="Saints & Sinners" 
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Tu estudio de tatuajes profesional en Madrid desde 2008. Arte, profesionalidad y seguridad en cada diseño para transformar tus ideas en arte sobre la piel.
              </p>
              
              <div className="flex space-x-3">
                <motion.a 
                  href="https://www.instagram.com/saintsandsinnersmadrid/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#be8f52] hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                  whileHover={hoverScale}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a 
                  href="https://www.tiktok.com/@saintsandsinnersbygamboa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-[#be8f52] hover:text-white transition-all duration-300"
                  aria-label="TikTok"
                  whileHover={hoverScale}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Columna 2: Enlaces rápidos */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 flex items-center text-white">
                <span className="inline-block w-8 h-px bg-[#be8f52] mr-3"></span>
                Enlaces
              </h3>
              
              <ul className="space-y-3">
                {[
                  { name: 'Inicio', href: '/' },
                  { name: 'Servicios', href: '/servicios' },
                  { name: 'Artistas', href: '/artistas' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contacto', href: '/contacto' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-[#be8f52] transition-colors flex items-center group"
                    >
                      <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Columna 3: Servicios */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 flex items-center text-white">
                <span className="inline-block w-8 h-px bg-[#be8f52] mr-3"></span>
                Servicios
              </h3>
              
              <ul className="space-y-3">
                {[
                  { name: 'Tatuajes Personalizados', href: '/servicios/tatuajes-personalizados' }, 
                  { name: 'Piercings', href: '/servicios/piercings' }, 
                  { name: 'Micropigmentación', href: '/servicios/micropigmentacion' },
                  { name: 'Microblading', href: '/servicios/microblading' }, 
                  { name: 'Eliminación Láser', href: '/servicios/eliminacion-laser' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-gray-400 hover:text-[#be8f52] transition-colors flex items-center group"
                    >
                      <ChevronRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Columna 4: Contacto */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-6 flex items-center text-white">
                <span className="inline-block w-8 h-px bg-[#be8f52] mr-3"></span>
                Contacto
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-8 w-8 bg-white/5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin size={16} className="text-[#be8f52]" />
                  </div>
                  <span className="text-gray-300">C. de los Hermanos Gómez, 5, Cdad. Lineal, 28017 Madrid, España</span>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 bg-white/5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Phone size={16} className="text-[#be8f52]" />
                  </div>
                  <span className="text-gray-300">+34 603 21 13 18</span>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 bg-white/5 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Mail size={16} className="text-[#be8f52]" />
                  </div>
                  <span className="text-gray-300">snstattoomadrid@gmail.com</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div className="lg:col-span-12" variants={itemVariants}>
              <div className="border-t border-white/10 pt-8 mt-4">
                <div className="max-w-xl mx-auto">
                  <h3 className="text-lg font-semibold mb-4 text-center text-white">Suscríbete a nuestro newsletter</h3>
                  <p className="text-gray-400 text-center mb-6">Recibe inspiración, promociones exclusivas y las últimas novedades</p>
                  
                  <form className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="email" 
                      placeholder="Tu email" 
                      className="px-4 py-3 bg-white/5 rounded-md border border-white/10 text-white focus:outline-none focus:border-[#be8f52] transition-colors flex-1"
                      required
                    />
                    <motion.button 
                      type="submit"
                      className="px-6 py-3 bg-[#be8f52] text-black font-medium rounded-md hover:bg-[#be8f52]/90 flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={16} className="mr-2" />
                      Suscribirse
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Copyright y política de privacidad */}
      <div className="relative py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Saints & Sinners Tattoo Madrid. Todos los derechos reservados.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="/aviso-legal" className="text-sm text-gray-400 hover:text-[#be8f52] transition-colors">
                Aviso legal
              </Link>
              <Link href="/politica-privacidad" className="text-sm text-gray-400 hover:text-[#be8f52] transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/politica-cookies" className="text-sm text-gray-400 hover:text-[#be8f52] transition-colors">
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón de regreso arriba con efecto glass */}
      <motion.button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed right-6 bottom-6 h-12 w-12 bg-black/30 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#be8f52]/80 transition-all duration-300 shadow-lg z-20"
        aria-label="Volver arriba"
        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;