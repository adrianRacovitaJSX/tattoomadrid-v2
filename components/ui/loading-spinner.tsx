"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  // Tamaños del spinner
  const sizeMap = {
    sm: {
      container: 'w-8 h-8',
      circle: 'w-8 h-8',
      stroke: 2
    },
    md: {
      container: 'w-12 h-12',
      circle: 'w-12 h-12',
      stroke: 3
    },
    lg: {
      container: 'w-16 h-16',
      circle: 'w-16 h-16',
      stroke: 4
    }
  };

  const currentSize = sizeMap[size];

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${currentSize.container}`}>
        {/* Círculo base (estático) */}
        <svg
          className={`${currentSize.circle} opacity-25`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#be8f52"
            strokeWidth={currentSize.stroke}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Círculo giratorio animado */}
        <svg
          className={`absolute top-0 left-0 ${currentSize.circle} animate-spin-slow`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke="#be8f52"
            strokeWidth={currentSize.stroke}
            strokeLinecap="round"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={circleVariants}
            strokeDasharray="0 1"
          />
        </svg>
        
        {/* Elemento decorativo central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-2 h-2 bg-[#be8f52] rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 