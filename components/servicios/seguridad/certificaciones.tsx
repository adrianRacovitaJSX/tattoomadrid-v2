"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Award, Users } from 'lucide-react';

const certificaciones = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#be8f52]" />,
    title: "Cumplimiento Normativo",
    description: "Cumplimos rigurosamente con todas las normativas y regulaciones sanitarias establecidas por las autoridades locales para estudios de tatuajes y piercing."
  },
  {
    icon: <CheckCircle className="w-10 h-10 text-[#be8f52]" />,
    title: "Control de Higiene",
    description: "Nuestras instalaciones y procesos son sometidos a inspecciones regulares para garantizar el cumplimiento de los más altos estándares de limpieza y esterilización."
  },
  {
    icon: <Award className="w-10 h-10 text-[#be8f52]" />,
    title: "Certificación Profesional",
    description: "Todos nuestros artistas y profesionales cuentan con las certificaciones necesarias en higiene, primeros auxilios y técnicas específicas para garantizar un servicio seguro."
  },
  {
    icon: <Users className="w-10 h-10 text-[#be8f52]" />,
    title: "Formación Continua",
    description: "Invertimos en la formación continua de nuestro personal para mantenernos actualizados en las últimas técnicas y protocolos de seguridad en la industria."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const Certificaciones = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
            <span className="text-[#be8f52] font-medium text-sm">Tu seguridad es nuestra prioridad</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Certificaciones y Estándares de Seguridad</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            En nuestro estudio nos tomamos muy en serio tu seguridad y bienestar. Cumplimos con los más altos estándares 
            de higiene y seguridad para garantizar una experiencia segura y profesional.
          </p>
        </motion.div>

        {/* Grid de certificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {certificaciones.map((cert, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex gap-6 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="shrink-0">{cert.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensaje de compromiso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="bg-[#be8f52]/10 p-8 border-l-4 border-[#be8f52] max-w-3xl mx-auto text-center"
        >
          <p className="text-lg font-medium italic text-gray-800 dark:text-gray-200 mb-4">
            "Nuestro compromiso es proporcionar un entorno seguro, higiénico y profesional para todos nuestros clientes. 
            La seguridad y la calidad nunca son negociables en nuestro estudio."
          </p>
          <p className="text-gray-600 dark:text-gray-400">— El equipo de Madrid Tattoo</p>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            ¿Tienes preguntas sobre nuestros procedimientos de seguridad?
          </h3>
          <a 
            href="/contacto" 
            className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
          >
            Contáctanos
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificaciones; 