"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  highlightColor?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  onComplete?: () => void;
  triggerOnce?: boolean;
  animated?: boolean;
}

// Inspirado en https://www.reactbits.dev/text-animations/split-text
const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  highlightColor = "#be8f52",
  delay = 0.2,
  duration = 0.5,
  stagger = 0.02,
  onComplete,
  triggerOnce = true,
  animated = true,
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  // Variantes para cada carácter
  const letterVariants: Variants = {
    hidden: { 
      y: "120%", 
      opacity: 0,
      rotateX: "40deg",
      transition: { duration: 0, ease: "easeInOut" }
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: "0deg",
      transition: {
        delay: delay + i * stagger,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    highlight: (i: number) => ({
      color: highlightColor,
      transition: {
        delay: delay + i * stagger + 0.2,
        duration: 0.3,
      },
    }),
  };

  // Detectar cuándo el componente está en viewport
  useEffect(() => {
    if (!animated) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible")
              .then(() => {
                if (onComplete) onComplete();
              });
            if (triggerOnce) observer.disconnect();
          } else if (!triggerOnce) {
            controls.start("hidden");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [controls, onComplete, triggerOnce, animated]);

  // Dividir el texto en caracteres para animar individualmente
  const letters = text.split("");

  return (
    <div ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <div className="flex flex-wrap">
        {letters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            custom={index}
            variants={letterVariants}
            initial={animated ? "hidden" : "visible"}
            animate={controls}
            style={{ display: "inline-block" }}
            className={char === " " ? "w-[0.25em]" : ""}
          >
            {char !== " " ? char : "\u00A0"}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default SplitText; 