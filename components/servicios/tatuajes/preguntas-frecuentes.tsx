"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const PreguntasFrecuentesSection = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      pregunta: "¿Cuánto cuesta un tatuaje personalizado en Madrid?",
      respuesta: "El precio varía según el tamaño, complejidad, estilo y tiempo requerido. Nuestras tarifas comienzan desde 80€ para piezas pequeñas. Ofrecemos presupuestos personalizados durante la consulta inicial gratuita, donde evaluamos todos los factores que influyen en el coste final."
    },
    {
      pregunta: "¿Cuál es el tiempo de espera para una cita?",
      respuesta: "Actualmente el tiempo de espera es de 1-3 semanas dependiendo del artista seleccionado y la complejidad del trabajo. Para diseños más elaborados o artistas específicos, recomendamos reservar con mayor antelación. Contáctanos para conocer la disponibilidad actual."
    },
    {
      pregunta: "¿Qué debo hacer antes de mi sesión de tatuaje?",
      respuesta: "Recomendamos: descansar bien la noche anterior, comer antes de venir (no asistir con el estómago vacío), no consumir alcohol 24h antes, llegar con la piel limpia en la zona a tatuar, y usar ropa cómoda que permita acceso fácil al área del tatuaje. También sugerimos hidratarte bien los días previos."
    },
    {
      pregunta: "¿Ofrecéis retoques gratuitos?",
      respuesta: "Sí, incluimos un retoque gratuito dentro de los 3 meses siguientes a la realización del tatuaje si es necesario. Este retoque está pensado para corregir cualquier irregularidad que pueda producirse durante el proceso de cicatrización, asegurando así un resultado óptimo."
    },
    {
      pregunta: "¿Puedo traer mi propio diseño?",
      respuesta: "Absolutamente. Podemos trabajar directamente con tu diseño o utilizarlo como base para crear algo personalizado. Nuestros artistas pueden adaptar, mejorar o rediseñar tu idea para asegurar que funcione bien como tatuaje, manteniendo siempre tu visión original."
    },
    {
      pregunta: "¿Cuál es la edad mínima para tatuarse?",
      respuesta: "La edad mínima legal en Madrid es 18 años. Requerimos documento de identidad válido para verificar la edad. No realizamos tatuajes a menores, incluso con consentimiento paterno, cumpliendo estrictamente con la legislación española."
    },
    {
      pregunta: "¿Qué áreas del cuerpo son más dolorosas para tatuar?",
      respuesta: "Las zonas con piel fina y cerca de huesos o nervios suelen ser más sensibles, como costillas, tobillos, rodillas, codos, columna vertebral y pies. Las áreas con más tejido adiposo como parte exterior del brazo o muslo suelen ser menos dolorosas. La experiencia del dolor es subjetiva y varía según cada persona."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Preguntas Frecuentes sobre <span className="text-[#be8f52]">Tatuajes</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Resolvemos tus dudas sobre nuestro servicio de tatuajes personalizados en Madrid.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="mb-4 border-b border-gray-200 dark:border-zinc-800 pb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <button
                className="flex justify-between items-center w-full text-left py-2 focus:outline-none"
                onClick={() => toggleFaq(index)}
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white pr-8">
                  {faq.pregunta}
                </h3>
                <ChevronDown 
                  className={`transition-transform duration-300 text-[#be8f52] ${activeIndex === index ? 'transform rotate-180' : ''}`} 
                  size={20} 
                />
              </button>
              
              <div 
                className={`mt-2 transition-all duration-300 overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 dark:text-gray-400 pb-2">
                  {faq.respuesta}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ¿Tienes alguna pregunta adicional que no encuentras aquí?
          </p>
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

export default PreguntasFrecuentesSection; 