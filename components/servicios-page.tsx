"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck, Syringe, FileStack, Zap, Home, Users, Clock, CircleDollarSign, Award, Heart, Star } from 'lucide-react';

const ServiciosPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
        </div>
        
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#be8f52]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Servicios de <span className="text-[#be8f52]">nuestro estudio</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              En Saints & Sinners, estudio de tatuajes en Madrid, ofrecemos una amplia gama de servicios premium relacionados con el arte corporal. Descubre todo lo que podemos hacer por ti.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-gray-400">
              <span className="flex items-center"><Check size={16} className="text-[#be8f52] mr-2" /> Materiales premium</span>
              <span className="flex items-center"><Check size={16} className="text-[#be8f52] mr-2" /> Artistas certificados</span>
              <span className="flex items-center"><Check size={16} className="text-[#be8f52] mr-2" /> Diseños personalizados</span>
              <span className="flex items-center"><Check size={16} className="text-[#be8f52] mr-2" /> Máxima higiene</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          {/* Tatuajes Personalizados */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
                  <FileStack size={18} className="text-[#be8f52] mr-2" />
                  <span className="text-[#be8f52] font-medium text-sm">Tatuajes Personalizados</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Creamos Arte Único para tu Piel</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Nuestros tatuadores del estudio son artistas especializados en diferentes estilos, capaces de transformar tus ideas en arte permanente. Trabajamos codo a codo contigo para crear diseños personalizados que reflejen tu personalidad y visión.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Consulta Personalizada</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Sesión privada para discutir tus ideas y crear un diseño a medida.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Todos los Estilos</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Realismo, neotradicional, blackwork, japonés, old school, fine line, acuarela y más.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Retoques Gratuitos</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Incluimos un retoque gratuito dentro de los primeros 3 meses tras el tatuaje.</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/contacto" className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all">
                  Agendar una consulta
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <div className="aspect-w-4 aspect-h-3 relative">
                  <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
                  <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                    <Image 
                      src="/images/services/tattoo-custom.jpg" 
                      alt="Tatuaje personalizado" 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seguridad e Higiene */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 relative">
                  <div className="absolute -inset-4 md:-inset-8 border border-[#be8f52]/20 z-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#be8f52]/20 to-transparent opacity-30 z-0"></div>
                  <div className="relative z-10 h-full w-full overflow-hidden bg-zinc-900">
                    <Image 
                      src="/images/services/hygiene.jpg" 
                      alt="Seguridad e higiene" 
                      width={600} 
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-[#be8f52]/10 rounded-full mb-4">
                  <ShieldCheck size={18} className="text-[#be8f52] mr-2" />
                  <span className="text-[#be8f52] font-medium text-sm">Seguridad e Higiene</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tu Seguridad es Nuestra Prioridad</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Cumplimos con los más estrictos protocolos de higiene y seguridad. Todos nuestros materiales son de un solo uso o esterilizados mediante autoclave, garantizando un entorno 100% seguro para cada cliente.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Materiales Esterilizados</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Utilizamos equipos esterilizados mediante autoclave entre cada cliente.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Agujas Desechables</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Todas nuestras agujas son de un solo uso y se abren delante del cliente.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-6 w-6 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mr-3 mt-1">
                      <Check size={14} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Tintas Certificadas</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Trabajamos únicamente con tintas hipoalergénicas de máxima calidad y certificación.</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/sobre-nosotros" className="inline-flex items-center px-6 py-3 bg-[#be8f52] text-black font-medium hover:bg-[#be8f52]/90 transition-all">
                  Conoce nuestros estándares
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Más Servicios - Grid de 4 */}
          <div className="mb-16">
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
                  <Check size={24} />
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
                    <span>Aclarado para cubrir con nuevo diseño</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Consulta personalizada gratuita</span>
                  </li>
                </ul>
              </div>
              
              {/* Alquiler de Cabinas */}
              <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800 group hover:border-[#be8f52]/30 transition-all duration-300">
                <div className="h-12 w-12 bg-[#be8f52]/10 text-[#be8f52] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#be8f52] group-hover:text-white transition-all duration-300">
                  <Home size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#be8f52] transition-colors duration-300">Alquiler de Cabinas</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Espacios equipados para tatuadores independientes disponibles para alquiler.</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Cabinas totalmente equipadas</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Alquiler por días o semanas</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-[#be8f52] mt-0.5 mr-2 flex-shrink-0" />
                    <span>Acceso a zona de esterilización</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Por Qué Elegirnos</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Nos distinguimos por ofrecer una experiencia artística superior en un ambiente seguro y profesional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Artistas Profesionales</h3>
              <p className="text-gray-600 dark:text-gray-300">Todos nuestros artistas cuentan con años de experiencia y formación especializada.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Tiempo Personalizado</h3>
              <p className="text-gray-600 dark:text-gray-300">Dedicamos el tiempo necesario a cada cliente, sin prisas y con atención exclusiva.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleDollarSign size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Precios Justos</h3>
              <p className="text-gray-600 dark:text-gray-300">Ofrecemos precios acordes a la calidad premium de nuestros servicios, sin sorpresas.</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-[#be8f52]/10 text-[#be8f52] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Garantía de Calidad</h3>
              <p className="text-gray-600 dark:text-gray-300">Respaldamos nuestro trabajo con una garantía de satisfacción y retoques gratuitos.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonios Section */}
      <section className="py-16 bg-white dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#be8f52] to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
              <div className="flex text-[#be8f52] mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Mi experiencia en Saints & Sinners fue excepcional. Mi tatuador entendió perfectamente mi visión y el resultado superó mis expectativas. 100% recomendado."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden mr-3">
                  <Image 
                    src="/images/testimonials/client1.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Laura Martínez</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Tatuaje de manga completa</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
              <div className="flex text-[#be8f52] mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "Lo que más valoro es la limpieza y profesionalidad. Me sentí seguro en todo momento y el resultado de mi piercing fue perfecto. Volveré sin duda."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden mr-3">
                  <Image 
                    src="/images/testimonials/client2.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Carlos Sánchez</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Múltiples piercings</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-zinc-800">
              <div className="flex text-[#be8f52] mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                "El microblading de cejas que me hicieron cambió por completo mi expresión. Atención impecable, resultados naturales y duraderos."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-zinc-800 overflow-hidden mr-3">
                  <Image 
                    src="/images/testimonials/client3.jpg" 
                    alt="Cliente" 
                    width={40} 
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Ana García</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Micropigmentación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#be8f52] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 opacity-40"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Heart size={48} className="text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para Transformar tus Ideas en Arte?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Agenda una consulta gratuita con nuestros artistas y comienza a hacer realidad tu próximo proyecto.
          </p>
          <Link href="/contacto" className="inline-flex items-center px-8 py-4 bg-black text-white font-medium hover:bg-black/80 transition-all">
            Contacta con nosotros
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Preguntas Frecuentes</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Resolvemos tus dudas sobre nuestros servicios
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-5 bg-white dark:bg-zinc-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">¿Duele hacerse un tatuaje?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  El nivel de dolor varía según la persona y la zona del cuerpo. En general, se describe como una molestia tolerable. Nuestros artistas trabajan con técnicas para minimizar la incomodidad durante el proceso.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-5 bg-white dark:bg-zinc-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">¿Cómo debo cuidar mi tatuaje después de realizarlo?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Te proporcionaremos instrucciones detalladas de cuidados. En general, deberás mantener el tatuaje limpio, hidratado y protegido del sol durante el proceso de cicatrización, que dura aproximadamente 2-3 semanas.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-5 bg-white dark:bg-zinc-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">¿Puedo elegir un diseño de un catálogo o traer mi propia idea?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Ambas opciones son válidas. Puedes elegir entre nuestro catálogo o traer tus propias ideas. Nuestros artistas pueden adaptar y personalizar cualquier concepto para crear un diseño único para ti.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-5 bg-white dark:bg-zinc-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">¿Cuánto cuesta un tatuaje?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  El precio varía según el tamaño, complejidad, ubicación y el artista que lo realice. Ofrecemos presupuestos personalizados tras la consulta inicial donde evaluamos todos estos factores.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              <div className="p-5 bg-white dark:bg-zinc-900">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">¿Es efectiva la eliminación láser de tatuajes?</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Sí, nuestra tecnología láser es altamente efectiva para eliminar o aclarar tatuajes. El número de sesiones necesarias depende del tamaño, colores y antigüedad del tatuaje, así como de tu tipo de piel.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 dark:text-gray-300">
              ¿No encuentras respuesta a tu pregunta?
            </p>
            <Link href="/contacto" className="text-[#be8f52] font-medium hover:underline inline-flex items-center mt-2">
              Contáctanos directamente
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiciosPage;