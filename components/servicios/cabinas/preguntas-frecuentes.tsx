"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Plus, Minus } from 'lucide-react';
import { Disclosure, Transition } from '@headlessui/react';

const PreguntasFrecuentesSection = () => {
  const faqs = [
    {
      pregunta: "¿Qué incluye el alquiler de una cabina?",
      respuesta: "El alquiler incluye la cabina completa equipada con camilla, lámpara profesional, máquina de tatuar, fuente de alimentación, y todo el material desechable necesario. También tienes acceso a zonas comunes, WiFi de alta velocidad, y servicios de recepción para tus clientes."
    },
    {
      pregunta: "¿Cuál es el periodo mínimo de alquiler?",
      respuesta: "Ofrecemos alquiler por día, siendo este el periodo mínimo. También disponemos de tarifas para semanas y meses completos, con precios especiales. Para necesidades específicas, podemos preparar un presupuesto personalizado."
    },
    {
      pregunta: "¿Tengo que llevar mi propia máquina y material?",
      respuesta: "No es necesario. Proporcionamos todo el equipo básico incluyendo máquina de tatuar y consumibles. Si prefieres usar tu propia máquina y equipo, puedes hacerlo sin problema. Consulta con nosotros por adelantado si necesitas algún material específico."
    },
    {
      pregunta: "¿Cuál es el horario de acceso a las cabinas?",
      respuesta: "El estudio está abierto al público de 10:00 a 21:00h, pero los profesionales con cabina alquilada tienen acceso exclusivo desde las 9:00 hasta las 22:00h todos los días de la semana, permitiéndote mayor flexibilidad para organizar tu agenda."
    },
    {
      pregunta: "¿Qué documentación necesito para alquilar una cabina?",
      respuesta: "Necesitamos ver tu carnet profesional o certificación de higiene, DNI y firmar un pequeño contrato de alquiler. Si eres autónomo, también te pediremos tu número de registro. Todo el proceso es rápido y te guiaremos en cada paso."
    },
    {
      pregunta: "¿Ofrecéis algún tipo de promoción para mis servicios?",
      respuesta: "Sí, los tatuadores que alquilan cabinas semanales o mensuales tienen la posibilidad de promoción en nuestras redes sociales y web. Valoramos la calidad del trabajo de nuestros colaboradores y nos encanta ayudar a promocionar vuestro talento."
    },
    {
      pregunta: "¿Hay servicio de recepción para mis clientes?",
      respuesta: "Sí, nuestro personal de recepción atenderá a tus clientes cuando lleguen, ofreciéndoles un espacio cómodo de espera. Te avisaremos cuando lleguen para que puedas recibirlos personalmente cuando estés listo."
    },
    {
      pregunta: "¿Qué pasa si necesito cancelar una reserva?",
      respuesta: "Entendemos que pueden surgir imprevistos. Para alquileres diarios, solicitamos un aviso con al menos 48 horas de antelación para un reembolso completo. Para alquileres semanales o mensuales, consulta nuestra política específica de cancelación al realizar la reserva."
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
            Preguntas Frecuentes sobre <span className="text-[#be8f52]">Alquiler de Cabinas</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Resolvemos tus dudas sobre nuestro servicio de alquiler de espacios para tatuadores. Si tienes alguna pregunta adicional, 
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
            ¿Tienes más preguntas sobre nuestro servicio de alquiler de cabinas?
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