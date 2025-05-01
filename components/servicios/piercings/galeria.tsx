"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Imágenes de ejemplo para la galería
const piercingImages = [
  {
    src: "/images/piercings/oreja-1.jpg",
    alt: "Piercing de lóbulo",
    categoria: "Oreja"
  },
  {
    src: "/images/piercings/oreja-2.jpg",
    alt: "Piercing de hélix",
    categoria: "Oreja"
  },
  {
    src: "/images/piercings/oreja-3.jpg",
    alt: "Piercing industrial",
    categoria: "Oreja"
  },
  {
    src: "/images/piercings/facial-1.jpg",
    alt: "Piercing de nariz",
    categoria: "Facial"
  },
  {
    src: "/images/piercings/facial-2.jpg",
    alt: "Piercing de labio",
    categoria: "Facial"
  },
  {
    src: "/images/piercings/facial-3.jpg",
    alt: "Piercing de ceja",
    categoria: "Facial"
  },
  {
    src: "/images/piercings/corporal-1.jpg",
    alt: "Piercing de ombligo",
    categoria: "Corporal"
  },
  {
    src: "/images/piercings/corporal-2.jpg",
    alt: "Piercing de pezón",
    categoria: "Corporal"
  },
  {
    src: "/images/piercings/corporal-3.jpg",
    alt: "Dermal",
    categoria: "Corporal"
  }
];

// Categorías disponibles
const categorias = ["Todos", "Oreja", "Facial", "Corporal"];

const PiercingsGaleriaSection = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  // Filtrar imágenes según la categoría seleccionada
  const imagenesAMostrar = categoriaSeleccionada === "Todos" 
    ? piercingImages 
    : piercingImages.filter(img => img.categoria === categoriaSeleccionada);

  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Galería de Piercings</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explora nuestra galería de piercings y descubre la amplia variedad de opciones que ofrecemos. 
            Desde piercings faciales hasta corporales, tenemos el estilo perfecto para expresar tu individualidad.
          </p>
        </motion.div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                categoriaSeleccionada === categoria
                  ? "bg-[#be8f52] text-black"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Galería de imágenes */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {imagenesAMostrar.map((imagen, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden cursor-pointer group"
              onClick={() => setImagenSeleccionada(imagen.src)}
            >
              <Image
                src={imagen.src}
                alt={imagen.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 30vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {imagen.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal para ver la imagen en grande */}
        <AnimatePresence mode="sync">
          {imagenSeleccionada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              onClick={() => setImagenSeleccionada(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full max-h-[80vh] aspect-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imagenSeleccionada}
                    alt="Piercing ampliado"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                  onClick={() => setImagenSeleccionada(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            ¿Listo para tu próximo piercing?
          </h3>
          <a
            href="/cita"
            className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
          >
            Reservar cita
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PiercingsGaleriaSection; 