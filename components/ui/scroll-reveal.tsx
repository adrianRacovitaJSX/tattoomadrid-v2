"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  duration?: number;
  delay?: number;
  animate?: boolean;
  distance?: number;
  staggerChildren?: boolean;
  staggerAmount?: number;
  className?: string;
  once?: boolean;
}

// Inspirado en https://www.reactbits.dev/text-animations/scroll-reveal
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  threshold = 0,
  duration = 0.7,
  delay = 0,
  animate = true,
  distance = 50,
  staggerChildren = false,
  staggerAmount = 0.1,
  className = "",
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  // Failsafe: si en el primer paint el elemento ya está dentro del viewport,
  // forzamos visible aunque el IntersectionObserver tarde en disparar.
  // Sin esto, en móvil (especialmente Safari iOS) el initial fire puede
  // quedarse colgado en isInView=false y el contenido nunca aparece.
  const [forcedVisible, setForcedVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const vh =
      typeof window !== "undefined" ? window.innerHeight : 0;
    if (rect.top < vh && rect.bottom > 0) {
      setForcedVisible(true);
    }
  }, []);

  // Determinar las propiedades iniciales basadas en la dirección
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  // Variantes para la animación
  const variants = {
    hidden: getInitialProps(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
        staggerChildren: staggerChildren ? staggerAmount : 0,
      },
    },
  };

  // Variantes para elementos hijo cuando se usa escalonamiento
  const childVariants = {
    hidden: getInitialProps(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        ease: "easeOut" as const,
      },
    },
  };

  // Wrap children with motion if staggerChildren is true
  const renderChildren = () => {
    if (!staggerChildren) {
      return children;
    }

    // Si children es un array, aplicar variantes a cada elemento
    if (React.Children.count(children) > 1) {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div variants={childVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      });
    }

    // Si es un solo elemento y es un string, dividirlo en palabras para un efecto más interesante
    if (typeof children === "string") {
      return children.split(" ").map((word, i) => (
        <motion.span key={i} variants={childVariants} className="inline-block mx-[0.15em]">
          {word}
        </motion.span>
      ));
    }

    return children;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={animate && (isInView || forcedVisible) ? "visible" : "hidden"}
      variants={variants}
    >
      {renderChildren()}
    </motion.div>
  );
};

export default ScrollReveal; 