"use client";

import React, { useState } from 'react';
import { Check, ShieldCheck, Syringe, FileStack, Zap, Home } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

import TiltedCard from '@/components/ui/tilted-card';
import WavesBackground from '@/components/ui/waves-background';

interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  isPopular?: boolean;
  link?: string;
  clients?: number;
  features?: string[];
}

const ServiceCard: React.FC<ServiceProps> = ({ 
  title, 
  description, 
  icon, 
  index, 
  isPopular = false, 
  link = "/servicios",
  clients = 0,
  features = []
}) => {
  // Estado para el hover de toda la tarjeta
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltedCard
      className="h-full"
      tiltStrength={isHovered ? 15 : 10}
      glareOpacity={isHovered ? 0.25 : 0.2}
      borderGradient={true}
      borderColor={isHovered ? "rgba(190, 143, 82, 0.5)" : "rgba(190, 143, 82, 0.3)"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="p-6 h-full flex flex-col relative overflow-hidden"
      >
        {/* Fondo decorativo */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-[#be8f52]/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.3 : 0.15
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Patrón de fondo */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none z-0" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23be8f52' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "20px 20px"
          }}
        />
        
        {/* Etiqueta de popularidad */}
        {isPopular && (
          <span className="absolute top-3 right-3 bg-[#be8f52] text-white text-xs font-medium px-2.5 py-1 rounded-full z-20">
            Popular
          </span>
        )}
        
        <motion.div 
          className="h-14 w-14 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 relative z-10 mt-3"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: '#be8f52',
            color: 'white',
            rotate: 5
          }}
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered ? "0 10px 25px -5px rgba(190, 143, 82, 0.4)" : "0 0px 0px 0px rgba(190, 143, 82, 0)"
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <motion.h3 
          className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors duration-300 relative z-10"
          animate={{ 
            color: isHovered ? '#be8f52' : '',
            x: isHovered ? 3 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-300 relative z-10 mb-4 flex-grow">{description}</p>
        
        {/* Características destacadas */}
        {features.length > 0 && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-1">
              {features.map((feature, i) => (
                <motion.li 
                  key={i} 
                  className="flex items-start text-xs text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10
                  }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <svg className="w-3 h-3 text-[#be8f52] mt-1 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {/* Contador de clientes satisfechos */}
        {clients > 0 && (
          <div className="mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">+{clients} clientes satisfechos</span>
          </div>
        )}
        
        <motion.div
          className="mt-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: isHovered ? 0 : 5,
            opacity: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.3 }}
        >
          <a 
            href={link} 
            className="inline-flex items-center text-sm font-medium text-[#be8f52] hover:text-[#a67941] transition-colors relative group"
          >
            Saber más
            <svg 
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </TiltedCard>
  );
};

const ServicesSection = () => {
  // Variantes de animación
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const services = [
    {
      title: "Tatuajes Personalizados",
      description: "Diseños únicos adaptados a tus ideas y estilo personal. Trabajamos todos los estilos de tatuaje.",
      icon: <FileStack size={24} />,
      isPopular: true,
      link: "/servicios#tatuajes",
      clients: 650,
      features: ["Diseños completamente personalizados", "Todos los estilos", "Materiales premium"]
    },
    {
      title: "Seguridad e Higiene",
      description: "Máxima seguridad e higiene con materiales esterilizados y cabinas específicas de esterilización.",
      icon: <ShieldCheck size={24} />,
      link: "/servicios#seguridad",
      clients: 1200,
      features: ["Equipos esterilizados", "Espacios certificados", "Máxima seguridad"]
    },
    {
      title: "Piercings",
      description: "Servicio de piercings profesional con joyería de alta calidad y procedimientos seguros.",
      icon: <Syringe size={24} />,
      isPopular: true,
      link: "/servicios#piercings",
      clients: 850,
      features: ["Joyería de titanio y oro", "Procedimientos seguros", "Seguimiento incluido"]
    },
    {
      title: "Micropigmentación",
      description: "Servicios de micropigmentación y microblading para cejas, labios y línea de ojos.",
      icon: <Check size={24} />,
      link: "/servicios#micropigmentacion",
      clients: 340,
      features: ["Microblading de cejas", "Labios y ojos", "Resultados naturales"]
    },
    {
      title: "Eliminación Láser",
      description: "Eliminación y corrección de tatuajes mediante tecnología láser de última generación.",
      icon: <Zap size={24} />,
      link: "/servicios#laser",
      clients: 230,
      features: ["Equipo de última generación", "Resultados garantizados", "Consulta gratuita previa"]
    },
    {
      title: "Alquiler de Cabinas",
      description: "Espacios equipados para tatuadores independientes, disponibles por días o semanas.",
      icon: <Home size={24} />,
      link: "/servicios#cabinas",
      clients: 120,
      features: ["Totalmente equipadas", "Espacios privados", "Tarifas flexibles"]
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
      {/* Fondo con olas animadas */}
      <WavesBackground 
        color="#be8f52" 
        waveCount={3} 
        waveHeight={40} 
        amplitude={15} 
        frequency={0.05} 
        speed={0.5}
        className="opacity-10"
      />
      
      <div className="container mx-auto px-4 md:px-8 py-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Servicios de nuestro <span className="text-[#be8f52]">estudio de tatuajes</span>
          </motion.h2>
          <motion.p
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          >
            En Saints & Sinners, ofrecemos una amplia gama de servicios profesionales en nuestro estudio de tatuajes en Madrid, realizados por artistas expertos con años de experiencia.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ServiceCard
                index={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                isPopular={service.isPopular}
                link={service.link}
                clients={service.clients}
                features={service.features}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-[#be8f52] to-[#be8f52]/80 rounded-xl shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}
        >
          {/* Fondo con patrón animado */}
          <motion.div 
            className="absolute inset-0 bg-black/10 opacity-20 mix-blend-overlay"
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")' 
            }}
            animate={{
              backgroundPositionX: ["0%", "100%"],
              backgroundPositionY: ["0%", "100%"]
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          />
          
          <div className="p-8 md:p-10 md:flex items-center justify-between relative z-10">
            <div>
              <motion.h3 
                className="text-2xl font-bold mb-2 text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                ¿Tienes una idea para tu próximo tatuaje?
              </motion.h3>
              <motion.p 
                className="text-white/90 text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Agenda una consulta gratuita con nuestros artistas y haz realidad tu proyecto.
              </motion.p>
            </div>
            <motion.div 
              className="mt-6 md:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/contacto" 
                className="inline-block px-8 py-4 bg-black text-white font-medium rounded-sm hover:bg-black/80 transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Contáctanos ahora</span>
                <motion.span 
                  className="absolute inset-0 bg-[#be8f52]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;