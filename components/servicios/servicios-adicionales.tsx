"use client";

import React from 'react';
import { Syringe, Check, Zap, FileText } from 'lucide-react';

const ServiciosAdicionalesSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Servicios Adicionales</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Además de tatuajes personalizados, ofrecemos una variedad de servicios complementarios para satisfacer todas tus necesidades de arte corporal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Piercings */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800 group hover:border-[#be8f52]/30 transition-all duration-300">
            <div className="h-12 w-12 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#be8f52] group-hover:text-white transition-all duration-300">
              <Syringe size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">Piercings</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Servicio profesional de piercings con joyería de alta calidad y procedimientos seguros.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Piercings faciales y corporales</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Joyería de titanio y acero quirúrgico</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Seguimiento post-piercing</span>
              </li>
            </ul>
          </div>
          
          {/* Micropigmentación */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800 group hover:border-[#be8f52]/30 transition-all duration-300">
            <div className="h-12 w-12 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#be8f52] group-hover:text-white transition-all duration-300">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">Micropigmentación</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Servicios de micropigmentación y microblading para realzar tu belleza natural.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Microblading de cejas</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Delineado permanente de ojos</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Labios y correcciones</span>
              </li>
            </ul>
          </div>
          
          {/* Eliminación Láser */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800 group hover:border-[#be8f52]/30 transition-all duration-300">
            <div className="h-12 w-12 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#be8f52] group-hover:text-white transition-all duration-300">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">Eliminación Láser</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Eliminación y aclarado de tatuajes con tecnología láser de última generación.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Eliminación completa</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Aclarado para coberturas</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Tratamientos personalizados</span>
              </li>
            </ul>
          </div>
          
          {/* Diseños Personalizados */}
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800 group hover:border-[#be8f52]/30 transition-all duration-300">
            <div className="h-12 w-12 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#be8f52] group-hover:text-white transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">Diseños Personalizados</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Diseños exclusivos creados por nuestros artistas para tu próximo tatuaje.</p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Bocetos personalizados</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Adaptación de diseños</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                <span>Consultoría artística</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiciosAdicionalesSection; 