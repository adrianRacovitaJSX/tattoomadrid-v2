"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos de consentimiento de cookies
interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

type OptionalType = 'analytics' | 'advertising';

const COOKIE_CONSENT_KEY = 'cookie-consent';

const OPTIONAL_TYPES: { id: OptionalType; title: string; text: string }[] = [
  { id: 'analytics', title: 'Analíticas', text: 'Nos dicen qué páginas se visitan para mejorar la web (Google Analytics).' },
  { id: 'advertising', title: 'Publicitarias', text: 'Miden nuestras campañas y muestran anuncios relevantes (Meta, Google).' },
];

const btn =
  'inline-flex h-11 cursor-pointer items-center justify-center rounded-[4px] px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold';
const btnPrimary = `${btn} bg-gold text-ink hover:bg-gold-strong`;
const btnSecondary = `${btn} border border-bone/25 text-bone hover:border-gold hover:text-gold`;

function Switch({ checked, onChange, labelledBy }: { checked: boolean; onChange: () => void; labelledBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      onClick={onChange}
      className={cn(
        'relative h-7 w-12 shrink-0 cursor-pointer rounded-full border transition-colors',
        checked ? 'border-gold bg-gold' : 'border-line bg-ink'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute top-1 left-1 size-[1.125rem] rounded-full transition-transform duration-200',
          checked ? 'translate-x-5 bg-ink' : 'translate-x-0 bg-ash'
        )}
      />
    </button>
  );
}

const CookieConsentBanner = () => {
  const pathname = usePathname();
  const hideOnLanding =
    pathname === '/landing' ||
    pathname.startsWith('/landing/') ||
    pathname.startsWith('/automations');

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
    if (hideOnLanding) return;

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
        setIsAnimating(true);
      }
    } else {
      // Pequeño delay para no competir con la primera pintura de la página
      setTimeout(() => {
        setShowBanner(true);
        requestAnimationFrame(() => setIsAnimating(true));
      }, 1000);
    }
  }, [hideOnLanding]);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = {
      ...newConsent,
      timestamp: Date.now()
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: consentWithTimestamp }));
    setConsent(consentWithTimestamp);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, advertising: true, timestamp: Date.now() });
  const rejectNonEssential = () => saveConsent({ necessary: true, analytics: false, advertising: false, timestamp: Date.now() });
  const saveCustomSettings = () => saveConsent(consent);
  const toggleCookieType = (type: OptionalType) => setConsent((prev) => ({ ...prev, [type]: !prev[type] }));

  // Función para abrir el panel de configuración desde cualquier parte de la web
  const openSettings = useCallback(() => {
    setShowBanner(true);
    setShowSettings(true);
    setIsAnimating(true);
  }, []);

  // Exponer función global para abrir configuración de cookies
  useEffect(() => {
    if (hideOnLanding) {
      delete (window as typeof window & { openCookieSettings?: () => void })
        .openCookieSettings;
      return;
    }
    (window as typeof window & { openCookieSettings: () => void }).openCookieSettings =
      openSettings;
  }, [hideOnLanding, openSettings]);

  // Escape cierra el panel de configuración
  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowSettings(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showSettings]);

  if (hideOnLanding || !showBanner) return null;

  if (showSettings) {
    return (
      <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
        <div aria-hidden className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookies-title"
          className="relative w-full max-w-lg rounded-t-[4px] border border-line bg-surface-1 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:rounded-[4px] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Privacidad</p>
              <h2 id="cookies-title" className="font-display text-3xl text-bone">
                Configurar cookies
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings(false)}
              aria-label="Cerrar configuración de cookies"
              className="-mr-2 -mt-1 flex size-11 cursor-pointer items-center justify-center text-ash hover:text-bone"
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            <li className="flex items-center justify-between gap-6 py-4">
              <div>
                <p className="font-medium text-bone">Técnicas</p>
                <p className="mt-1 text-sm text-ash">Necesarias para que la web funcione. No se pueden desactivar.</p>
              </div>
              <span className="shrink-0 text-xs text-ash">Siempre activas</span>
            </li>
            {OPTIONAL_TYPES.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-6 py-4">
                <div>
                  <p id={`cookie-${t.id}`} className="font-medium text-bone">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm text-ash">{t.text}</p>
                </div>
                <Switch checked={consent[t.id]} onChange={() => toggleCookieType(t.id)} labelledBy={`cookie-${t.id}`} />
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" onClick={rejectNonEssential} className={btnSecondary}>
              Rechazar todas
            </button>
            <button type="button" onClick={saveCustomSettings} className={btnPrimary}>
              Guardar
            </button>
          </div>
          <p className="mt-4 text-xs text-ash">
            Puedes cambiarlo cuando quieras. Más detalle en la{' '}
            <Link href="/cookies" className="text-gold underline-offset-2 hover:underline">
              política de cookies
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[60] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[opacity,transform] duration-500 ease-out sm:p-4 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:max-w-md lg:p-0',
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      )}
    >
      <div className="rounded-[4px] border border-line bg-surface-1/95 p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <p className="eyebrow mb-2">Cookies</p>
        <p className="text-sm leading-relaxed text-bone/90">
          Usamos cookies propias y de terceros para analizar el tráfico y medir nuestras campañas. Las técnicas son necesarias; el resto, solo si las aceptas.{' '}
          <Link href="/cookies" className="text-gold underline-offset-2 hover:underline">
            Política de cookies
          </Link>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={rejectNonEssential} className={btnSecondary}>
            Rechazar
          </button>
          <button type="button" onClick={acceptAll} className={btnPrimary}>
            Aceptar
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowSettings(true)}
          className="mt-2 inline-flex h-10 w-full cursor-pointer items-center justify-center text-sm text-ash underline-offset-4 hover:text-bone hover:underline"
        >
          Configurar
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
