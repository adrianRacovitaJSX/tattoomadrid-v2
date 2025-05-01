"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CircularTextProps {
  text: string;
  diameter?: number;
  fontSize?: number;
  startAngle?: number;
  className?: string;
  textColor?: string;
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
  animate?: boolean;
  children?: React.ReactNode;
}

// Inspirado en https://www.reactbits.dev/text-animations/circular-text
const CircularText: React.FC<CircularTextProps> = ({
  text,
  diameter = 200,
  fontSize = 16,
  startAngle = 0,
  className = "",
  textColor = "#be8f52",
  duration = 20,
  direction = "clockwise",
  animate = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(startAngle);
  
  // Calcular las propiedades de cada carácter
  const characters = text.split("");
  const anglePerCharacter = 360 / text.length;
  const radius = diameter / 2;
  
  // Animación giratoria
  useEffect(() => {
    if (!animate) return;
    
    const rotationSpeed = direction === "clockwise" ? 1 : -1;
    const interval = setInterval(() => {
      setRotation(prev => (prev + rotationSpeed) % 360);
    }, 1000 / 60); // ~60fps
    
    return () => clearInterval(interval);
  }, [animate, direction]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: `${diameter}px`, 
        height: `${diameter}px`,
      }}
    >
      {/* Contenedor para el contenido central */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
      
      {/* Texto circular */}
      {characters.map((char, i) => {
        // Calcular ángulo para cada carácter
        const angle = i * anglePerCharacter + rotation;
        // Convertir ángulo a radianes
        const angleInRadians = (angle * Math.PI) / 180;
        // Calcular posición
        const x = radius + radius * Math.sin(angleInRadians);
        const y = radius - radius * Math.cos(angleInRadians);
        
        return (
          <div 
            key={`${char}-${i}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: `${x}px`, 
              top: `${y}px`, 
              fontSize: `${fontSize}px`,
              color: textColor,
              transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
            }}
          >
            {char}
          </div>
        );
      })}
      
      {/* Anillo opcional */}
      <motion.div 
        className="absolute inset-0 rounded-full border border-current opacity-20"
        style={{ borderColor: textColor }}
        animate={animate ? { 
          rotate: [0, direction === "clockwise" ? 360 : -360]
        } : undefined}
        transition={{ 
          repeat: Infinity, 
          duration, 
          ease: "linear"
        }}
      />
    </div>
  );
};

export default CircularText; 