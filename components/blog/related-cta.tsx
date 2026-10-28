import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { WhatsAppLink } from '@/components/site/cta-link';

type Props = {
  /** Página comercial a la que apoya el post (ver lib/blog-links.ts). */
  href: string;
  /** Texto del enlace: la búsqueda que debe posicionar esa página. */
  label: string;
};

/** Cierre de cada post: lleva el tráfico informativo a la página comercial o a pedir presupuesto. */
export default function RelatedCta({ href, label }: Props) {
  return (
    <aside aria-label="Próximo paso" className="not-prose my-12 grid gap-4 md:grid-cols-2">
      <Link
        href={href}
        className="group flex flex-col justify-between gap-4 rounded-[4px] border border-line bg-surface-1 p-6 transition-colors hover:border-gold/60"
      >
        <div>
          <p className="eyebrow mb-2">Saints &amp; Sinners</p>
          <h3 className="font-display text-2xl text-bone">{label}</h3>
          <p className="mt-2 text-sm text-ash">Trabajos reales, precios y cómo pedir cita en nuestro estudio de Madrid.</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-gold">
          Ver más <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </Link>

      <div className="flex flex-col justify-between gap-4 rounded-[4px] border border-gold/40 bg-gold/5 p-6">
        <div>
          <p className="eyebrow mb-2">Presupuesto</p>
          <h3 className="font-display text-2xl text-bone">¿Tienes una idea?</h3>
          <p className="mt-2 text-sm text-ash">Mándanos la idea y una referencia. Te respondemos con propuesta y precio sin compromiso.</p>
        </div>
        <WhatsAppLink placement="blog-cta" message="Hola, vengo del blog y quiero pedir presupuesto para un tatuaje." className="self-start" />
      </div>
    </aside>
  );
}
