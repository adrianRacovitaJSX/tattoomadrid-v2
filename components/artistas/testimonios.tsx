"use client";

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
  service: string;
  date: string;
}

const TestimoniosSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana García",
      image: "/images/testimonials/user-1.jpg",
      rating: 5,
      text: "Mi experiencia con Gamboa fue excepcional. Captó perfectamente la idea que tenía y la mejoró con su estilo único. El resultado superó todas mis expectativas. Sin duda, volveré para mi próximo tatuaje.",
      service: "Tatuaje realista",
      date: "Marzo 2023"
    },
    {
      id: 2,
      name: "Carlos Martínez",
      image: "/images/testimonials/user-2.jpg",
      rating: 5,
      text: "Edward transformó un diseño simple en una obra de arte. Su técnica con el color es impresionante. Todo el proceso fue profesional, desde la consulta hasta el seguimiento posterior. Estudio impecable y gran ambiente.",
      service: "Tatuaje neotradicional",
      date: "Junio 2023"
    },
    {
      id: 3,
      name: "Laura Sánchez",
      image: "/images/testimonials/user-3.jpg",
      rating: 5,
      text: "Airon creó un diseño japonés espectacular que se adaptó perfectamente a mi cuerpo. Su conocimiento de la cultura japonesa y su técnica son impresionantes. El estudio es muy acogedor y el equipo muy profesional.",
      service: "Tatuaje japonés",
      date: "Enero 2023"
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Escucha las experiencias de quienes ya han confiado en nuestros artistas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-zinc-950 rounded-xl shadow-lg border border-gray-100 dark:border-zinc-800 p-6 relative"
            >
              <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-[#be8f52] text-white text-xs px-2 py-1 rounded-md">
                Verificado
              </div>
              
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    width={48} 
                    height={48} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.service}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection; 