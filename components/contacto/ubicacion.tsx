"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';

const UbicacionSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Ubicación</h2>
          
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 md:p-8">
            <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.1970518777267!2d-3.7028442233833847!3d40.40528847936515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422630e6a028b1%3A0xba2b92aed03bf94e!2sCalle%20de%20los%20Hermanos%20G%C3%B3mez%2C%205%2C%20Madrid!5e0!3m2!1ses!2ses!4v1691851234567!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Mapa de ubicación"
              ></iframe>
            </div>
            
            <div className="flex items-center justify-between">
              <a
                href="https://maps.google.com/?q=Calle+de+los+Hermanos+Gómez+5+Madrid+España"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#be8f52] hover:underline"
              >
                Cómo llegar
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Estamos ubicados en una zona bien comunicada de Madrid, con fácil acceso mediante transporte público.<br />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UbicacionSection; 