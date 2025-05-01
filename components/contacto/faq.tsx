"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const FaqSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const faqs: FaqItem[] = [
    {
      question: "¿Cuánto tiempo tardáis en responder a una consulta?",
      answer: "Nos comprometemos a responder todas las consultas en un plazo máximo de 24-48 horas laborables. Para consultas urgentes, te recomendamos llamarnos directamente."
    },
    {
      question: "¿Cómo funciona el proceso de reserva de cita?",
      answer: "Una vez recibamos tu solicitud, te contactaremos para confirmar detalles y disponibilidad. Para confirmar la cita, solicitamos un depósito de 50€ que se descuenta del precio final del tatuaje. Este depósito garantiza tu fecha y permite a nuestros artistas comenzar a trabajar en tu diseño."
    },
    {
      question: "¿Puedo solicitar un presupuesto sin compromiso?",
      answer: "Sí, ofrecemos presupuestos sin compromiso. Para obtener un presupuesto más preciso, es recomendable que nos proporciones detalles sobre el diseño, tamaño y ubicación del tatuaje, idealmente con referencias visuales."
    },
    {
      question: "¿Qué formas de pago aceptáis?",
      answer: "Aceptamos efectivo, tarjetas de crédito/débito, transferencia bancaria y Bizum. Para el depósito inicial, preferimos transferencia bancaria o Bizum."
    },
    {
      question: "¿Necesito una consulta presencial antes del tatuaje?",
      answer: "Para tatuajes de tamaño mediano o grande, recomendamos una consulta presencial para discutir todos los detalles. Para diseños pequeños o sencillos, podemos gestionar la consulta online. En ambos casos, la consulta es gratuita."
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Preguntas Frecuentes</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestros servicios y el proceso de contacto
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                    expandedIndex === index ? 'transform rotate-180 text-[#be8f52]' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300">
            ¿Tienes más preguntas?
          </p>
          <Link href="/contacto?subject=Pregunta adicional" className="text-[#be8f52] font-medium hover:underline inline-flex items-center mt-2">
            Escríbenos directamente
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 