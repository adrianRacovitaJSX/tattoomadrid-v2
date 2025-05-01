"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTitleProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'light';
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  title,
  highlight,
  subtitle,
  center = false,
  className = '',
  size = 'md',
  color = 'default'
}) => {
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const lineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Configuraciones de tamaño
  const sizeClasses = {
    sm: {
      titleSize: "text-2xl md:text-3xl",
      subtitleSize: "text-sm md:text-base",
      lineHeight: "h-0.5",
      lineWidth: "w-16",
      marginBottom: "mb-2"
    },
    md: {
      titleSize: "text-3xl md:text-4xl",
      subtitleSize: "text-base md:text-lg",
      lineHeight: "h-1",
      lineWidth: "w-20",
      marginBottom: "mb-3"
    },
    lg: {
      titleSize: "text-4xl md:text-5xl",
      subtitleSize: "text-lg md:text-xl",
      lineHeight: "h-1",
      lineWidth: "w-24",
      marginBottom: "mb-4"
    },
    xl: {
      titleSize: "text-5xl md:text-6xl",
      subtitleSize: "text-xl md:text-2xl",
      lineHeight: "h-1.5",
      lineWidth: "w-28",
      marginBottom: "mb-5"
    }
  };
  
  // Configuraciones de color
  const colorClasses = {
    default: {
      title: "text-gray-900 dark:text-white",
      highlight: "text-[#be8f52]",
      subtitle: "text-gray-600 dark:text-gray-300",
      line: "bg-[#be8f52]"
    },
    light: {
      title: "text-white",
      highlight: "text-[#be8f52]",
      subtitle: "text-gray-200",
      line: "bg-[#be8f52]"
    }
  };
  
  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];
  
  // Título con segmentos resaltados
  const renderTitle = () => {
    if (!highlight) return <span className={currentColor.title}>{title}</span>;
    
    // Si hay una parte a resaltar, dividimos el texto
    const parts = title.split(highlight);
    
    return (
      <>
        <span className={currentColor.title}>{parts[0]}</span>
        <span className={currentColor.highlight}>{highlight}</span>
        {parts[1] && <span className={currentColor.title}>{parts[1]}</span>}
      </>
    );
  };
  
  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      <motion.h2 
        className={`font-bold ${currentSize.titleSize} tracking-tight`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={titleVariants}
      >
        {renderTitle()}
      </motion.h2>
      
      <motion.div 
        className={`${currentSize.lineHeight} ${currentSize.lineWidth} ${currentColor.line} ${center ? 'mx-auto' : ''} ${currentSize.marginBottom}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={lineVariants}
      />
      
      {subtitle && (
        <motion.p 
          className={`${currentSize.subtitleSize} ${currentColor.subtitle}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default AnimatedTitle; 