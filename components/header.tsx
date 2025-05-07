"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Instagram, Facebook, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Detectar scroll para cambiar la apariencia del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'Servicios', href: '/servicios' },
    { name: 'Artistas', href: '/artistas' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/contacto' },
  ];

  // Variantes para animaciones
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.3
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 } 
    },
    exit: { opacity: 0, x: 20 }
  };

  const logoMotion = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'py-2 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/90 shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior */}
        <div className="flex items-center justify-between">
          {/* Logo con efecto hover estable */}
          <div className="relative z-10 w-1/4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-20 md:h-12 md:w-24 overflow-visible">
                <Image 
                  src="/images/logo-gamboa.png" 
                  alt="Saints & Sinners" 
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-300"
                  priority
                />
                {/* Efecto de brillo detrás del logo */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#be8f52]/0 via-[#be8f52]/30 to-[#be8f52]/0 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-700 -z-10"></div>
              </div>
            </Link>
          </div>

          {/* Navegación en desktop - centrada en la página */}
          <div className="hidden md:flex justify-center items-center w-1/2">
            <nav className="flex items-center justify-center">
              <div className="flex items-center justify-center space-x-5">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Link 
                      href={link.href}
                      className={`px-5 py-2 rounded-md text-base font-medium transition-all duration-300 relative group text-center ${
                        isScrolled 
                          ? 'text-gray-800 dark:text-gray-200 hover:text-[#be8f52] dark:hover:text-[#be8f52]' 
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </div>

          {/* Acciones de cabecera */}
          <div className="flex items-center space-x-3 z-10 w-1/4 justify-end">
            {/* Redes sociales - solo visibles en desktop */}
            <div className="hidden lg:flex items-center mr-2">
              <motion.a 
                href="https://www.instagram.com/saintsandsinnersmadrid/" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 hover:text-[#be8f52] ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-white/80'
                }`}
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://www.tiktok.com/@saintsandsinnersbygamboa" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-full transition-all duration-300 hover:text-[#be8f52] ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-white/80'
                }`}
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </motion.a>
            </div>


            {/* Botón de reserva en desktop */}
            <div className="hidden md:block">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href="/reservar" 
                  className="px-5 py-2 bg-[#be8f52] text-black font-medium rounded-md hover:bg-[#be8f52]/90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Reservar Cita
                </Link>
              </motion.div>
            </div>

            {/* Botón del menú móvil */}
            <div className="block md:hidden">
              <motion.button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-md ${
                  isScrolled 
                    ? 'text-gray-800 dark:text-white bg-gray-100 dark:bg-zinc-800' 
                    : 'text-white bg-white/10 backdrop-blur-sm'
                }`}
                aria-label="Menú"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil con animaciones */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[9999] md:hidden overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            style={{ position: 'fixed' }}
          >
            {/* Overlay con efecto de desenfoque */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed' }}
            ></div>
            
            {/* Panel de menú */}
            <motion.div 
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white dark:bg-zinc-900 shadow-xl flex flex-col overflow-y-auto z-[10000]"
              style={{ position: 'fixed' }}
            >
              <div className="px-6 py-6 flex flex-col h-full">
                <div className="flex justify-end mb-8">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-800 dark:text-white bg-gray-100 dark:bg-zinc-800"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
                
                <nav className="flex flex-col space-y-4 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      variants={mobileNavItemVariants}
                    >
                      <Link 
                        href={link.href}
                        className="flex items-center py-3 text-lg font-medium text-gray-800 dark:text-white hover:text-[#be8f52] dark:hover:text-[#be8f52] transition-colors duration-200 border-b border-gray-200 dark:border-zinc-800"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                        <ChevronRight size={18} className="ml-auto" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                <div className="mt-auto pt-6 pb-2">
                  {/* Redes sociales */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <motion.a 
                      href="https://www.instagram.com/saintsandsinnersmadrid/" 
                      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-[#be8f52] hover:text-white transition-all duration-200"
                      aria-label="Instagram"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram size={20} />
                    </motion.a>
                    <motion.a 
                      href="https://www.tiktok.com/@saintsandsinnersbygamboa" 
                      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-white hover:bg-[#be8f52] hover:text-white transition-all duration-200"
                      aria-label="TikTok"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </motion.a>
                  </div>
                  
                  {/* Botón de reserva en móvil */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/reservar" 
                      className="block w-full py-3 bg-[#be8f52] text-black font-medium rounded-md text-center hover:bg-[#be8f52]/90 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Reservar Cita
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;