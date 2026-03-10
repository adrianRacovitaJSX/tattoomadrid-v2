"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Check } from "lucide-react";

const SeguridadSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 relative">
              <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
              <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                <Image
                  src="/images/tattoo-personalizado.jpg"
                  alt="Seguridad e higiene"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
              <ShieldCheck size={18} className="text-[#be8f52] mr-2" />
              <span className="text-[#be8f52] font-medium text-sm">
                Seguridad e Higiene
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu Seguridad es Nuestra Prioridad
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Cumplimos con los más estrictos protocolos de higiene y seguridad.
              Todos nuestros materiales son de un solo uso o esterilizados
              mediante autoclave, garantizando un entorno 100% seguro para cada
              cliente.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                  <Check size={14} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Materiales Esterilizados
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Utilizamos equipos esterilizados mediante autoclave entre
                    cada cliente.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                  <Check size={14} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Agujas Desechables
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Todas nuestras agujas son de un solo uso y se abren delante
                    del cliente.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                  <Check size={14} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Tintas Certificadas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Trabajamos únicamente con tintas hipoalergénicas de máxima
                    calidad y certificación.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/sobre-nosotros"
              className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
            >
              Conoce nuestros estándares
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeguridadSection;
