"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Settings, Check, Shield } from 'lucide-react';

// Tipos de consentimiento de cookies
interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Siempre requerido
    analytics: false,
    advertising: false,
    timestamp: 0
  });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Verificar si ya existe consentimiento guardado
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        setShowBanner(false);
      } catch {
        // Si hay error al parsear, mostrar el banner
        setShowBanner(true);
      }
    } else {
      // Pequeño delay para animación de entrada
      setTimeout(() => {
        setShowBanner(true);
        setIsAnimating(true);
      }, 1000);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: Date.now()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now()
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now()
    });
  };

  const saveCustomSettings = () => {
    saveConsent(consent);
  };

  const toggleCookieType = (type: 'analytics' | 'advertising') => {
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Función para abrir el panel de configuración desde cualquier parte de la web
  const openSettings = () => {
    setShowBanner(true);
    setShowSettings(true);
    setIsAnimating(true);
  };

  // Exponer función global para abrir configuración de cookies
  useEffect(() => {
    (window as typeof window & { openCookieSettings: () => void }).openCookieSettings = openSettings;
  }, []);

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay para el panel de configuración */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Banner principal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ease-out ${
          isAnimating ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-zinc-900/98 backdrop-blur-md border-t border-zinc-800 shadow-2xl">
          <div className="container mx-auto px-4 py-4 md:py-5">
            {!showSettings ? (
              // Vista del banner principal
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 bg-[#be8f52]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cookie className="h-5 w-5 text-[#be8f52]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">
                      Utilizamos cookies
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Usamos cookies propias y de terceros para mejorar tu experiencia de navegación, 
                      analizar el tráfico del sitio y personalizar contenido. Puedes aceptar todas, 
                      rechazar las no esenciales o configurar tus preferencias.{' '}
                      <Link href="/cookies" className="text-[#be8f52] hover:underline">
                        Más información
                      </Link>
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    Configurar
                  </button>
                  <button
                    onClick={rejectNonEssential}
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-5 py-2.5 text-sm font-medium text-black bg-[#be8f52] hover:bg-[#be8f52]/90 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    Aceptar todas
                  </button>
                </div>
              </div>
            ) : (
              // Panel de configuración
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#be8f52]/20 rounded-full flex items-center justify-center">
                      <Settings className="h-5 w-5 text-[#be8f52]" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">
                      Configuración de cookies
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-gray-400 text-sm mb-5">
                  Gestiona tus preferencias de cookies. Las cookies técnicas son necesarias para el funcionamiento del sitio.
                </p>

                <div className="space-y-3 mb-6">
                  {/* Cookies Técnicas - Siempre activas */}
                  <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Shield size={16} className="text-green-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Cookies técnicas</h4>
                          <p className="text-gray-400 text-xs">Necesarias para el funcionamiento del sitio</p>
                        </div>
                      </div>
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                        Siempre activas
                      </div>
                    </div>
                  </div>

                  {/* Cookies Analíticas */}
                  <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Cookies analíticas</h4>
                          <p className="text-gray-400 text-xs">Nos ayudan a mejorar el sitio web</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCookieType('analytics')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          consent.analytics ? 'bg-[#be8f52]' : 'bg-zinc-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            consent.analytics ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Cookies Publicitarias */}
                  <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-sm">Cookies publicitarias</h4>
                          <p className="text-gray-400 text-xs">Permiten mostrar anuncios personalizados</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCookieType('advertising')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          consent.advertising ? 'bg-[#be8f52]' : 'bg-zinc-600'
                        }`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            consent.advertising ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={rejectNonEssential}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors"
                  >
                    Solo esenciales
                  </button>
                  <button
                    onClick={saveCustomSettings}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-black bg-[#be8f52] hover:bg-[#be8f52]/90 rounded-lg transition-colors"
                  >
                    Guardar preferencias
                  </button>
                </div>

                <p className="text-gray-500 text-xs text-center mt-4">
                  Puedes cambiar tus preferencias en cualquier momento desde nuestra{' '}
                  <Link href="/cookies" className="text-[#be8f52] hover:underline">
                    política de cookies
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsentBanner;
