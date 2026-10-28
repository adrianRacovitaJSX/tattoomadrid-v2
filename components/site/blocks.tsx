import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import JsonLd from '@/components/json-ld';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { WhatsAppLink, BookingLink } from './cta-link';

/** Contenedor estándar: ancho máximo 1280 px y márgenes laterales. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Section({
  id,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 lg:py-28', className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  action,
  as: Tag = 'h2',
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  action?: React.ReactNode;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Tag id={id} className="font-display text-4xl leading-[1.05] tracking-tight text-bone sm:text-5xl">
          {title}
        </Tag>
        {intro && <p className="mt-5 text-lg leading-relaxed text-ash">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

type Crumb = { name: string; path: string };

/** Migas de pan visibles + BreadcrumbList. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Inicio', path: '/' }, ...items];
  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumbSchema(all)} />
      <nav aria-label="Migas de pan" className="mb-8 text-sm text-ash">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-bone/80">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-gold">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

type Faq = { question: string; answer: string };

/** Preguntas frecuentes accesibles (details/summary) + FAQPage. */
export function FaqList({ items, schemaId = 'ld-faq' }: { items: Faq[]; schemaId?: string }) {
  return (
    <>
      <JsonLd id={schemaId} data={faqPageSchema(items)} />
      <div className="divide-y divide-line border-y border-line">
        {items.map((f) => (
          <details key={f.question} className="group py-1">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg text-bone [&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden className="text-2xl text-gold transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="max-w-3xl pb-6 leading-relaxed text-ash">{f.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}

/** Cierre de página con la acción principal. */
export function CtaBand({
  title = '¿Tienes una idea? Cuéntanosla.',
  text = 'Mándanos tu idea, la zona y una referencia. Te respondemos con propuesta y presupuesto sin compromiso.',
  message,
  placement,
}: {
  title?: string;
  text?: string;
  message?: string;
  placement: string;
}) {
  return (
    <section aria-labelledby={`cta-${placement}`} className="border-t border-line bg-surface-1">
      <Container className="flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <h2 id={`cta-${placement}`} className="font-display text-4xl leading-tight tracking-tight text-bone sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-ash">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <WhatsAppLink placement={placement} message={message} size="lg" />
          <BookingLink placement={placement} variant="secondary" size="lg">
            Formulario de cita
          </BookingLink>
        </div>
      </Container>
    </section>
  );
}
