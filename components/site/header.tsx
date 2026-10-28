'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUSINESS } from '@/lib/seo';
import { HOURS_LINES } from '@/lib/contact';
import { BookingLink, WhatsAppLink } from './cta-link';

export const NAV_LINKS = [
  { name: 'Trabajos', href: '/tatuajes' },
  { name: 'Artistas', href: '/artistas' },
  { name: 'Piercing', href: '/piercing-madrid' },
  { name: 'Precios', href: '/precios' },
  { name: 'Ofertas', href: '/ofertas' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra el menú al navegar y bloquea el scroll mientras está abierto.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        open ? 'border-b border-line bg-ink' : scrolled ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="Saints & Sinners Tattoo Madrid, inicio">
          <Image
            src="/images/logo-gamboa.png"
            alt=""
            width={600}
            height={300}
            priority
            className="h-10 w-auto lg:h-12"
            sizes="96px"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'text-sm tracking-wide transition-colors hover:text-gold',
                    isActive(link.href) ? 'text-gold' : 'text-bone/80'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <WhatsAppLink placement="cabecera" variant="secondary">
            WhatsApp
          </WhatsAppLink>
          <BookingLink placement="cabecera" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative z-10 -mr-2 flex size-11 items-center justify-center text-bone lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

    </header>
    <MobileMenu open={open} isActive={isActive} />
    </>
  );
}

/**
 * Menú móvil a pantalla completa. Va fuera del <header>: el backdrop-blur de la
 * cabecera crea un bloque contenedor y descolocaría un panel `fixed` dentro.
 */
function MobileMenu({ open, isActive }: { open: boolean; isActive: (href: string) => boolean }) {
  const links = [{ name: 'Inicio', href: '/' }, ...NAV_LINKS];
  return (
    <div
      id="menu-movil"
      inert={!open}
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-ink pt-16 transition-[opacity,visibility] duration-300 lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0'
      )}
    >
      <nav aria-label="Menú móvil" className="flex-1 px-4 pt-6">
        <ul>
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
              className={cn(
                'border-b border-line transition-[opacity,transform] duration-300 ease-out',
                open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              )}
            >
              <Link
                href={link.href}
                aria-current={isActive(link.href) && link.href !== '/' ? 'page' : undefined}
                className="group flex min-h-16 items-center gap-4 py-2"
              >
                <span className="tabular w-6 text-xs text-ash">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={cn(
                    'font-display flex-1 text-[2rem] leading-none tracking-tight',
                    (link.href === '/' ? false : isActive(link.href)) ? 'text-gold' : 'text-bone'
                  )}
                >
                  {link.name}
                </span>
                <ArrowUpRight aria-hidden className="size-5 text-ash transition-colors group-hover:text-gold" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'space-y-6 border-t border-line bg-surface-1 px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-[opacity,transform] delay-200 duration-300',
          open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        )}
      >
        <div className="grid grid-cols-2 gap-2">
          <WhatsAppLink placement="menu-movil" className="h-12">
            WhatsApp
          </WhatsAppLink>
          <BookingLink placement="menu-movil" className="h-12" />
        </div>
        <div className="flex items-end justify-between gap-4 text-sm">
          <div className="text-ash">
            {HOURS_LINES.map((h) => (
              <p key={h.days}>
                {h.days} <span className="tabular text-bone">{h.time}</span>
              </p>
            ))}
          </div>
          <div className="flex gap-4">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-gold">
              Instagram
            </a>
            <a href={BUSINESS.tiktok} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-gold">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
