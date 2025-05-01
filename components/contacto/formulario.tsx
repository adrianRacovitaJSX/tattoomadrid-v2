"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Phone, Mail, Clock, Instagram, 
  Send, CheckCircle, AlertCircle
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const FormularioSection = () => {
  const searchParams = useSearchParams();
  const artistParam = searchParams.get('artist');
  const subjectParam = searchParams.get('subject');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: subjectParam || '',
    artist: artistParam || '',
    message: '',
    acceptTerms: false
  });
  
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

  // Artistas para el formulario de cita
  const artists = [
    { id: 'gamboa', name: 'Gamboa The Goat', specialty: 'Realismo y Blackwork' },
    { id: 'edward', name: 'Edward Ortiz', specialty: 'Neotradicional y Color' },
    { id: 'airon', name: 'Airon Broncano', specialty: 'Japonés y Geométrico' },
    { id: 'guzman', name: 'Guzmán El Malo', specialty: 'Old School y Fine Line' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      // Aquí iría la lógica para enviar el formulario a tu backend
      // Por ahora simulamos una petición exitosa con un timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        artist: '',
        message: '',
        acceptTerms: false
      });
    } catch (error) {
      setFormStatus('error');
    } finally {
      setSending(false);
      
      // Resetear el estado del formulario después de 5 segundos
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 md:p-8">
            {/* Form Status */}
            {formStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                formStatus === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
              }`}>
                <div className="flex items-start">
                  {formStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-medium">
                      {formStatus === 'success' ? '¡Mensaje enviado!' : 'Error al enviar'}
                    </h3>
                    <p className="text-sm mt-1">
                      {formStatus === 'success' 
                        ? 'Hemos recibido tu mensaje correctamente. Nos pondremos en contacto contigo lo antes posible.' 
                        : 'Ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos directamente por teléfono.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors"
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
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors"
                    placeholder="Tu email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Teléfono <span className="text-gray-500 dark:text-gray-400">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors"
                    placeholder="Tu teléfono"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors"
                    placeholder="Asunto del mensaje"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="artist" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Artista <span className="text-gray-500 dark:text-gray-400">(opcional)</span>
                </label>
                <select
                  id="artist"
                  name="artist"
                  value={formData.artist}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors"
                >
                  <option value="">Selecciona un artista (opcional)</option>
                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name} - {artist.specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#be8f52]/50 focus:border-[#be8f52] outline-none transition-colors resize-none"
                  placeholder="Escribe aquí tu mensaje..."
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                  className="h-5 w-5 mt-1 text-[#be8f52] border-gray-300 dark:border-zinc-700 rounded focus:ring-[#be8f52]"
                />
                <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  Acepto la <Link href="/privacidad" className="text-[#be8f52] hover:underline">política de privacidad</Link> y el tratamiento de mis datos
                </label>
              </div>
              
              <button
                type="submit"
                disabled={sending}
                className="w-full px-6 py-3 bg-[#be8f52] text-white font-medium rounded-lg flex items-center justify-center hover:bg-[#be8f52]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#be8f52]/50 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Información de Contacto</h2>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Dirección</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      C. de los Hermanos Gómez, 5, Cdad. Lineal<br />
                      28017 Madrid, España
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                    <Phone className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      <a href="tel:+34603211318" className="hover:text-[#be8f52]">+34 603 21 13 18</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                    <Mail className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      <a href="mailto:snstattoomadrid@gmail.com" className="hover:text-[#be8f52]">snstattoomadrid@gmail.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                    <Clock className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Horario</h3>
                    <div className="text-gray-600 dark:text-gray-300 mt-1 space-y-1">
                      <p>Lunes a Sábado: 11:00 - 14:00, 15:00 - 20:00</p>
                      <p className="mt-0">Domingo: Cita previa</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-[#be8f52]/10 flex items-center justify-center mr-4 mt-1">
                    <Instagram className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Redes Sociales</h3>
                    <div className="flex items-center space-x-4 mt-3">
                      <a 
                        href="https://www.instagram.com/saintsandsinnersmadrid/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 dark:text-gray-400 hover:text-[#be8f52] transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={24} />
                      </a>
                      <a 
                        href="https://www.tiktok.com/@saintsandsinnersbygamboa" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-500 dark:text-gray-400 hover:text-[#be8f52] transition-colors"
                        aria-label="TikTok"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormularioSection; 