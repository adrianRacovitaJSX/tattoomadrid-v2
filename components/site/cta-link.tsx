'use client';

import Link from 'next/link';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { MAPS_URL, TEL_HREF, whatsappUrl } from '@/lib/contact';
import { track } from './track';
import { buttonClasses, type Size, type Variant } from './button-classes';

export { buttonClasses };

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
  /** Dónde está el botón (hero, barra-movil, artista…): viaja al evento de GA4. */
  placement: string;
};

/** Botón de WhatsApp con mensaje prerrellenado y evento de conversión. */
export function WhatsAppLink({
  message,
  variant = 'whatsapp',
  size = 'md',
  className,
  children,
  placement,
}: CommonProps & { message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('whatsapp_click', { placement })}
      className={buttonClasses(variant, size, className)}
    >
      <MessageCircle aria-hidden className="size-5 shrink-0" />
      {children ?? 'Pide presupuesto por WhatsApp'}
    </a>
  );
}

export function CallLink({ variant = 'secondary', size = 'md', className, children, placement }: CommonProps) {
  return (
    <a
      href={TEL_HREF}
      onClick={() => track('call_click', { placement })}
      className={buttonClasses(variant, size, className)}
    >
      <Phone aria-hidden className="size-5 shrink-0" />
      {children ?? 'Llamar'}
    </a>
  );
}

export function DirectionsLink({ variant = 'secondary', size = 'md', className, children, placement }: CommonProps) {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('directions_click', { placement })}
      className={buttonClasses(variant, size, className)}
    >
      <MapPin aria-hidden className="size-5 shrink-0" />
      {children ?? 'Cómo llegar'}
    </a>
  );
}

export function BookingLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  placement,
  href = '/reservar',
}: CommonProps & { href?: string }) {
  return (
    <Link
      href={href}
      onClick={() => track('booking_cta_click', { placement })}
      className={buttonClasses(variant, size, className)}
    >
      {children ?? 'Reservar cita'}
    </Link>
  );
}
