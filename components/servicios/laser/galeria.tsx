"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';

// Imágenes de ejemplo para la galería
const laserImages = [
  {
    src: "/images/laser/antes-despues-1.jpg",
    alt: "Antes y después eliminación tatuaje tribal",
    categoria: "Antes/Después"
  },
  {
    src: "/images/laser/antes-despues-2.jpg",
    alt: "Antes y después eliminación tatuaje color",
    categoria: "Antes/Después"
  },
  {
    src: "/images/laser/antes-despues-3.jpg",
    alt: "Antes y después eliminación parcial",
    categoria: "Antes/Después"
  },
  {
    src: "/images/laser/equipo-1.jpg",
    alt: "Equipo láser de última generación",
    categoria: "Equipamiento"
  },
  {
    src: "/images/laser/equipo-2.jpg",
    alt: "Sala de procedimientos láser",
    categoria: "Equipamiento"
  },
  {
    src: "/images/laser/procedimiento-1.jpg",
    alt: "Procedimiento de eliminación láser",
    categoria: "Procedimiento"
  },
  {
    src: "/images/laser/procedimiento-2.jpg",
    alt: "Sesión de eliminación de tatuaje",
    categoria: "Procedimiento"
  },
  {
    src: "/images/laser/resultado-1.jpg",
    alt: "Resultado final tras 5 sesiones",
    categoria: "Resultados"
  },
  {
    src: "/images/laser/resultado-2.jpg",
    alt: "Resultado final tras 8 sesiones",
    categoria: "Resultados"
  }
];

// Categorías disponibles
const categorias = ["Todos", "Antes/Después", "Procedimiento", "Equipamiento", "Resultados"];

const LaserGaleria = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  // Filtrar imágenes según la categoría seleccionada
  const imagenesAMostrar = categoriaSeleccionada === "Todos" 
    ? laserImages 
    : laserImages.filter(img => img.categoria === categoriaSeleccionada);

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
          <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
            <Zap size={18} className="text-[#be8f52] mr-2" />
            <span className="text-[#be8f52] font-medium text-sm">Resultados reales</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Galería de Eliminación Láser</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explora nuestra galería de resultados reales de eliminación y atenuación de tatuajes con tecnología láser. 
            Cada caso es único y los resultados pueden variar según el tipo de tinta, antigüedad y ubicación del tatuaje.
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                  <p className="font-medium mb-1">{imagen.alt}</p>
                  <span className="text-xs text-[#be8f52]">{imagen.categoria}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal para ver la imagen en grande */}
        <AnimatePresence>
          {imagenSeleccionada && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
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
                    alt="Resultado de eliminación láser"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
                <button
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 text-white rounded-full hover:bg-opacity-20 transition-all"
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
            ¿Quieres eliminar o atenuar un tatuaje no deseado?
          </h3>
          <a
            href="/contacto"
            className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
          >
            Agenda una consulta gratuita
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LaserGaleria; 