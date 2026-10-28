import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/json-ld';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { STYLES, getStyle } from '@/lib/styles';
import { piecesByStyle } from '@/lib/portfolio';
import { ARTISTS } from '@/lib/artists';
import { Breadcrumbs, Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';
import { buttonClasses } from '@/components/site/button-classes';
import PortfolioGrid from '@/components/site/portfolio-grid';
import ArtistCard from '@/components/site/artist-card';
import { ProcessSteps } from '@/components/site/sections';

type Props = { params: Promise<{ estilo: string }> };

export function generateStaticParams() {
  return STYLES.map((s) => ({ estilo: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { estilo } = await params;
  const style = getStyle(estilo);
  if (!style) return {};
  const cover = piecesByStyle(style.slug)[0];
  return buildMetadata({
    title: style.metaTitle,
    description: style.metaDescription,
    path: `/tatuajes/${style.slug}`,
    mdSlug: `tatuajes/${style.slug}`,
    image: cover ? `${SITE_URL}${cover.src}` : undefined,
    keywords: [style.h1.toLowerCase(), `tatuador ${style.name.toLowerCase()} Madrid`],
  });
}

export default async function EstiloPage({ params }: Props) {
  const { estilo } = await params;
  const style = getStyle(estilo);
  if (!style) notFound();

  const pieces = piecesByStyle(style.slug);
  const artists = ARTISTS.filter((a) => a.styles.includes(style.slug));
  const others = STYLES.filter((s) => s.slug !== style.slug);
  const message = `Hola, quiero pedir presupuesto para un tatuaje ${style.name.toLowerCase()}.`;

  return (
    <>
      <JsonLd
        id="ld-service"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: style.h1,
          serviceType: `Tatuaje ${style.name}`,
          description: style.lead,
          url: `${SITE_URL}/tatuajes/${style.slug}`,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: { '@type': 'City', name: 'Madrid' },
          ...(pieces.length ? { image: pieces.slice(0, 4).map((p) => `${SITE_URL}${p.src}`) } : {}),
        }}
      />

      <section aria-labelledby="estilo-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Trabajos', path: '/tatuajes' },
              { name: style.name, path: `/tatuajes/${style.slug}` },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">Estilo · {style.name}</p>
              <h1 id="estilo-h1" className="font-display text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl">
                {style.h1}
              </h1>
              <p data-tldr className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/90">
                {style.lead}
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <WhatsAppLink placement={`estilo-${style.slug}-hero`} message={message} size="lg" />
              <Link href="/precios" className={buttonClasses('ghost')}>
                Ver precios
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {pieces.length > 0 && (
        <Section labelledBy="galeria-title">
          <h2 id="galeria-title" className="sr-only">
            Trabajos de {style.name.toLowerCase()} hechos en el estudio
          </h2>
          <PortfolioGrid pieces={pieces} priorityCount={2} />
        </Section>
      )}

      <Section labelledBy="sobre-title" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="sobre-title" className="font-display text-4xl leading-tight text-bone lg:col-span-4">
            Cómo trabajamos el {style.name.toLowerCase()}
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-ash lg:col-span-8">
            {style.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {artists.length > 0 && (
        <Section labelledBy="artistas-estilo-title" className="border-t border-line">
          <SectionHeader id="artistas-estilo-title" eyebrow="Especialistas" title={`Quién tatúa ${style.name.toLowerCase()}`} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((a) => (
              <li key={a.slug}>
                <ArtistCard artist={a} index={ARTISTS.indexOf(a)} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section labelledBy="proceso-title" className="border-t border-line">
        <SectionHeader id="proceso-title" eyebrow="Cómo funciona" title="Pedir cita es fácil" />
        <ProcessSteps />
      </Section>

      <Section labelledBy="faq-title" className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title={`Preguntas sobre ${style.name.toLowerCase()}`} />
          <FaqList items={style.faqs} schemaId="ld-faq-estilo" />
        </div>
      </Section>

      <CtaBand placement={`estilo-${style.slug}-final`} message={message} />

      <Section labelledBy="otros-estilos-title">
        <h2 id="otros-estilos-title" className="eyebrow mb-6">
          Otros estilos
        </h2>
        <ul className="flex flex-wrap gap-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/tatuajes/${s.slug}`} className="inline-flex h-11 items-center rounded-full border border-line px-5 text-bone/80 hover:border-gold hover:text-gold">
                {s.h1}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
