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
      pregunta: "¿Qué medidas de seguridad aplicáis durante las sesiones?",
      respuesta: "Utilizamos material desechable de un solo uso para cada cliente (agujas, guantes, recipientes, etc.), esterilizamos en autoclave todo el equipo reutilizable, mantenemos una limpieza profunda del área de trabajo antes y después de cada servicio, y trabajamos con tintas certificadas."
    },
    {
      pregunta: "¿Cómo garantizáis la esterilización del equipo?",
      respuesta: "Contamos con un proceso de tres etapas: limpieza ultrasónica para eliminar residuos, esterilización en autoclave a 134°C y alta presión, y empaquetado individual en bolsas selladas estériles que se abren únicamente frente al cliente."
    },
    {
      pregunta: "¿Qué certificaciones tiene el estudio?",
      respuesta: "Nuestro estudio cuenta con todas las certificaciones sanitarias exigidas por la Comunidad de Madrid. Además, nuestros artistas están acreditados en prevención de riesgos biológicos, nuestro local está registrado para la gestión de residuos biosanitarios, y contamos con formación en primeros auxilios."
    },
    {
      pregunta: "¿Qué precauciones tomáis para prevenir infecciones?",
      respuesta: "Además de la esterilización y uso de material desechable, trabajamos con barreras protectoras en todas las superficies, cambiamos guantes frecuentemente durante la sesión, y proporcionamos instrucciones detalladas de cuidado posterior para prevenir infecciones durante la cicatrización."
    },
    {
      pregunta: "¿Las tintas que utilizáis son seguras?",
      respuesta: "Sí, trabajamos exclusivamente con tintas homologadas por la UE, libres de metales pesados y componentes tóxicos. Todas nuestras tintas cumplen con las normativas europeas de seguridad para productos de tatuaje."
    },
    {
      pregunta: "¿Puedo visitar el estudio antes para verificar las condiciones?",
      respuesta: "Por supuesto, te invitamos a visitar nuestras instalaciones antes de reservar tu cita. Podemos mostrarte nuestro protocolo de seguridad, sala de esterilización y responder a cualquier pregunta que tengas sobre nuestras medidas higiénicas."
    },
    {
      pregunta: "¿Qué formación tienen vuestros artistas en materia de higiene?",
      respuesta: "Todos nuestros artistas realizan periódicamente cursos de actualización en prevención de riesgos biológicos, primeros auxilios y protocolos de esterilización. La formación continua es obligatoria en nuestro estudio para mantenernos al día con los últimos estándares de la industria."
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
            Preguntas Frecuentes sobre <span className="text-[#be8f52]">Seguridad</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Resolvemos tus dudas sobre nuestros protocolos de seguridad e higiene en Madrid.
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
            ¿Tienes alguna pregunta adicional sobre nuestros protocolos de seguridad?
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