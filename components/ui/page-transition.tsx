"use client";

import React, { useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Llevar el scroll arriba cuando se cambia de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // Variantes para la animación de transición
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 50
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };
  
  return (
    // initial={false}: en el primer mount los hijos van directo a su estado
    // "animate" sin pasar por "initial". Evita que en móvil (o con animaciones
    // pausadas) el overlay scaleY=1 se quede cubriendo el contenido y el
    // motion.div interno se quede en opacity 0.
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname || "page"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>

      <motion.div
        className="fixed inset-0 z-50 bg-zinc-950 pointer-events-none"
        key="overlay"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        style={{ transformOrigin: 'top' }}
      />
    </AnimatePresence>
  );
};

export default PageTransition; 