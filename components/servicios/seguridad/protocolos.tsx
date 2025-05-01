"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Beaker, SprayCan, Syringe } from 'lucide-react';

const SeguridadProtocolosSection = () => {
  const protocolos = [
    {
      icono: <ShieldCheck size={24} />,
      paso: "01",
      titulo: "Preparación del Área",
      descripcion: "Limpiamos y desinfectamos completamente toda la superficie de trabajo antes de cada sesión.",
    },
    {
      icono: <Beaker size={24} />,
      paso: "02",
      titulo: "Esterilización de Equipos",
      descripcion: "Todos los equipos reutilizables pasan por un proceso de esterilización en autoclave a alta presión y temperatura.",
    },
    {
      icono: <SprayCan size={24} />,
      paso: "03",
      titulo: "Materiales Desechables",
      descripcion: "Utilizamos agujas, guantes, recipientes y otros materiales desechables de un solo uso para cada cliente.",
    },
    {
      icono: <Syringe size={24} />,
      paso: "04",
      titulo: "Tinta Estéril",
      descripcion: "Trabajamos únicamente con tintas certificadas y de la más alta calidad, siempre en recipientes individuales.",
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Protocolos de <span className="text-[#be8f52]">Seguridad</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            En Saints & Sinners Madrid seguimos estrictos protocolos de seguridad e higiene para garantizar que cada cliente disfrute de una experiencia segura.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {protocolos.map((protocolo, index) => (
            <motion.div
              key={index}
              className="relative p-8 border border-[#be8f52]/20 rounded-lg bg-white dark:bg-zinc-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                borderColor: "#be8f52"
              }}
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#be8f52] text-black text-sm font-bold flex items-center justify-center">
                {protocolo.paso}
              </div>
              
              <div className="h-14 w-14 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-6">
                {protocolo.icono}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {protocolo.titulo}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {protocolo.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 italic">
            "La seguridad y la higiene son la base de nuestro trabajo. Sin estas premisas, no hay arte posible."
          </p>
          <p className="text-[#be8f52] font-medium mt-2">— Equipo Saints & Sinners Madrid</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeguridadProtocolosSection; 