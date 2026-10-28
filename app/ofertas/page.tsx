import JsonLd from '@/components/json-ld';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { PROMOS } from '@/lib/promos';
import { Breadcrumbs, Container, CtaBand, Section } from '@/components/site/blocks';
import { OffersGrid } from '@/components/site/sections';

export const metadata = buildMetadata({
  title: 'Ofertas de Tatuajes en Madrid',
  description:
    'Ofertas de tatuajes en Madrid: 3 mini tattoos por 100 € y media manga por 850 € con precio cerrado y diseño incluido. Reserva por WhatsApp en Saints & Sinners.',
  path: '/ofertas',
  mdSlug: 'ofertas',
  ogTitle: 'Ofertas de tatuajes en Madrid',
  ogKicker: '3 mini tattoos por 100 € · Manga por 850 €',
  keywords: ['ofertas tatuajes Madrid', 'oferta tatuajes Madrid', 'tatuajes baratos Madrid', '2x1 tatuajes Madrid'],
});

export default function OfertasPage() {
  return (
    <>
      <JsonLd
        id="ld-ofertas"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Ofertas de tatuajes en Saints & Sinners Madrid',
          itemListElement: PROMOS.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Offer',
              name: p.title,
              description: p.description,
              price: Number.parseInt(p.price, 10),
              priceCurrency: 'EUR',
              url: `${SITE_URL}${p.href}`,
              seller: { '@id': `${SITE_URL}/#business` },
            },
          })),
        }}
      />

      <section aria-labelledby="ofertas-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Ofertas', path: '/ofertas' }]} />
          <p className="eyebrow mb-6">Ofertas</p>
          <h1 id="ofertas-h1" className="font-display max-w-4xl text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl">
            Ofertas de tatuajes en Madrid
          </h1>
          <p data-tldr className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/90">
            Dos ofertas con precio cerrado y diseño incluido: 3 mini tattoos por 100 € y media manga por 850 €. Mismo estudio, mismos artistas y mismo material que cualquier otra pieza.
          </p>
        </Container>
      </section>

      <Section labelledBy="ofertas-h1">
        <OffersGrid headingLevel="h2" />
        <p className="mt-6 text-sm text-ash">Plazas limitadas cada semana. Consulta disponibilidad por WhatsApp.</p>
      </Section>

      <CtaBand placement="ofertas-final" title="¿Quieres una de las ofertas?" message="Hola, quiero información sobre las ofertas de tatuajes." />
    </>
  );
}
