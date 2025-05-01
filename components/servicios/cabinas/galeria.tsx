"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Stars } from 'lucide-react';

// Imágenes de ejemplo para la galería
const cabinasImages = [
  {
    src: "/images/cabinas/cabina-1.jpg",
    alt: "Cabina privada sala principal",
    categoria: "Interiores"
  },
  {
    src: "/images/cabinas/cabina-2.jpg",
    alt: "Equipamiento profesional de tatuaje",
    categoria: "Equipamiento"
  },
  {
    src: "/images/cabinas/cabina-3.jpg",
    alt: "Zona de espera de las cabinas",
    categoria: "Interiores"
  },
  {
    src: "/images/cabinas/cabina-4.jpg",
    alt: "Cabina de tatuaje iluminación especial",
    categoria: "Interiores"
  },
  {
    src: "/images/cabinas/equipamiento-1.jpg",
    alt: "Maquinaria profesional para tatuajes",
    categoria: "Equipamiento"
  },
  {
    src: "/images/cabinas/equipamiento-2.jpg",
    alt: "Set de tintas orgánicas",
    categoria: "Equipamiento"
  },
  {
    src: "/images/cabinas/ambiente-1.jpg",
    alt: "Ambiente acogedor en las cabinas",
    categoria: "Ambiente"
  },
  {
    src: "/images/cabinas/ambiente-2.jpg",
    alt: "Detalles decorativos de las cabinas",
    categoria: "Ambiente"
  },
  {
    src: "/images/cabinas/privacidad-1.jpg",
    alt: "Diseño para máxima privacidad",
    categoria: "Privacidad"
  }
];

// Categorías disponibles
const categorias = ["Todos", "Interiores", "Equipamiento", "Ambiente", "Privacidad"];

const CabinasGaleria = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

  // Filtrar imágenes según la categoría seleccionada
  const imagenesAMostrar = categoriaSeleccionada === "Todos" 
    ? cabinasImages 
    : cabinasImages.filter(img => img.categoria === categoriaSeleccionada);

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
            <Stars size={18} className="text-[#be8f52] mr-2" />
            <span className="text-[#be8f52] font-medium text-sm">Experiencia premium</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Nuestras Cabinas Privadas</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubre los espacios donde la magia sucede. Cabinas privadas diseñadas para garantizar tu comodidad, 
            privacidad y la máxima calidad en cada sesión de tatuaje.
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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
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
                    alt="Interior de cabina privada"
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

        {/* Características de las cabinas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Privacidad Total</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Espacios individuales que garantizan una experiencia íntima y personal para cada cliente.
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Equipamiento Premium</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Utilizamos solo la mejor maquinaria y tintas para conseguir resultados de alta calidad.
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Ambiente Acogedor</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Diseñadas para proporcionar el máximo confort durante toda la sesión de tatuaje.
            </p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Máxima Higiene</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Espacios esterilizados y materiales de un solo uso para garantizar tu seguridad.
            </p>
          </div>
        </motion.div>

        {/* Texto informativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto text-center bg-zinc-50 dark:bg-zinc-900 p-6"
        >
          <p className="text-gray-600 dark:text-gray-300 italic mb-3">
            "Nuestras cabinas son el corazón de nuestro estudio. Las hemos diseñado pensando en cada detalle 
            para que tu experiencia sea única y te sientas como en casa mientras inmortalizamos tu arte."
          </p>
          <p className="text-[#be8f52] font-medium">— Equipo Madrid Tattoo</p>
        </motion.div>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            ¿Quieres conocer nuestras instalaciones?
          </h3>
          <a
            href="/contacto"
            className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all"
          >
            Reserva una visita al estudio
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CabinasGaleria; 