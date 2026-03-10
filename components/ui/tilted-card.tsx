"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  glareOpacity?: number;
  tiltStrength?: number;
  perspective?: number;
  borderRadius?: string;
  glarePosition?: "top" | "center";
  disableOnMobile?: boolean;
  borderColor?: string;
  borderGradient?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Inspirado en https://www.reactbits.dev/components/tilted-card
const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = "",
  glareColor = "#be8f52",
  glareOpacity = 0.4,
  tiltStrength = 50,
  perspective = 1000,
  borderRadius = "0.5rem",
  glarePosition = "top",
  disableOnMobile = true,
  borderColor = "#be8f5233",
  borderGradient = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTilting, setIsTilting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Comprobar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Valores de movimiento para la inclinación
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Aplicar spring para suavizar el movimiento
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  
  // Transformar rotación a valores de brillo y sombra
  const glareX = useTransform(smoothRotateY, [-tiltStrength, 0, tiltStrength], [-100, 0, 100]);
  const glareY = useTransform(smoothRotateX, [tiltStrength, 0, -tiltStrength], [-100, 0, 100]);
  
  // Sombra dinámica
  const shadowX = useTransform(smoothRotateY, [-tiltStrength, 0, tiltStrength], [-5, 0, 5]);
  const shadowY = useTransform(smoothRotateX, [-tiltStrength, 0, tiltStrength], [-5, 0, 5]);
  const shadow = useTransform([shadowX, shadowY], ([latestX, latestY]) => {
    return `${latestX}px ${latestY}px 10px rgba(0, 0, 0, 0.2)`;
  });
  
  // Manejador de movimiento del ratón
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disableOnMobile && isMobile) return;
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateXVal = (mouseY / (rect.height / 2)) * -tiltStrength;
      const rotateYVal = (mouseX / (rect.width / 2)) * tiltStrength;
      
      rotateX.set(rotateXVal);
      rotateY.set(rotateYVal);
    }
  };
  
  // Manejador de salida del ratón
  const handleMouseLeave = () => {
    if (disableOnMobile && isMobile) return;
    
    rotateX.set(0);
    rotateY.set(0);
    setIsTilting(false);
    
    // Llamar al callback externo si existe
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  // Manejar entrada del ratón 
  const handleMouseEnter = () => {
    if (disableOnMobile && isMobile) return;
    setIsTilting(true);
    
    // Llamar al callback externo si existe
    if (onMouseEnter) {
      onMouseEnter();
    }
  };
  
  // Glare style (efecto brillante)
  const glareStyle = {
    background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, ${glareColor} 0%, transparent 80%)`,
    top: glarePosition === "top" ? "-50%" : "0%",
    height: glarePosition === "top" ? "200%" : "100%",
    opacity: isTilting ? glareOpacity : 0,
  };
  
  // Borde con gradiente
  const getBorderStyle = () => {
    if (!borderGradient) {
      return { border: `1px solid ${borderColor}` };
    }
    
    return {
      position: "relative",
      "&::before": {
        content: "''",
        position: "absolute",
        inset: 0,
        padding: "1px",
        borderRadius,
        background: `linear-gradient(45deg, ${borderColor}, transparent)`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
      },
    };
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: disableOnMobile && isMobile ? "" : [
          `perspective(${perspective}px)`,
          `rotateX(${smoothRotateX}deg)`,
          `rotateY(${smoothRotateY}deg)`,
        ].join(" "),
        borderRadius,
        boxShadow: disableOnMobile && isMobile ? "" : shadow,
        transition: "box-shadow 0.3s ease",
        border: !borderGradient ? `1px solid ${borderColor}` : "none",
      }}
    >
      {/* Capa de brillo */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          ...glareStyle,
          pointerEvents: "none",
        }}
      />
      
      {/* Borde con gradiente si está activado */}
      {borderGradient && (
        <div
          className="absolute inset-0 z-0"
          style={{
            borderRadius,
            background: `linear-gradient(45deg, ${borderColor}, transparent 60%)`,
            opacity: isTilting ? 1 : 0.6,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
      
      {/* Contenido */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export default TiltedCard; 