"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  slideWidth?: number | string;
  gap?: number;
  effect?: "slide" | "fade" | "zoom" | "flip";
}

// Inspirado en https://www.reactbits.dev/components/carousel
const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  infiniteLoop = true,
  className = "",
  slideWidth = "100%",
  gap = 16,
  effect = "slide",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Valores de motion para deslizamiento
  const x = useMotionValue(0);
  const dragX = useMotionValue(0);
  
  // Reiniciar el temporizador de autoplay
  const resetAutoPlayTimer = () => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
    }
    
    if (autoPlay) {
      autoPlayTimerRef.current = setTimeout(() => {
        handleNext();
      }, interval);
    }
  };
  
  // Efecto para autoplay
  useEffect(() => {
    resetAutoPlayTimer();
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [currentIndex, autoPlay]);
  
  // Ir a la diapositiva anterior
  const handlePrev = () => {
    if (currentIndex === 0) {
      if (infiniteLoop) {
        setCurrentIndex(items.length - 1);
      }
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
    resetAutoPlayTimer();
  };
  
  // Ir a la diapositiva siguiente
  const handleNext = () => {
    if (currentIndex === items.length - 1) {
      if (infiniteLoop) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    resetAutoPlayTimer();
  };
  
  // Ir a una diapositiva específica
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlayTimer();
  };
  
  // Manejar deslizamiento
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const threshold = 50;
    if (info.offset.x > threshold) {
      handlePrev();
    } else if (info.offset.x < -threshold) {
      handleNext();
    }
    
    resetAutoPlayTimer();
  };
  
  // Obtener variantes según el efecto
  const getVariants = () => {
    switch (effect) {
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1, transition: { duration: 0.5 } },
          exit: { opacity: 0, transition: { duration: 0.3 } },
        };
      case "zoom":
        return {
          enter: { opacity: 0, scale: 0.8 },
          center: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          exit: { opacity: 0, scale: 1.2, transition: { duration: 0.3 } },
        };
      case "flip":
        return {
          enter: { opacity: 0, rotateY: 90 },
          center: { opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
          exit: { opacity: 0, rotateY: -90, transition: { duration: 0.3 } },
        };
      default: // "slide"
        return {
          enter: (direction: number) => ({ 
            x: direction > 0 ? "100%" : "-100%", 
            opacity: 0 
          }),
          center: { 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          },
          exit: (direction: number) => ({ 
            x: direction > 0 ? "-100%" : "100%", 
            opacity: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }),
        };
    }
  };
  
  // Dirección de la animación (para slide)
  const [[page, direction], setPage] = useState([currentIndex, 0]);
  
  // Actualizar página cuando cambia currentIndex
  useEffect(() => {
    const newDirection = currentIndex > page ? 1 : -1;
    setPage([currentIndex, newDirection]);
  }, [currentIndex]);
  
  const variants = getVariants();

  return (
    <div className={`relative overflow-hidden ${className}`} ref={containerRef}>
      <div 
        className="relative w-full h-full"
        style={{ 
          perspective: effect === "flip" ? "1000px" : undefined,
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ 
              width: slideWidth,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            drag={effect === "slide" ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {showArrows && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            onClick={handlePrev}
            disabled={!infiniteLoop && currentIndex === 0}
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            onClick={handleNext}
            disabled={!infiniteLoop && currentIndex === items.length - 1}
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      
      {showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                ? "bg-white w-5" 
                : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel; 