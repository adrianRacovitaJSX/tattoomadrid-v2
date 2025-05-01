"use client";

import React from 'react';
import { Phone, Mail, MapPin, Clock, Send, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-950/80 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#be8f52]/30 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#be8f52]/20 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reserva tu cita</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Estamos listos para hacer realidad tu próximo proyecto de tatuaje</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-zinc-800 relative overflow-hidden group">
            {/* Decoración */}
            <div className="absolute top-0 right-0 h-24 w-24 bg-[#be8f52]/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Información de contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mr-4">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Teléfono</h4>
                  <a href="tel:+34603211318" className="text-gray-600 dark:text-gray-300 hover:text-[#be8f52] dark:hover:text-[#be8f52] transition-colors">
                    +34 603 21 13 18
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mr-4">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:snstattoomadrid@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-[#be8f52] dark:hover:text-[#be8f52] transition-colors">
                    snstattoomadrid@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mr-4">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Dirección</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    C. de los Hermanos Gómez, 5, Cdad. Lineal, 28017 Madrid, España
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mr-4">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Horario</h4>
                  <div className="text-gray-600 dark:text-gray-300">
                    <p className="mb-0.5">Lunes a Sábado: 11:00 - 14:00, 15:00 - 20:00</p>
                    <p className="mb-0.5">Domingo: Cita previa</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social media */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/saintsandsinnersmadrid/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-[#be8f52] hover:text-white dark:hover:bg-[#be8f52] dark:hover:text-white transition-colors rounded-lg flex items-center justify-center"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.tiktok.com/@saintsandsinnersbygamboa" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-[#be8f52] hover:text-white dark:hover:bg-[#be8f52] dark:hover:text-white transition-colors rounded-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Envíanos un mensaje</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#be8f52] focus:border-[#be8f52] dark:focus:ring-[#be8f52] dark:focus:border-[#be8f52] outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#be8f52] focus:border-[#be8f52] dark:focus:ring-[#be8f52] dark:focus:border-[#be8f52] outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#be8f52] focus:border-[#be8f52] dark:focus:ring-[#be8f52] dark:focus:border-[#be8f52] outline-none transition-colors"
                  placeholder="+34 XXX XX XX XX"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Servicio de interés
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#be8f52] focus:border-[#be8f52] dark:focus:ring-[#be8f52] dark:focus:border-[#be8f52] outline-none transition-colors"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="tattoo">Tatuaje</option>
                  <option value="piercing">Piercing</option>
                  <option value="micropigmentation">Micropigmentación</option>
                  <option value="microblading">Microblading</option>
                  <option value="tattoo-removal">Eliminación de tatuajes</option>
                  <option value="booth-rental">Alquiler de cabina</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#be8f52] focus:border-[#be8f52] dark:focus:ring-[#be8f52] dark:focus:border-[#be8f52] outline-none transition-colors"
                  placeholder="Cuéntanos sobre tu proyecto..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#be8f52] hover:bg-[#be8f52]/90 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
        
        {/* Google Maps embed */}
        <div className="mt-16 rounded-xl overflow-hidden shadow-lg h-96 relative border border-gray-100 dark:border-zinc-800">
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
      </div>
    </section>
  );
};

export default ContactSection;