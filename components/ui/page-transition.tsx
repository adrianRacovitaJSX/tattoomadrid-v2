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
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname || "page"}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
      
      {/* Overlay de transición como componente separado para evitar rerenderizaciones */}
      <motion.div
        className="fixed inset-0 z-50 bg-zinc-950 pointer-events-none"
        key="overlay"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </AnimatePresence>
  );
};

export default PageTransition; 