"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticlesBackgroundProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  className?: string;
  showGradient?: boolean;
}

// Inspirado en https://www.reactbits.dev/backgrounds/particles
const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  count = 30,
  color = "#be8f52",
  minSize = 2,
  maxSize = 8,
  speed = 0.7,
  className = "",
  showGradient = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>(0);
  const rgbColorRef = useRef(hexToRgb(color));

  // Convertir color hex a rgb
  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(
      shorthandRegex,
      (_, r, g, b) => r + r + g + g + b + b
    );
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  // Crear una partícula con propiedades aleatorias
  const createParticle = useCallback((width: number, height: number): Particle => {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const opacity = Math.random() * 0.5 + 0.2;
    const rgbColor = rgbColorRef.current;
    
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      speedX: (Math.random() - 0.5) * speed,
      speedY: (Math.random() - 0.5) * speed,
      color: `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`,
      opacity,
    };
  }, [minSize, maxSize, speed]);

  // Inicializar partículas
  useEffect(() => {
    if (!canvasRef.current) return;
    rgbColorRef.current = hexToRgb(color);

    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        
        canvas.width = width;
        canvas.height = height;
        
        setDimensions({ width, height });
        
        // Reiniciar partículas al redimensionar
        particlesRef.current = Array.from({ length: count }, () => createParticle(width, height));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count, color, createParticle]);

  // Dibujar y animar partículas sin usar setState para evitar bucles infinitos
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Asegurarnos de que tenemos partículas para dibujar
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from(
        { length: count }, 
        () => createParticle(dimensions.width, dimensions.height)
      );
    }
    
    const rgbColor = rgbColorRef.current;
    
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Dibujar partículas
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Actualizar posición (sin usar setState)
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
        
        // Mantener dentro de los límites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });
      
      // Conectar partículas cercanas con líneas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 0.15 * (1 - distance / 100);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions, count, createParticle]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10" />
      )}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default ParticlesBackground; 