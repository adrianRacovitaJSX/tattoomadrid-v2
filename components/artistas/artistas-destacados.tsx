"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

const ArtistasDestacadosSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ¿Quieres unirte a nuestro equipo?
              </h2>
              <p className="text-gray-300 mb-6">
                Estamos siempre atentos al talento. Si eres un artista tatuador con experiencia y buscas un espacio donde crecer profesionalmente, nos encantaría conocer tu trabajo.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/20 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Posiciones Permanentes</h3>
                    <p className="text-gray-400 text-sm">Para artistas que buscan un espacio fijo de trabajo.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/20 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Artistas Invitados</h3>
                    <p className="text-gray-400 text-sm">Programa de colaboración para tatuadores itinerantes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-6 w-6 bg-[#be8f52]/20 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                    <Check size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Aprendices</h3>
                    <p className="text-gray-400 text-sm">Programa para tatuadores en formación con talento demostrable.</p>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/contacto?subject=Unirse al equipo" 
                className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-white font-medium hover:bg-[#be8f52]/90 transition-colors rounded-lg"
              >
                Contáctanos
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            
            <div className="relative h-64 md:h-auto">
              <Image 
                src="/images/tattoo-studio.jpg" 
                alt="Únete a nuestro equipo" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-transparent md:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistasDestacadosSection; 