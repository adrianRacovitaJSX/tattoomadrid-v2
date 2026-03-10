"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, History, Plug } from 'lucide-react';

const CabinasCaracteristicasSection = () => {
  const caracteristicas = [
    {
      icono: <Shield className="h-10 w-10 text-[#be8f52]" />,
      titulo: "Seguridad Garantizada",
      descripcion: "Protocolos de seguridad e higiene certificados. Acceso controlado las 24 horas y sistema de vigilancia para proteger tu equipo."
    },
    {
      icono: <Zap className="h-10 w-10 text-[#be8f52]" />,
      titulo: "Flexibilidad Total",
      descripcion: "Alquila por horas, días o semanas según tus necesidades. Sin compromisos a largo plazo y con posibilidad de reservas recurrentes."
    },
    {
      icono: <History className="h-10 w-10 text-[#be8f52]" />,
      titulo: "Horario Ampliado",
      descripcion: "Abrimos de 10:00 a 21:00h, pero los profesionales con cabina pueden acceder de 9:00 a 22:00h todos los días de la semana."
    },
    {
      icono: <Plug className="h-10 w-10 text-[#be8f52]" />,
      titulo: "Equipamiento de Calidad",
      descripcion: "Dispondrás de todo el material necesario: camilla, lámpara profesional, máquina de tatuar, fuentes de alimentación y consumibles."
    }
  ];

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Características de Nuestras <span className="text-[#be8f52]">Cabinas</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Espacios diseñados pensando en las necesidades específicas de los tatuadores profesionales,
            con todo lo que necesitas para desarrollar tu trabajo en las mejores condiciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {caracteristicas.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="mb-4">
                {item.icono}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <a 
            href="/contacto" 
            className="px-6 py-3 bg-[#be8f52] text-black font-medium inline-flex items-center hover:bg-[#be8f52]/90 transition-all"
          >
            Solicita información
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CabinasCaracteristicasSection; 