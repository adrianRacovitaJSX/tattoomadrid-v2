"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Users, Calendar, Layout } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ShinyText from '@/components/ui/shiny-text';

interface StatProps {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const CountUpAnimation: React.FC<{ targetValue: number, duration: number, prefix?: string, suffix?: string }> = ({ 
  targetValue, 
  duration, 
  prefix = "", 
  suffix = "" 
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * targetValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, targetValue, duration]);
  
  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

const StatCard: React.FC<StatProps> = ({ value, label, description, icon, color }) => {
  // Extraer el valor numérico para la animación
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const suffix = value.includes('+') ? '+' : '';
  
  // Efecto de hover para la tarjeta
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg border border-transparent dark:border-zinc-800 bg-white dark:bg-zinc-900/70 backdrop-blur-sm`}
      initial={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}
      whileHover={{ 
        boxShadow: `0 8px 16px rgba(190, 143, 82, 0.15)`,
        borderColor: `${color}40`,
        y: -5
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Fondo decorativo */}
      <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full blur-3xl opacity-10" style={{ background: color }}></div>
      
      {/* Icono con animación */}
      <div className="flex items-center mb-6">
        <div 
          className="p-3 rounded-lg mr-4" 
          style={{ background: `${color}20`, color: color }}
        >
          <motion.div
            animate={{ rotate: isHovered ? [0, 15, 0] : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <CountUpAnimation targetValue={numericValue} duration={2000} suffix={suffix} />
          </h3>
          <p className="font-medium text-[#be8f52] uppercase tracking-wider text-xs">{label}</p>
        </div>
      </div>
      
      {/* Descripción */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">{description}</p>
      
      {/* Borde inferior con gradiente */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 w-0" 
        style={{ background: `linear-gradient(to right, ${color}60, ${color}20)` }}
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      value: "8000+",
      label: "Tatuajes realizados",
      description: "Miles de diseños únicos creados por nuestros artistas, cada uno con su propia historia y significado.",
      icon: <Sparkles size={24} />,
      color: "#be8f52"
    },
    {
      value: "4",
      label: "Artistas tatuadores",
      description: "Un equipo de talentosos artistas especializados en diferentes estilos y técnicas de tatuaje.",
      icon: <Users size={24} />,
      color: "#d3a265"
    },
    {
      value: "4",
      label: "Salas especializadas",
      description: "Espacios de trabajo diseñados para brindar comodidad, privacidad y las mejores condiciones de higiene.",
      icon: <Layout size={24} />,
      color: "#c79955"
    },
    {
      value: "15",
      label: "Años de experiencia",
      description: "Más de una década perfeccionando nuestro arte y estableciendo un estándar de excelencia en Madrid.",
      icon: <Calendar size={24} />,
      color: "#be8f52"
    }
  ];
  
  // Animación de parallax al hacer scroll
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  
  // Contadores para el efecto visual
  const dotCounts = Array.from({ length: 50 });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-950/80 relative overflow-hidden">
      {/* Fondo de puntos con efecto 3D */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-25 dark:opacity-20" 
          style={{ y }}
        >
          {dotCounts.map((_, i) => (
            <div 
              key={i} 
              className="absolute w-1.5 h-1.5 rounded-full bg-[#be8f52]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Efecto de gradiente */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#be8f52]/20 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#be8f52]/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16" direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Nuestra trayectoria en <ShinyText text="números" />
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
            Años de dedicación y pasión por el arte del tatuaje
          </p>
          <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-[#be8f52]/30 via-[#be8f52] to-[#be8f52]/30"></div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              direction="up"
            >
              <StatCard
                value={stat.value}
                label={stat.label}
                description={stat.description}
                icon={stat.icon}
                color={stat.color}
              />
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal direction="up" delay={0.4} className="mt-16 text-center">
          <p className="inline-block px-6 py-3 bg-[#be8f52]/10 text-[#be8f52] rounded-lg text-sm font-medium">
            Más de 5.000 clientes satisfechos nos avalan
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default StatsSection;