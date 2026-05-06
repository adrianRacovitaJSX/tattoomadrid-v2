"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CONTACT_FAQS } from '@/lib/faqs';

const FaqSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = CONTACT_FAQS;
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Preguntas Frecuentes</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestros servicios y el proceso de contacto
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-950 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                    expandedIndex === index ? 'transform rotate-180 text-[#be8f52]' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600 dark:text-gray-300">
            ¿Tienes más preguntas?
          </p>
          <Link href="/contacto?subject=Pregunta adicional" className="text-[#be8f52] font-medium hover:underline inline-flex items-center mt-2">
            Escríbenos directamente
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection; 