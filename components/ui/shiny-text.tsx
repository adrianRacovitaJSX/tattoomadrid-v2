"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
  glowColor?: string;
  baseColor?: string;
  highlightColor?: string;
  highlightWidth?: number;
  speed?: number;
  autoplay?: boolean;
  children?: React.ReactNode;
}

// Inspirado en https://www.reactbits.dev/text-animations/shiny-text
const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className = "",
  glowColor = "rgba(190, 143, 82, 0.6)",
  baseColor = "#ffffff",
  highlightColor = "#be8f52",
  highlightWidth = 5,
  speed = 3,
  autoplay = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayPosition, setAutoplayPosition] = useState(-highlightWidth * 2);
  
  // Actualizar dimensiones cuando cambia el tamaño de la ventana
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          left: rect.left,
          top: rect.top,
        });
      }
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  
  // Manejar autoplay
  useEffect(() => {
    if (!autoplay || isHovered) return;
    
    const interval = setInterval(() => {
      setAutoplayPosition((prev) => {
        const newPosition = prev + 1;
        return newPosition > dimensions.width + highlightWidth * 2 
          ? -highlightWidth * 2 
          : newPosition;
      });
    }, 1000 / 60 * (4 - Math.min(speed, 4)));
    
    return () => clearInterval(interval);
  }, [autoplay, dimensions.width, highlightWidth, isHovered, speed]);
  
  // Manejar movimiento del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  // Gradient para el texto
  const gradientStyle = {
    backgroundImage: isHovered || !autoplay
      ? `linear-gradient(
          90deg, 
          ${baseColor} 0%, 
          ${baseColor} ${Math.max(0, (mousePosition.x / dimensions.width) * 100 - highlightWidth)}%, 
          ${highlightColor} ${(mousePosition.x / dimensions.width) * 100}%, 
          ${baseColor} ${Math.min(100, (mousePosition.x / dimensions.width) * 100 + highlightWidth)}%, 
          ${baseColor} 100%)`
      : `linear-gradient(
          90deg, 
          ${baseColor} 0%, 
          ${baseColor} ${Math.max(0, (autoplayPosition / dimensions.width) * 100 - highlightWidth)}%, 
          ${highlightColor} ${(autoplayPosition / dimensions.width) * 100}%, 
          ${baseColor} ${Math.min(100, (autoplayPosition / dimensions.width) * 100 + highlightWidth)}%, 
          ${baseColor} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block", 
    width: "100%",
    textShadow: `0 0 8px ${glowColor}`,
  };

  return (
    <motion.div
      ref={containerRef}
      className={`inline-block relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children ? (
        <div className="inline-block" style={gradientStyle}>
          {children}
        </div>
      ) : (
        <span className="inline-block" style={gradientStyle}>
          {text}
        </span>
      )}
    </motion.div>
  );
};

export default ShinyText; 