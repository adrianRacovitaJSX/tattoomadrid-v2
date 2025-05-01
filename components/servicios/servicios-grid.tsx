"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileStack, Check } from 'lucide-react';

const ServiciosGridSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        {/* Tatuajes Personalizados */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
                <FileStack size={18} className="text-[#be8f52] mr-2" />
                <span className="text-[#be8f52] font-medium text-sm">Tatuajes Personalizados</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Creamos Arte Único para tu Piel</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Nuestros tatuadores son artistas especializados en diferentes estilos, capaces de transformar tus ideas en arte permanente. Trabajamos codo a codo contigo para crear diseños personalizados que reflejen tu personalidad y visión.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Consulta Personalizada</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sesión privada para discutir tus ideas y crear un diseño a medida.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Todos los Estilos</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Realismo, neotradicional, blackwork, japonés, old school, fine line, acuarela y más.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Retoques Gratuitos</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Incluimos un retoque gratuito dentro de los primeros 3 meses tras el tatuaje.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/contacto" className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all">
                Agendar una consulta
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            
            <div className="order-1 md:order-2 relative">
              <div className="aspect-w-4 aspect-h-3 relative">
                <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
                <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                  <Image 
                    src="/images/tattooo.jpg" 
                    alt="Tatuaje personalizado" 
                    width={600} 
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosGridSection; 