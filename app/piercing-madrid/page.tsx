import JsonLd from '@/components/json-ld';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { SERVICE_PRICES } from '@/lib/services';
import { Breadcrumbs, Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';
import { LocationSection, TrustStrip } from '@/components/site/sections';

const PIERCING = SERVICE_PRICES.find((s) => s.id === 'piercing')!;

export const metadata = buildMetadata({
  title: 'Piercing en Madrid — Estudio en Ciudad Lineal',
  description:
    'Piercing en Madrid desde 30 €: orejas, nariz, ombligo y más con joyería de titanio y material de un solo uso. Estudio en Ciudad Lineal. Pide cita por WhatsApp.',
  path: '/piercing-madrid',
  ogTitle: 'Piercing en Madrid',
  ogKicker: 'Desde 30 € · Ciudad Lineal',
  keywords: ['piercing Madrid', 'piercing cerca de mi', 'piercing Ciudad Lineal', 'estudio de piercing Madrid'],
});

const FACTS = [
  { label: 'Desde', value: PIERCING.desde },
  { label: 'Duración', value: PIERCING.duracion },
  { label: 'Cuidados', value: '4–8 semanas' },
];

const PIERCING_FAQS = [
  {
    question: '¿Cuánto cuesta un piercing en Madrid?',
    answer: `En Saints & Sinners los piercings empiezan en ${PIERCING.desde}. El precio depende de la zona y de la joya que elijas.`,
  },
  {
    question: '¿Cuánto tarda en curar un piercing?',
    answer:
      'Depende de la zona. Recomendamos limpiar con suero fisiológico dos veces al día durante 4 a 8 semanas y te damos la guía de cuidados por escrito.',
  },
  {
    question: '¿Qué joyería usáis?',
    answer: 'Usamos joyería de titanio, adecuada para una primera perforación, y agujas estériles de un solo uso.',
  },
  {
    question: '¿Necesito cita para un piercing?',
    answer: 'Escríbenos por WhatsApp y te decimos el primer hueco disponible; un piercing dura entre 10 y 30 minutos.',
  },
];

export default function PiercingPage() {
  return (
    <>
      <JsonLd
        id="ld-service-piercing"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Piercing en Madrid',
          serviceType: 'Piercing',
          url: `${SITE_URL}/piercing-madrid`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: { '@type': 'City', name: 'Madrid' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: Number.parseInt(PIERCING.desde, 10),
            priceSpecification: { '@type': 'PriceSpecification', minPrice: Number.parseInt(PIERCING.desde, 10), priceCurrency: 'EUR' },
          },
        }}
      />

      <section aria-labelledby="piercing-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Piercing', path: '/piercing-madrid' }]} />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">Piercing</p>
              <h1 id="piercing-h1" className="font-display text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl">
                Piercing en Madrid
              </h1>
              <p data-tldr className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/90">
                Piercings desde {PIERCING.desde} en nuestro estudio de Ciudad Lineal, con joyería de titanio, agujas de un solo uso y guía de cuidados incluida.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <WhatsAppLink placement="piercing-hero" size="lg" message="Hola, quiero pedir cita para un piercing.">
                Pedir cita para piercing
              </WhatsAppLink>
            </div>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-line bg-line">
            {FACTS.map((f) => (
              <div key={f.label} className="bg-ink p-5">
                <dt className="text-sm text-ash">{f.label}</dt>
                <dd className="font-display tabular mt-1 text-2xl text-bone sm:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section labelledBy="seguridad-title">
        <SectionHeader id="seguridad-title" eyebrow="Seguridad" title="Higiene antes que nada" />
        <TrustStrip />
      </Section>

      <Section labelledBy="faq-title" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title="Preguntas sobre piercing" />
          <FaqList items={PIERCING_FAQS} schemaId="ld-faq-piercing" />
        </div>
      </Section>

      <div className="border-t border-line">
        <LocationSection placement="piercing-ubicacion" />
      </div>

      <CtaBand placement="piercing-final" title="¿Te animas con un piercing?" text="Escríbenos con la zona que quieres y te decimos precio y hueco." message="Hola, quiero pedir cita para un piercing." />
    </>
  );
}
