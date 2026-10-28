import JsonLd from '@/components/json-ld';
import { buildMetadata } from '@/lib/seo';
import { servicesCatalogSchema } from '@/lib/schema';
import { DEPOSIT, SERVICE_PRICES } from '@/lib/services';
import { Breadcrumbs, Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/site/blocks';
import PriceTable from '@/components/site/price-table';
import { OffersGrid } from '@/components/site/sections';

export const metadata = buildMetadata({
  title: 'Precio de un Tatuaje en Madrid',
  description:
    'Cuánto cuesta un tatuaje en Madrid: desde 70 € en Saints & Sinners. Precios de piercing, micropigmentación y láser, señal y qué influye en el presupuesto.',
  path: '/precios',
  mdSlug: 'precios',
  ogTitle: 'Precios de tatuajes en Madrid',
  ogKicker: 'Tatuajes desde 70 € · Presupuesto cerrado',
  keywords: ['precio tatuaje Madrid', 'cuánto cuesta un tatuaje', 'tatuajes baratos Madrid', 'precio piercing Madrid'],
});

const FACTORS = [
  { title: 'Tamaño', text: 'Más superficie, más horas de trabajo. Es el factor que más pesa.' },
  { title: 'Detalle y estilo', text: 'Un realismo con sombras lleva más tiempo que una línea fina del mismo tamaño.' },
  { title: 'Zona del cuerpo', text: 'Costillas, manos o cuello son más lentas de tatuar que un antebrazo.' },
  { title: 'Sesiones', text: 'Las piezas grandes se hacen por sesiones; te damos el número estimado antes de empezar.' },
];

const PRICE_FAQS = [
  {
    question: '¿Cuánto cuesta un tatuaje pequeño en Madrid?',
    answer:
      'En Saints & Sinners los tatuajes empiezan en 70 €. Si quieres varios pequeños, la oferta de 3 mini tattoos cuesta 100 € los tres.',
  },
  {
    question: '¿Cuánto cuesta una manga?',
    answer:
      'Depende del diseño y del número de sesiones. Ahora mismo tenemos la oferta de media manga interna o externa por 850 € con precio cerrado.',
  },
  {
    question: '¿Hay que pagar señal?',
    answer: `Sí, para reservar fecha pedimos una señal de ${DEPOSIT} que se descuenta del precio final.`,
  },
  {
    question: '¿El presupuesto es cerrado?',
    answer:
      'Sí. Antes de empezar te damos un precio cerrado o por sesión, según el proyecto. Sin sorpresas el día de la cita.',
  },
];

export default function PreciosPage() {
  return (
    <>
      <JsonLd
        id="ld-precios-catalogo"
        data={servicesCatalogSchema(
          SERVICE_PRICES.filter((s) => /^\d/.test(s.desde)).map((s) => ({
            name: s.servicio,
            description: `${s.servicio} en Madrid. Duración ${s.duracion}.`,
            priceFrom: Number.parseInt(s.desde, 10),
          }))
        )}
      />

      <section aria-labelledby="precios-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Precios', path: '/precios' }]} />
          <p className="eyebrow mb-6">Precios</p>
          <h1 id="precios-h1" className="font-display max-w-4xl text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl">
            ¿Cuánto cuesta un tatuaje en Madrid?
          </h1>
          <p data-tldr className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/90">
            En Saints &amp; Sinners los tatuajes empiezan en <strong className="text-gold">70 €</strong> y el diseño está incluido. El precio final depende del tamaño, el detalle y la zona; te damos presupuesto cerrado antes de empezar.
          </p>
        </Container>
      </section>

      <Section labelledBy="tabla-title">
        <h2 id="tabla-title" className="sr-only">
          Tabla de precios por servicio
        </h2>
        <PriceTable />
      </Section>

      <Section labelledBy="factores-title" className="border-t border-line">
        <SectionHeader id="factores-title" eyebrow="Presupuesto" title="Qué influye en el precio" />
        <ul className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {FACTORS.map((f) => (
            <li key={f.title} className="bg-ink p-6">
              <h3 className="text-lg font-medium text-bone">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-ash">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section aria-labelledby="ofertas-title" className="border-y border-line bg-surface-1 py-20 lg:py-24">
        <Container>
          <SectionHeader id="ofertas-title" eyebrow="Ofertas" title="Precio cerrado en piezas concretas" />
          <OffersGrid />
        </Container>
      </section>

      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title="Preguntas sobre precios" />
          <FaqList items={PRICE_FAQS} schemaId="ld-faq-precios" />
        </div>
      </Section>

      <CtaBand
        placement="precios-final"
        title="Pide tu presupuesto"
        text="Mándanos tu idea, el tamaño aproximado y la zona. Te respondemos con precio cerrado."
        message="Hola, quiero saber el precio de un tatuaje."
      />
    </>
  );
}
