"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, ChevronRight, MessageSquare, Phone, Sparkles } from 'lucide-react';

const BookingSection = () => {
  const [activeArtist, setActiveArtist] = useState<string | null>(null);
  
  const artists = [
    {
      id: 'gamboa',
      name: 'Gamboa The Goat',
      specialty: 'Realismo y Blackwork',
      image: '/images/artists/gamboa.jpg',
      availability: '2 semanas',
    },
    {
      id: 'edward',
      name: 'Edward Ortiz',
      specialty: 'Neotradicional y Color',
      image: '/images/artists/edward.jpg',
      availability: '3 semanas',
    },
    {
      id: 'airon',
      name: 'Airon Broncano',
      specialty: 'Japonés y Geométrico',
      image: '/images/artists/airon.jpg',
      availability: '1 semana',
    },
    {
      id: 'guzman',
      name: 'Guzmán El Malo',
      specialty: 'Old School y Fine Line',
      image: '/images/artists/guzman.jpg',
      availability: '4 semanas',
    },
  ];

  // Animación para elementos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#be8f52]/10 rounded-full blur-3xl opacity-60 -translate-y-1/3 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#be8f52]/10 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/3"></div>
      
      {/* Patrón de fondo */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none z-0" 
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23be8f52' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='0.5'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            variants={itemVariants}
          >
            Reserva tu <span className="text-[#be8f52]">cita</span>
          </motion.h2>
          
          <motion.div 
            className="h-1 w-16 bg-[#be8f52] mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Nuestros artistas están listos para hacer realidad tu próximo proyecto de tatuaje
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Panel izquierdo - Artistas */}
          <motion.div 
            className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-zinc-800"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Sparkles size={20} className="mr-2 text-[#be8f52]" />
              Nuestros artistas
            </h3>
            
            <div className="space-y-4">
              {artists.map((artist) => (
                <motion.div
                  key={artist.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center ${
                    activeArtist === artist.id 
                      ? 'bg-[#be8f52]/10 border-[#be8f52] border'
                      : 'hover:bg-gray-50 dark:hover:bg-zinc-800 border border-transparent'
                  }`}
                  onClick={() => setActiveArtist(artist.id === activeArtist ? null : artist.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-gray-200 dark:border-zinc-700">
                    <Image 
                      src={artist.image} 
                      alt={artist.name} 
                      width={56} 
                      height={56} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900 dark:text-white">{artist.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{artist.specialty}</p>
                    <p className="text-xs text-[#be8f52] mt-1 flex items-center">
                      <Clock size={12} className="mr-1" />
                      Disponibilidad: {artist.availability}
                    </p>
                  </div>
                  
                  <ChevronRight 
                    size={18} 
                    className={`text-gray-400 transition-transform duration-300 ${
                      activeArtist === artist.id ? 'rotate-90' : ''
                    }`} 
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                También puedes contactar directamente para más información:
              </p>
              
              <div className="flex space-x-3">
                <a 
                  href="tel:+34603211318" 
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  Llamar
                </a>
                <a 
                  href="https://wa.me/34603211318" 
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MessageSquare size={16} className="mr-2" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Panel derecho - Información y Reserva */}
          <motion.div 
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-zinc-800 h-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Calendar size={20} className="mr-2 text-[#be8f52]" />
                Proceso de reserva
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center text-[#be8f52] font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Consulta inicial</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Programa una consulta gratuita con nuestros artistas para discutir tu idea y crear un diseño personalizado.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center text-[#be8f52] font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Confirmación de cita</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Una vez que estés satisfecho con el diseño, confirmamos tu cita con un depósito de 50€ (que se descontará del precio final).
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center text-[#be8f52] font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Día de tu tatuaje</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Llega descansado y bien alimentado. Nuestro equipo te guiará a través de todo el proceso para que sea una experiencia agradable.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-5 mb-8">
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center mb-3">
                  <Check size={18} className="mr-2 text-[#be8f52]" />
                  Por qué reservar con nosotros
                </h4>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Artistas especializados en diferentes estilos</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Ambiente relajado y seguro</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Máximos estándares de higiene</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Retoques incluidos durante los primeros 3 meses</span>
                  </li>
                </ul>
              </div>
              
              <Link 
                href={`/contacto${activeArtist ? `?artist=${activeArtist}` : ''}`}
                passHref
              >
                <motion.div
                  className="block w-full px-6 py-4 bg-[#be8f52] text-white font-medium rounded-xl text-center transition-all group overflow-hidden relative"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#be8f52] to-[#a97c43] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    <Calendar size={18} className="mr-2" />
                    {activeArtist ? 'Reservar con este artista' : 'Reservar mi cita ahora'}
                  </span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Testimonios */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="rounded-2xl bg-gradient-to-r from-[#be8f52]/20 to-[#be8f52]/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Lo que dicen nuestros clientes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md relative z-10">
                <div className="flex text-[#be8f52] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  "Mi experiencia fue increíble. El artista entendió exactamente lo que quería y el resultado superó mis expectativas. Recomiendo 100% Saints & Sinners."
                </p>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-zinc-700">
                    <Image 
                      src="/images/testimonials/client1.jpg" 
                      alt="Cliente" 
                      width={36} 
                      height={36} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Laura Martínez</h4>
                    <p className="text-[#be8f52] text-xs">Tatuaje Realista</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md relative z-10">
                <div className="flex text-[#be8f52] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  "El proceso de reserva fue muy sencillo. Desde la consulta hasta el día del tatuaje todo fue profesional y sin complicaciones. ¡Volveré pronto!"
                </p>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-zinc-700">
                    <Image 
                      src="/images/testimonials/client2.jpg" 
                      alt="Cliente" 
                      width={36} 
                      height={36} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Carlos Sánchez</h4>
                    <p className="text-[#be8f52] text-xs">Tatuaje Neotradicional</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-md relative z-10">
                <div className="flex text-[#be8f52] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  "Llevo años siendo cliente de Saints & Sinners y jamás he tenido una mala experiencia. Su sistema de reservas es eficiente y el trato es inmejorable."
                </p>
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-zinc-700">
                    <Image 
                      src="/images/testimonials/client3.jpg" 
                      alt="Cliente" 
                      width={36} 
                      height={36} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Ana Gómez</h4>
                    <p className="text-[#be8f52] text-xs">Varios tatuajes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection; 