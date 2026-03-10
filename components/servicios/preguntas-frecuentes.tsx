"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const PreguntasFrecuentesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FaqItem[] = [
    {
      question: "¿Cuál es el proceso para agendar una cita?",
      answer: "Para agendar una cita, puedes contactarnos por teléfono, email o a través del formulario de contacto en nuestra web. Te responderemos en menos de 24 horas para confirmar disponibilidad y acordar una fecha para tu sesión o consulta previa."
    },
    {
      question: "¿Necesito una consulta previa antes de tatuarme?",
      answer: "Para tatuajes personalizados, recomendamos siempre una consulta previa (gratuita) para discutir el diseño, tamaño, ubicación y presupuesto. Para diseños pequeños o flash, no es necesaria una consulta previa, pero siempre es recomendable."
    },
    {
      question: "¿Cuánto cuesta un tatuaje?",
      answer: "El precio varía según el tamaño, complejidad, ubicación y artista elegido. Nuestras tarifas comienzan en 70€ para piezas pequeñas. Durante la consulta te proporcionaremos un presupuesto detallado. Trabajamos tanto por sesión como por proyecto completo."
    },
    {
      question: "¿Es seguro hacerse un tatuaje o piercing?",
      answer: "Sí, seguimos estrictos protocolos de higiene y seguridad. Utilizamos materialas esterilizados o desechables, y nuestros artistas están certificados en control de infecciones y primeros auxilios. Después de cada procedimiento, recibirás instrucciones detalladas para el cuidado."
    },
    {
      question: "¿Cuánto tiempo tarda en sanar un tatuaje?",
      answer: "La sanación superficial toma aproximadamente 2 semanas, mientras que la sanación completa puede tomar hasta 4-6 semanas. Durante este tiempo, deberás seguir las instrucciones de cuidado proporcionadas por tu tatuador para obtener el mejor resultado."
    }
  ];
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
              <HelpCircle size={18} className="text-[#be8f52] mr-2" />
              <span className="text-[#be8f52] font-medium text-sm">Preguntas Frecuentes</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Resolvemos tus Dudas</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios y procesos
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-zinc-950 border ${openIndex === index ? 'border-[#be8f52]/30' : 'border-gray-200 dark:border-zinc-800'} rounded-xl overflow-hidden transition-all duration-300`}
              >
                <button 
                  className="flex items-center justify-between w-full px-6 py-5 text-left" 
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#be8f52]' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-80 pb-6' : 'max-h-0'}`}
                >
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreguntasFrecuentesSection;