"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, Check } from 'lucide-react';

const CabinasGridSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Cabinas Equipadas */}
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
                <Home size={18} className="text-[#be8f52] mr-2" />
                <span className="text-[#be8f52] font-medium text-sm">Espacios Profesionales</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cabinas Totalmente Equipadas</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                En <span className="font-semibold">Saints & Sinners Madrid</span>, ofrecemos espacios completamente equipados para que puedas desarrollar tu trabajo como tatuador profesional sin preocupaciones y con todas las garantías.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Material Completo</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Dispondrás de camilla, lámpara, máquina, fuente de alimentación y todos los consumibles necesarios.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Espacio Privado</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Cabinas individuales con privacidad total para ti y tus clientes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Higiene Garantizada</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Limpieza profesional diaria y protocolos de desinfección entre cada uso.</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="/contacto" 
                className="px-6 py-3 bg-[#be8f52] text-black font-medium inline-flex items-center hover:bg-[#be8f52]/90 transition-all"
              >
                Reserva tu cabina
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </motion.div>
            
            <motion.div 
              className="order-1 md:order-2 relative h-[350px] md:h-[450px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src="/images/cabinas/cabina-1.jpg" 
                    alt="Cabina equipada para tatuadores" 
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#be8f52]/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#be8f52]/10 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Comodidades */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="order-1 relative h-[350px] md:h-[450px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src="/images/cabinas/cabina-2.jpg" 
                    alt="Zona común para tatuadores" 
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#be8f52]/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#be8f52]/10 rounded-full blur-xl"></div>
            </motion.div>
            
            <motion.div 
              className="order-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comodidades para Profesionales</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Además de las cabinas individuales, contarás con acceso a todas las comodidades de nuestro estudio, diseñadas para facilitar tu trabajo y mejorar la experiencia de tus clientes.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Zona de Espera</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Recepción y área de espera confortable para tus clientes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Zona de Descanso</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Área común para descansar entre sesiones con café e infusiones gratuitas.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">WiFi de Alta Velocidad</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Conexión estable y rápida en todo el estudio para ti y tus clientes.</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="/contacto" 
                className="px-6 py-3 bg-[#be8f52] text-black font-medium inline-flex items-center hover:bg-[#be8f52]/90 transition-all"
              >
                Más información
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CabinasGridSection; 