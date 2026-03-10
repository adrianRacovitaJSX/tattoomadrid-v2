"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  springStrength?: number;
  springDamping?: number;
  onClick?: () => void;
}

// Inspirado en https://www.reactbits.dev/components/magnetic-button
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  magneticStrength = 50,
  springStrength = 300,
  springDamping = 30,
  onClick,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMagnetic, setIsMagnetic] = useState(true);
  
  // Valores de motion para magnetismo
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring para animación suave
  const springX = useSpring(x, { stiffness: springStrength, damping: springDamping });
  const springY = useSpring(y, { stiffness: springStrength, damping: springDamping });
  
  // Detectar si el dispositivo es táctil
  React.useEffect(() => {
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    
    setIsMagnetic(!isTouchDevice());
  }, []);
  
  // Manejar movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnetic || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Calcular el centro del botón
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcular la posición del mouse relativa al centro
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calcular la distancia del mouse al centro
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    // Calcular el radio de atracción (puede ser un poco mayor que el tamaño del botón)
    const attractRadius = Math.max(rect.width, rect.height) * 1.5;
    
    if (distance < attractRadius) {
      // Calcular la fuerza de atracción basada en la distancia
      const strength = (magneticStrength / 100) * (1 - distance / attractRadius);
      
      // Aplicar el desplazamiento
      x.set(mouseX * strength);
      y.set(mouseY * strength);
    } else {
      // Fuera del radio de atracción, volver a la posición original
      x.set(0);
      y.set(0);
    }
  };
  
  // Manejar salida del mouse
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={buttonRef}
      className={`relative inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton; 