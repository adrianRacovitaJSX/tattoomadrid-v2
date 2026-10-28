import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import JsonLd from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { servicesCatalogSchema } from '@/lib/schema';
import { SERVICES_CATALOG, SERVICES_FAQS } from '@/lib/faqs';
import { SERVICE_PRICES } from '@/lib/services';
import { PIECES } from '@/lib/portfolio';
import { Breadcrumbs, Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/site/blocks';
import PriceTable from '@/components/site/price-table';
import { TrustStrip } from '@/components/site/sections';

export const metadata = buildMetadata({
  title: 'Servicios de Tatuaje, Piercing y Micropigmentación en Madrid',
  description:
    'Servicios de Saints & Sinners en Madrid: tatuajes a medida desde 70 €, piercing desde 30 €, micropigmentación de cejas y eliminación láser. Precios y cita por WhatsApp.',
  path: '/servicios',
  ogTitle: 'Servicios del estudio',
  ogKicker: 'Tatuaje · Piercing · Micropigmentación · Láser',
  mdSlug: 'servicios',
  keywords: ['servicios tatuajes Madrid', 'piercing Madrid', 'micropigmentación Madrid', 'eliminar tatuaje láser Madrid'],
});

const price = (id: string) => SERVICE_PRICES.find((s) => s.id === id)!;

const SERVICES = [
  {
    id: 'tatuajes',
    title: 'Tatuajes a medida',
    text: 'Realismo, black and grey, japonés y fine line. Diseño incluido y presupuesto cerrado.',
    price: price('tatuaje'),
    href: '/tatuajes',
    image: PIECES[1],
  },
  {
    id: 'piercing',
    title: 'Piercing',
    text: 'Orejas, nariz, ombligo y más con joyería de titanio y agujas de un solo uso.',
    price: price('piercing'),
    href: '/piercing-madrid',
  },
  {
    id: 'micropigmentacion',
    title: 'Micropigmentación',
    text: 'Cejas, labios y línea de ojos con resultado natural. Incluye repaso a las 4–6 semanas.',
    price: price('micropigmentacion'),
  },
  {
    id: 'laser',
    title: 'Eliminación láser',
    text: 'Eliminación y aclarado de tatuajes para borrar o preparar un cover up. Consulta previa gratuita.',
    price: price('laser'),
  },
];

export default function ServiciosPage() {
  return (
    <>
      <JsonLd id="ld-services-catalog" data={servicesCatalogSchema(SERVICES_CATALOG)} />

      <section aria-labelledby="servicios-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Servicios', path: '/servicios' }]} />
          <SectionHeader
            as="h1"
            id="servicios-h1"
            eyebrow="Servicios"
            title="Tatuaje, piercing y micropigmentación en Madrid"
            intro="Todo en el mismo estudio de Ciudad Lineal, con el mismo protocolo de higiene y presupuesto antes de empezar."
          />
          <ul className="grid gap-4 md:grid-cols-2">
            {SERVICES.map((s) => {
              const content = (
                <>
                  {s.image && (
                    <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[4px]">
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-3xl text-bone">{s.title}</h2>
                    {s.href && <ArrowUpRight aria-hidden className="size-6 shrink-0 text-gold" />}
                  </div>
                  <p className="mt-3 leading-relaxed text-ash">{s.text}</p>
                  <p className="mt-6 text-sm text-ash">
                    Desde <span className="font-display tabular text-2xl text-gold">{s.price.desde}</span>
                  </p>
                </>
              );
              return (
                <li key={s.id} id={s.id} className="scroll-mt-24">
                  {s.href ? (
                    <Link href={s.href} className="block h-full rounded-[4px] border border-line bg-surface-1 p-6 transition-colors hover:border-gold/60 sm:p-8">
                      {content}
                    </Link>
                  ) : (
                    <div className="h-full rounded-[4px] border border-line bg-surface-1 p-6 sm:p-8">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <Section labelledBy="precios-title">
        <SectionHeader id="precios-title" eyebrow="Precios" title="Precios orientativos" />
        <PriceTable />
      </Section>

      <Section labelledBy="higiene-title" className="border-t border-line">
        <SectionHeader id="higiene-title" eyebrow="Seguridad" title="Higiene en cada servicio" />
        <TrustStrip />
      </Section>

      <Section labelledBy="faq-title" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title="Preguntas frecuentes" />
          <FaqList items={SERVICES_FAQS} schemaId="ld-faq-servicios" />
        </div>
      </Section>

      <CtaBand placement="servicios-final" />
    </>
  );
}
