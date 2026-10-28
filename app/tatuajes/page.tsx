import JsonLd from '@/components/json-ld';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { ARTISTS } from '@/lib/artists';
import { PIECES } from '@/lib/portfolio';
import { Breadcrumbs, Container, CtaBand, Section, SectionHeader } from '@/components/site/blocks';
import PortfolioGrid from '@/components/site/portfolio-grid';
import { StyleCards } from '@/components/site/sections';

export const metadata = buildMetadata({
  title: 'Tatuajes en Madrid: Trabajos Reales',
  description:
    'Galería de tatuajes hechos en Saints & Sinners, Madrid: mangas realistas, black and grey, japonés y fine line. Filtra por estilo y pide presupuesto por WhatsApp.',
  path: '/tatuajes',
  mdSlug: 'tatuajes',
  ogTitle: 'Trabajos reales del estudio',
  ogKicker: 'Tatuajes en Madrid',
  keywords: ['tatuajes Madrid', 'portfolio tatuajes Madrid', 'mangas tatuaje Madrid'],
});

export default function TatuajesPage() {
  return (
    <>
      <JsonLd
        id="ld-gallery"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Tatuajes hechos en Saints & Sinners Madrid',
          url: `${SITE_URL}/tatuajes`,
          about: { '@id': `${SITE_URL}/#business` },
          image: PIECES.map((p) => ({
            '@type': 'ImageObject',
            contentUrl: `${SITE_URL}${p.src}`,
            name: p.title,
            caption: p.alt,
            width: p.width,
            height: p.height,
            ...(p.artist
              ? { creator: { '@type': 'Person', name: ARTISTS.find((a) => a.slug === p.artist)?.name } }
              : { creator: { '@id': `${SITE_URL}/#business` } }),
            copyrightHolder: { '@id': `${SITE_URL}/#business` },
          })),
        }}
      />
      <section aria-labelledby="tatuajes-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Trabajos', path: '/tatuajes' }]} />
          <SectionHeader
            as="h1"
            id="tatuajes-h1"
            eyebrow="Portfolio"
            title="Tatuajes hechos en nuestro estudio de Madrid"
            intro="Todas las fotos son trabajos reales de Saints & Sinners. Filtra por estilo, toca una pieza para verla en grande y escríbenos con la que más se acerque a tu idea."
          />
          <PortfolioGrid pieces={PIECES} filters priorityCount={4} />
        </Container>
      </section>

      <Section labelledBy="estilos-title" className="mt-12 border-t border-line">
        <SectionHeader id="estilos-title" eyebrow="Por estilo" title="Explora cada estilo" />
        <StyleCards />
      </Section>

      <CtaBand placement="tatuajes-final" message="Hola, he visto vuestros trabajos y quiero pedir presupuesto." />
    </>
  );
}
