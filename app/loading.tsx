import React from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[#be8f52] font-medium animate-pulse">
          Cargando...
        </p>
      </div>
    </div>
  );
} 