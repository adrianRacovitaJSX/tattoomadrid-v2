"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Stethoscope, Syringe, BadgeHelp } from 'lucide-react';

const PiercingesProcesosSection = () => {
  const procesos = [
    {
      icono: <Stethoscope size={24} />,
      paso: "01",
      titulo: "Consulta Previa",
      descripcion: "Realizamos una evaluación previa donde analizamos tu anatomía y te aconsejamos sobre el tipo de piercing y joyería más adecuados.",
    },
    {
      icono: <Shield size={24} />,
      paso: "02",
      titulo: "Preparación Estéril",
      descripcion: "Preparamos todo el material estéril y desechable necesario para la perforación, siguiendo estrictos protocolos de higiene.",
    },
    {
      icono: <Syringe size={24} />,
      paso: "03",
      titulo: "Perforación Profesional",
      descripcion: "Realizamos la perforación con técnicas precisas y seguras, minimizando el dolor y asegurando la correcta posición de la joyería.",
    },
    {
      icono: <BadgeHelp size={24} />,
      paso: "04",
      titulo: "Seguimiento y Cuidado",
      descripcion: "Te proporcionamos instrucciones detalladas para el cuidado posterior y ofrecemos seguimiento gratuito durante el proceso de cicatrización.",
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
            Proceso de <span className="text-[#be8f52]">Perforación</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            En Saints & Sinners Madrid seguimos un proceso profesional para cada piercing, asegurando los mejores resultados y minimizando los riesgos.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {procesos.map((proceso, index) => (
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
                {proceso.paso}
              </div>
              
              <div className="h-14 w-14 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-6">
                {proceso.icono}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {proceso.titulo}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {proceso.descripcion}
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
            "La perforación es un arte que requiere precisión, conocimiento y las máximas medidas de seguridad. No dejes tu cuerpo en manos inexpertas."
          </p>
          <p className="text-[#be8f52] font-medium mt-2">— Equipo Saints & Sinners Madrid</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PiercingesProcesosSection; 