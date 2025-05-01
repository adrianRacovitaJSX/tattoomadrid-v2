"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Clock } from 'lucide-react';

const HorariosSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Horarios y <span className="text-[#be8f52]">Visitas</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nuestro estudio está abierto para consultas y visitas durante nuestro horario comercial. Para tatuajes y trabajos específicos, recomendamos siempre agendar una cita con antelación.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                  <Clock className="h-5 w-5 text-[#be8f52]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Horario de Atención</h3>
                  <ul className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                    <li>Lunes a Sábado: 11:00 - 14:00, 15:00 - 20:00</li>
                    <li>Domingo: Cita previa</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                  <MapPin className="h-5 w-5 text-[#be8f52]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Dirección</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    C. de los Hermanos Gómez, 5, Cdad. Lineal<br />
                    28017 Madrid, España
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                  <Phone className="h-5 w-5 text-[#be8f52]" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Reservas</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Para consultas y reservas, puedes llamarnos al:<br />
                    <a href="tel:+34603211318" className="text-[#be8f52] hover:underline">+34 603 21 13 18</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <a
                href="tel:+34603211318"
                className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium rounded-lg hover:bg-[#be8f52]/90 transition-colors"
              >
                <Phone size={18} className="mr-2" />
                Llamar ahora
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square relative rounded-xl overflow-hidden">
              <div className="absolute -inset-6 border border-[#be8f52]/20 z-0 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
              <div className="relative h-full w-full overflow-hidden bg-zinc-900 rounded-xl z-10">
                <Image 
                  src="/images/recepcion.webp" 
                  alt="Recepción del estudio" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorariosSection; 