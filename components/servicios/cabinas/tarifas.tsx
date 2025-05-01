"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const CabinasTarifasSection = () => {
  const planes = [
    {
      nombre: "Por Día",
      precio: "85",
      periodo: "por día",
      descripcion: "Perfecto para tatuadores que necesitan un espacio puntual.",
      caracteristicas: [
        { incluido: true, texto: "Cabina totalmente equipada" },
        { incluido: true, texto: "Material desechable incluido" },
        { incluido: true, texto: "Acceso a zonas comunes" },
        { incluido: false, texto: "Descuento en servicios adicionales" },
        { incluido: false, texto: "Promoción en nuestras redes sociales" }
      ]
    },
    {
      nombre: "Semanal",
      precio: "399",
      periodo: "por semana",
      descripcion: "La opción ideal para proyectos de varios días consecutivos.",
      destacado: true,
      caracteristicas: [
        { incluido: true, texto: "Cabina totalmente equipada" },
        { incluido: true, texto: "Material desechable incluido" },
        { incluido: true, texto: "Acceso a zonas comunes" },
        { incluido: true, texto: "Descuento en servicios adicionales" },
        { incluido: true, texto: "Promoción en nuestras redes sociales" }
      ]
    },
    {
      nombre: "Mensual",
      precio: "1499",
      periodo: "por mes",
      descripcion: "Para tatuadores que buscan un espacio regular en Madrid.",
      caracteristicas: [
        { incluido: true, texto: "Cabina totalmente equipada" },
        { incluido: true, texto: "Material desechable incluido" },
        { incluido: true, texto: "Acceso a zonas comunes" },
        { incluido: true, texto: "Descuento en servicios adicionales" },
        { incluido: true, texto: "Promoción en nuestras redes sociales" }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tarifas de <span className="text-[#be8f52]">Alquiler</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ofrecemos planes flexibles que se adaptan a tus necesidades.
            Todas nuestras tarifas incluyen el equipamiento completo y los consumibles necesarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planes.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-lg overflow-hidden ${
                plan.destacado 
                  ? "border-2 border-[#be8f52]" 
                  : "border border-gray-200 dark:border-zinc-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {plan.destacado && (
                <div className="absolute top-0 inset-x-0 h-1 bg-[#be8f52]"></div>
              )}
              
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {plan.nombre}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    {plan.descripcion}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                      {plan.precio}€
                    </span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                      {plan.periodo}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-center">
                      {caracteristica.incluido ? (
                        <Check className="h-5 w-5 text-[#be8f52] mr-2 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 dark:text-zinc-600 mr-2 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        caracteristica.incluido 
                          ? "text-gray-600 dark:text-gray-300" 
                          : "text-gray-400 dark:text-zinc-500"
                      }`}>
                        {caracteristica.texto}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="/contacto" 
                  className={`w-full text-center block py-3 px-6 font-medium transition-all ${
                    plan.destacado 
                      ? "bg-[#be8f52] text-black hover:bg-[#be8f52]/90" 
                      : "bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  Reservar ahora
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            ¿Necesitas un plan personalizado?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Contáctanos para planes personalizados según tus necesidades específicas.
            Disponemos de opciones para eventos, guest spots o colaboraciones.
          </p>
          <a 
            href="/contacto" 
            className="text-[#be8f52] font-medium inline-flex items-center hover:text-[#be8f52]/80 transition-all"
          >
            Solicitar presupuesto personalizado
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CabinasTarifasSection; 