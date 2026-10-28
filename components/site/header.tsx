'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'bg-transparent'
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

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-ink px-4 pb-28 pt-6 lg:hidden"
      >
        <nav aria-label="Menú móvil">
          <ul className="divide-y divide-line border-y border-line">
            {[{ name: 'Inicio', href: '/' }, ...NAV_LINKS, { name: 'Reservar cita', href: '/reservar' }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'font-display flex min-h-14 items-center text-2xl',
                    isActive(link.href) ? 'text-gold' : 'text-bone'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
