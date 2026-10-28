import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, CalendarCheck, PenTool, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/seo';
import { ADDRESS_LINE, HOURS_LINES, MAPS_URL } from '@/lib/contact';
import { PROMOS } from '@/lib/promos';
import { STYLES } from '@/lib/styles';
import { piecesByStyle } from '@/lib/portfolio';
import { Section, SectionHeader } from './blocks';
import { CallLink, DirectionsLink, WhatsAppLink } from './cta-link';

/** Razones para confiar, sin cifras inventadas: solo hechos verificables del estudio. */
export function TrustStrip() {
  const items = [
    { icon: CalendarCheck, title: `Desde ${BUSINESS.founded}`, text: 'Tatuando en Madrid' },
    { icon: ShieldCheck, title: 'Material de un solo uso', text: 'Agujas y cartuchos abiertos delante de ti' },
    { icon: BadgeCheck, title: 'Licencia sanitaria', text: 'Comunidad de Madrid' },
    { icon: PenTool, title: 'Diseño a medida', text: 'Boceto sobre tu idea antes de tatuar' },
  ];
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line lg:grid-cols-4">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex flex-col gap-3 bg-ink p-5 sm:p-6">
          <Icon aria-hidden className="size-6 text-gold" strokeWidth={1.5} />
          <div>
            <p className="font-medium text-bone">{title}</p>
            <p className="mt-1 text-sm text-ash">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OffersGrid({ headingLevel = 'h3' }: { headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {PROMOS.map((p) => (
        <li key={p.id}>
          <Link href={p.href} className="group grid h-full overflow-hidden rounded-[4px] border border-line bg-surface-1 sm:grid-cols-[2fr_3fr]">
            <div className="relative aspect-[4/3] sm:aspect-auto">
              <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 768px) 20vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>
            <div className="flex flex-col gap-4 p-6">
              <p className="eyebrow">{p.kicker}</p>
              <H className="font-display text-3xl leading-tight text-bone">{p.title}</H>
              <p className="tabular">
                <span className="font-display text-5xl text-gold">{p.price}</span>
                <span className="ml-2 text-sm text-ash">{p.priceNote}</span>
              </p>
              <ul className="space-y-1 text-sm text-bone/80">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <Sparkles aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" /> {b}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-gold">
                {p.cta} <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function StyleCards() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {STYLES.map((s) => {
        const cover = piecesByStyle(s.slug)[0];
        return (
          <li key={s.slug}>
            <Link href={`/tatuajes/${s.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-[4px] bg-surface-1">
              {cover && (
                <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <h3 className="font-display text-2xl leading-tight text-bone sm:text-3xl">{s.name}</h3>
                <ArrowUpRight aria-hidden className="size-6 shrink-0 text-gold" />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function ProcessSteps() {
  const steps = [
    { title: 'Envíanos tu idea', text: 'Por WhatsApp o formulario: qué quieres, en qué zona y una foto de referencia si la tienes.' },
    { title: 'Propuesta y presupuesto', text: 'El artista adecuado valora tu idea, te da precio y fecha. Sin compromiso.' },
    { title: 'Te tatuamos', text: 'Boceto final sobre tu piel, sesión en cabina esterilizada y guía de cuidados.' },
  ];
  return (
    <ol className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="bg-ink p-6 sm:p-8">
          <span className="font-display tabular text-5xl text-gold">{i + 1}</span>
          <h3 className="mt-6 text-xl font-medium text-bone">{s.title}</h3>
          <p className="mt-2 leading-relaxed text-ash">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function ReviewsCta() {
  return (
    <div className="flex flex-col gap-6 rounded-[4px] border border-line bg-surface-1 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex text-gold" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-current" />
          ))}
        </div>
        <p className="text-bone">
          Lee lo que dicen nuestros clientes en <strong className="font-medium">Google</strong>.
        </p>
      </div>
      <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-gold hover:underline">
        Ver reseñas <ArrowUpRight aria-hidden className="size-4" />
      </a>
    </div>
  );
}

export function LocationSection({ placement }: { placement: string }) {
  return (
    <Section labelledBy="ubicacion-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[780/578] overflow-hidden rounded-[4px]">
          <Image
            src="/images/tattoomadrid.webp"
            alt="Fachada de Saints & Sinners Tattoo en la calle de los Hermanos Gómez, Madrid"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeader
            id="ubicacion-title"
            eyebrow="Visítanos"
            title="Estudio en Ciudad Lineal, Madrid"
            intro={
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                {ADDRESS_LINE}
              </a>
            }
          />
          <dl className="mb-8 max-w-sm divide-y divide-line border-y border-line">
            {HOURS_LINES.map((h) => (
              <div key={h.days} className="flex justify-between py-3">
                <dt className="text-ash">{h.days}</dt>
                <dd className="tabular text-bone">{h.time}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppLink placement={placement}>Escríbenos</WhatsAppLink>
            <DirectionsLink placement={placement} />
            <CallLink placement={placement} variant="ghost" />
          </div>
        </div>
      </div>
    </Section>
  );
}
