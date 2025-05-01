"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TatuajesEstilosSection = () => {
  const estilos = [
    {
      nombre: "Realismo",
      descripcion: "Tatuajes con un nivel de detalle fotográfico, perfectos para retratos y escenas naturales.",
      imagen: "/images/tattooo.jpg"
    },
    {
      nombre: "Blackwork",
      descripcion: "Diseños con líneas y sombras negras sólidas, conocidos por su gran durabilidad y contraste.",
      imagen: "/images/tattooo.jpg"
    },
    {
      nombre: "Neotradicional",
      descripcion: "Evolución moderna del estilo tradicional con más color, detalle y diseños más complejos.",
      imagen: "/images/tattooo.jpg"
    },
    {
      nombre: "Old School",
      descripcion: "Estilo clásico con líneas gruesas, colores vivos y diseños icónicos que nunca pasan de moda.",
      imagen: "/images/tattooo.jpg"
    },
    {
      nombre: "Japonés",
      descripcion: "Arte tradicional japonés adaptado al tatuaje, con elementos narrativos y simbólicos.",
      imagen: "/images/tattooo.jpg"
    },
    {
      nombre: "Fine Line",
      descripcion: "Líneas delicadas y detalles finos, ideal para tatuajes pequeños y diseños minimalistas.",
      imagen: "/images/tattooo.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Estilos de <span className="text-[#be8f52]">Tatuaje</span> que Dominamos
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Nuestro estudio en Madrid cuenta con artistas especializados en diversos estilos para satisfacer todos los gustos y preferencias.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {estilos.map((estilo, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-950"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-w-4 aspect-h-3 relative">
                <Image
                  src={estilo.imagen}
                  alt={`Estilo de tatuaje ${estilo.nombre} en Madrid`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                  {estilo.nombre}
                </h3>
                <motion.p 
                  className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  {estilo.descripcion}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">¿No ves el estilo que buscas?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Nuestros artistas pueden trabajar con muchos más estilos, incluyendo acuarela, geométrico, dotwork, tribal, biomecánico y más. ¡Consúltanos!
          </p>
          <a 
            href="/contacto" 
            className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
          >
            Consultar sobre estilos
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TatuajesEstilosSection; 