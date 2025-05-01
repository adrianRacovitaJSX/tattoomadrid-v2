"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Minus } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

const PreguntasFrecuentesSection = () => {
  const faqs = [
    {
      pregunta: "¿Es doloroso hacerse un piercing?",
      respuesta: "El nivel de dolor varía según la zona del cuerpo y la tolerancia individual. Generalmente, se describe como una sensación breve e intensa que dura solo unos segundos. Utilizamos técnicas para minimizar la molestia y nuestros profesionales trabajan con rapidez y precisión."
    },
    {
      pregunta: "¿Qué materiales utilizáis para los piercings?",
      respuesta: "Trabajamos exclusivamente con materiales de alta calidad como titanio implantable grado 23, acero quirúrgico 316L y oro de 14k y 18k. Estos materiales son hipoalergénicos y reducen significativamente el riesgo de reacciones adversas durante el proceso de cicatrización."
    },
    {
      pregunta: "¿Cuánto tiempo tarda en cicatrizar un piercing?",
      respuesta: "El tiempo de cicatrización varía según la zona: los piercings en lóbulo (4-6 semanas), cartílago de oreja (3-9 meses), nariz (2-4 meses), labio (2-3 meses), ceja (6-8 semanas), ombligo (6-12 meses) y zonas íntimas (2-6 meses). Una adecuada higiene y cuidados pueden facilitar el proceso."
    },
    {
      pregunta: "¿Puedo cambiar la joyería inicial por otra durante el proceso de cicatrización?",
      respuesta: "No es recomendable cambiar la joyería hasta que el piercing esté completamente cicatrizado. La joyería inicial está diseñada específicamente para facilitar una cicatrización adecuada. Si tienes algún problema con la pieza, te recomendamos visitar nuestro estudio para una evaluación profesional."
    },
    {
      pregunta: "¿Cómo debo cuidar mi nuevo piercing?",
      respuesta: "Limpia el piercing 2 veces al día con solución salina estéril o jabón neutro. Evita tocar el piercing con las manos sucias, no uses alcohol, agua oxigenada o cremas. Evita piscinas, saunas y exposición directa al sol durante la cicatrización. No gires la joyería y evita presionar o golpear la zona. Te proporcionaremos instrucciones detalladas específicas para cada tipo de piercing."
    },
    {
      pregunta: "¿Cuál es la edad mínima para hacerse un piercing?",
      respuesta: "La edad mínima es de 18 años sin consentimiento parental. Entre 14-17 años se requiere presencia y autorización firmada de padre/madre o tutor legal con DNI. Algunos piercings pueden tener restricciones adicionales según normativas locales."
    },
    {
      pregunta: "¿Qué debo hacer si mi piercing se infecta o tengo problemas?",
      respuesta: "Ante signos de infección (enrojecimiento excesivo, hinchazón, dolor intenso, secreción amarillenta o verdosa, calor en la zona), contacta inmediatamente con nuestro estudio. Ofrecemos revisiones gratuitas para clientes y podemos evaluar si necesitas atención médica o simplemente ajustes en tu rutina de cuidados."
    },
    {
      pregunta: "¿Es seguro hacerse un piercing durante el embarazo?",
      respuesta: "No recomendamos realizarse piercings durante el embarazo o lactancia. El cuerpo está más susceptible a infecciones durante estos periodos, y además, los cambios hormonales pueden afectar al proceso de cicatrización. Preferimos esperar hasta después de estos periodos para garantizar tu seguridad."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
            <Sparkles size={18} className="text-[#be8f52] mr-2" />
            <span className="text-[#be8f52] font-medium text-sm">Aprende más</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Preguntas Frecuentes sobre <span className="text-[#be8f52]">Piercings</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Resolvemos tus dudas sobre nuestros servicios de piercings profesionales. Si tienes alguna pregunta adicional, 
            no dudes en contactarnos.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="mb-4"
              variants={itemVariants}
            >
              <Disclosure>
                {({ open }: { open: boolean }) => (
                  <div className="w-full">
                    <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-gray-800 dark:text-white bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-[#be8f52]/50">
                      <span className="font-medium">{faq.pregunta}</span>
                      {open ? (
                        <Minus className="w-5 h-5 text-[#be8f52]" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#be8f52]" />
                      )}
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-6 py-4 text-gray-600 dark:text-gray-300 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-b-lg">
                        {faq.respuesta}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            ¿Tienes más preguntas sobre nuestros servicios de piercings?
          </p>
          <a 
            href="/contacto" 
            className="px-6 py-3 bg-[#be8f52] text-black font-medium inline-flex items-center hover:bg-[#be8f52]/90 transition-all"
          >
            Contacta con nosotros
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