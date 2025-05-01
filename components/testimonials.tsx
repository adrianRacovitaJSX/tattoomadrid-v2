"use client";

import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import MagneticButton from '@/components/ui/magnetic-button';

interface TestimonialProps {
  name: string;
  content: string;
  rating: number;
  date?: string;
  service?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, content, rating, date, service }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-xl shadow-md border border-transparent hover:border-[#be8f52]/20 transition-all duration-300 group relative overflow-hidden h-full">
      {/* Elemento decorativo */}
      <div className="absolute -top-10 -right-10 h-20 w-20 bg-[#be8f52]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white">{name}</h4>
        <div className="flex items-center">
          {Array(5).fill(0).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${i < rating ? 'text-[#be8f52]' : 'text-gray-300 dark:text-gray-600'}`}
              fill={i < rating ? 'currentColor' : 'none'}
            />
          ))}
          {date && (
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{date}</span>
          )}
        </div>
      </div>
      <blockquote className="text-gray-600 dark:text-gray-300 italic">"{content}"</blockquote>
      
      {service && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <CheckCircle size={14} className="mr-1 text-[#be8f52]" />
            <span>Servicio: {service}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Elena López",
      content: "Ha sido mi primer piercing con ellos. El local estaba muy limpio y Edu, el artista, lo hizo genial. Llevo una semana con la perforación y la cicatrización está siendo impecable. Sin duda recomiendo!",
      rating: 5,
      date: "hace 6 días",
      service: "Piercing en la oreja"
    },
    {
      name: "Elena López de la Torre",
      content: "Son unos artistas! Sobre todo Gamboa! Es maravilloso, muy cercano y acierta siempre con lo que buscas exactamente al comentarle la idea. 100% recomendable!",
      rating: 5,
      date: "hace 6 días"
    },
    {
      name: "Carlos Chavez",
      content: "Excelente trabajo y totalmente profesionales, me voy satisfecho por la pieza que me realizaron 😎",
      rating: 5,
      date: "Hace un mes"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 relative overflow-hidden">
      {/* Fondo con patrón diagonal */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern-diagonal" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" className="text-[#be8f52]"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-diagonal)"></rect>
        </svg>
      </div>
      
      {/* Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-white dark:via-zinc-950/80 dark:to-zinc-950"></div>
      
      {/* Puntos decorativos */}
      <div className="absolute top-0 right-0 w-80 h-80">
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g fill="currentColor" className="text-[#be8f52]">
            {[...Array(10)].map((_, y) => (
              [...Array(10)].map((_, x) => (
                <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="1" />
              ))
            ))}
          </g>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Lo que dicen <span className="text-[#be8f52]">nuestros clientes</span></h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Experiencias reales de clientes satisfechos</p>
          <div className="h-1 w-20 bg-[#be8f52]/30 mx-auto mt-6"></div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.2} className="md:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal 
                key={index} 
                delay={0.1 * index} 
                direction="up" 
                className="h-full"
              >
                <Testimonial
                  name={testimonial.name}
                  content={testimonial.content}
                  rating={testimonial.rating}
                  date={testimonial.date}
                  service={testimonial.service}
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={0.4} className="mt-12 text-center">
          <MagneticButton magneticStrength={60} className="inline-block">
            <a 
              href="https://g.co/kgs/paqKHku" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-white font-medium rounded-lg shadow-lg shadow-[#be8f52]/20 hover:bg-[#be8f52]/90 transition-colors duration-300"
            >
              Ver todas las reseñas
            </a>
          </MagneticButton>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;