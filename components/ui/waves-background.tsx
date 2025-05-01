"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface WavesBackgroundProps {
  color?: string;
  waveCount?: number;
  waveHeight?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  className?: string;
  withGradient?: boolean;
}

// Inspirado en https://www.reactbits.dev/backgrounds/waves
const WavesBackground: React.FC<WavesBackgroundProps> = ({
  color = "#be8f52",
  waveCount = 3,
  waveHeight = 20,
  amplitude = 20,
  frequency = 0.1,
  speed = 1,
  className = "",
  withGradient = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  
  // Función para crear una onda
  const drawWave = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    phase: number,
    waveIndex: number
  ) => {
    ctx.beginPath();
    
    // Opciones específicas para cada onda
    const waveOptions = {
      0: { opacity: 0.2, amp: amplitude * 1.0, freq: frequency * 1.0, speed: speed * 1.0 },
      1: { opacity: 0.3, amp: amplitude * 0.8, freq: frequency * 1.2, speed: speed * 0.7 },
      2: { opacity: 0.4, amp: amplitude * 0.6, freq: frequency * 0.8, speed: speed * 1.3 },
      3: { opacity: 0.5, amp: amplitude * 0.4, freq: frequency * 0.5, speed: speed * 0.9 },
      4: { opacity: 0.6, amp: amplitude * 0.3, freq: frequency * 1.5, speed: speed * 1.1 },
    };
    
    const options = waveOptions[waveIndex as keyof typeof waveOptions] || 
                   { opacity: 0.2, amp: amplitude * (1 - waveIndex * 0.2), freq: frequency, speed };
    
    // Color con opacidad
    const rgbaColor = hexToRgba(color, options.opacity);
    ctx.strokeStyle = rgbaColor;
    ctx.lineWidth = 2;
    
    // Posición Y donde dibujar la onda
    const y = height - (waveHeight * (waveIndex + 1));
    
    // Dibujar la onda
    ctx.moveTo(0, y);
    
    for (let x = 0; x < width; x++) {
      // Calcular la altura de la onda en este punto
      const waveY = Math.sin(x * options.freq + phase * options.speed) * options.amp;
      ctx.lineTo(x, y + waveY);
    }
    
    ctx.stroke();
    
    // Si es la primera onda, rellenar el área debajo
    if (waveIndex === 0) {
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      if (withGradient) {
        // Crear un degradado
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, hexToRgba(color, 0.1));
        gradient.addColorStop(1, hexToRgba(color, 0.01));
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = hexToRgba(color, 0.05);
      }
      
      ctx.fill();
    }
  };
  
  // Convertir color hex a rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const formattedHex = hex.replace(
      shorthandRegex,
      (_, r, g, b) => r + r + g + g + b + b
    );
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
    if (!result) return `rgba(0, 0, 0, ${alpha})`;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Animar las ondas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const handleResize = () => {
      if (!canvas) return;
      
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Función de animación
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Incrementar la fase para animar las ondas
      phaseRef.current += 0.05;
      
      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar cada onda
      for (let i = Math.min(waveCount, 5) - 1; i >= 0; i--) {
        drawWave(ctx, canvas.width, canvas.height, phaseRef.current, i);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, waveCount, waveHeight, amplitude, frequency, speed, withGradient]);
  
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default WavesBackground; 