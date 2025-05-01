"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Syringe, Check } from 'lucide-react';

const PiercingsGridSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Piercings Profesionales */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
                <Syringe size={18} className="text-[#be8f52] mr-2" />
                <span className="text-[#be8f52] font-medium text-sm">Piercings Profesionales</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Perforaciones Seguras con Joyería de Calidad</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                En <span className="font-semibold">Saints & Sinners Madrid</span>, nuestro servicio de piercings se distingue por la profesionalidad, la seguridad y el uso exclusivo de joyería de alta calidad para asegurar una cicatrización óptima.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Profesionales Certificados</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Nuestros perforadores cuentan con todas las certificaciones necesarias y formación especializada.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Joyería de Titanio y Oro</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Utilizamos exclusivamente joyería hipoalergénica de máxima calidad para prevenir reacciones adversas.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Seguimiento Post-Piercing</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Incluimos seguimiento gratuito del proceso de cicatrización y asesoramiento personalizado.</p>
                  </div>
                </div>
              </div>
              
              <a href="/contacto" className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all">
                Agendar una cita
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2 relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
                <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                  <Image 
                    src="/images/tattooo.jpg" 
                    alt="Piercing profesional en Madrid" 
                    width={600} 
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tipos de Piercings */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="relative order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
                <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                  <Image 
                    src="/images/tattooo.jpg" 
                    alt="Diferentes tipos de piercings en Madrid" 
                    width={600} 
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="order-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Variedad de Piercings</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Realizamos todo tipo de perforaciones faciales y corporales con la máxima seguridad y precisión. Nuestro equipo te asesorará sobre el tipo de joyería más adecuada para cada zona.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Piercings Faciales</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Septum, nariz, labio, ceja, bridge, medusa, philtrum, labret y más.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Piercings en Oreja</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Lóbulo, tragus, antitragus, helix, rook, daith, industrial, conch y más.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Piercings Corporales</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Pezón, ombligo, superficie y otros tipos de perforaciones corporales.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
          className="bg-gradient-to-r from-[#be8f52] to-[#be8f52]/80 p-10 rounded-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}
        >
          {/* Fondo con patrón animado */}
          <motion.div 
            className="absolute inset-0 bg-black/10 opacity-20 mix-blend-overlay"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' 
            }}
            animate={{
              backgroundPositionX: ["0%", "100%"],
              backgroundPositionY: ["0%", "100%"]
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <div className="md:flex items-center justify-between relative z-10">
            <div>
              <motion.h3 
                className="text-2xl font-bold mb-2 text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ¿Estás pensando en hacerte un piercing?
              </motion.h3>
              <motion.p 
                className="text-white/90 text-lg mb-6 md:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Consulta con nuestros profesionales en Madrid. Te asesoraremos sobre el tipo de joyería y piercing que mejor se adapte a ti.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/contacto" 
                className="inline-block px-8 py-4 bg-black text-white font-medium rounded-sm hover:bg-black/80 transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Reservar Ahora</span>
                <motion.span 
                  className="absolute inset-0 bg-[#be8f52]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PiercingsGridSection; 