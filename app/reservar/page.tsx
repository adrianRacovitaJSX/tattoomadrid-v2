import ReservaForm from "@/components/reservar/formulario";
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Reserva Tu Cita | Estudio de Tatuajes en Madrid',
  description: 'Reserva una cita en nuestro estudio de tatuajes en Madrid. Completa el formulario con tus datos y preferencias, y nos pondremos en contacto contigo para confirmar tu sesión.',
  keywords: 'reservar cita tatuaje Madrid, cita estudio tatuajes, reserva tatuaje, Saints and Sinners, formulario reserva tatuaje'
};

export default function Page() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 relative overflow-hidden pt-20 pb-20">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#be8f52]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#be8f52]/20 to-transparent"></div>
      <div className="absolute top-20 -left-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative py-12 sm:py-16">
        {/* Cabecera de la página */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#be8f52] to-amber-500">
              Reserva tu cita
            </span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Completa el formulario y nos pondremos en contacto contigo para confirmar los detalles de tu sesión
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulario (2/3 del ancho en pantallas grandes) */}
          <div className="w-full lg:w-2/3">
            <ReservaForm />
          </div>
          
          {/* Información de contacto (1/3 del ancho) */}
          <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 h-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                  Información de contacto
                </h2>
                
                {/* Mapa */}
                <div className="aspect-video w-full rounded-lg overflow-hidden mb-6 bg-zinc-200 dark:bg-zinc-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.4850207400053!2d-3.6540752831745196!3d40.4456140593348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422fa16c3c3b59%3A0x9ceb56669402ba2f!2sC.%20de%20los%20Hermanos%20G%C3%B3mez%2C%205%2C%2028017%20Madrid!5e0!3m2!1ses!2ses!4v1715866394965!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>
                
                {/* Dirección */}
                <div className="flex items-start mb-5">
                  <MapPin className="h-5 w-5 text-[#be8f52] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Dirección</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                      C. de los Hermanos Gómez, 5<br />
                      Cdad. Lineal, 28017 Madrid, España
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Calle+de+los+Hermanos+Gómez+5+Madrid+España" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#be8f52] hover:underline mt-1 inline-block"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>
                
                {/* Horarios */}
                <div className="flex items-start mb-5">
                  <Clock className="h-5 w-5 text-[#be8f52] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Horario</h3>
                    <ul className="text-zinc-600 dark:text-zinc-400 mt-1 space-y-0.5">
                      <li className="flex justify-between">
                        <span>Lunes - Sábado:</span>
                        <span>11:00 - 14:00, 15:00 - 20:00</span>
                      </li>
                      <li>
                        <span>Domingo: Cita previa</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Teléfono */}
                <div className="flex items-start mb-5">
                  <Phone className="h-5 w-5 text-[#be8f52] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Teléfono</h3>
                    <a 
                      href="tel:+34603211318" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#be8f52] dark:hover:text-[#be8f52] mt-1 block"
                    >
                      +34 603 21 13 18
                    </a>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-[#be8f52] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Email</h3>
                    <a 
                      href="mailto:snstattoomadrid@gmail.com" 
                      className="text-zinc-600 dark:text-zinc-400 hover:text-[#be8f52] dark:hover:text-[#be8f52] mt-1 block"
                    >
                      snstattoomadrid@gmail.com
                    </a>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                  <p className="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
                    ¿Prefieres contactarnos directamente?
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link 
                      href="/contacto" 
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-[#be8f52] hover:bg-[#be8f52]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#be8f52] transition-all duration-200"
                    >
                      Contactar
                    </Link>
                    <a 
                      href="https://wa.me/34603211318" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-zinc-300 dark:border-zinc-600 shadow-sm text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#be8f52] transition-all duration-200"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 