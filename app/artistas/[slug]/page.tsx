import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import JsonLd from '@/components/json-ld';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { ARTISTS, artistCover, artistIsReady, getArtist } from '@/lib/artists';
import { piecesByArtist } from '@/lib/portfolio';
import { STYLES } from '@/lib/styles';
import { Breadcrumbs, Container, CtaBand, Section, SectionHeader } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';
import PortfolioGrid from '@/components/site/portfolio-grid';
import ArtistCard from '@/components/site/artist-card';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTISTS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};
  return buildMetadata({
    title: `${artist.name}, tatuador en Madrid`,
    description: artistIsReady(artist)
      ? `${artist.tagline} Mira el portfolio de ${artist.name} en Saints & Sinners Madrid y reserva por WhatsApp.`
      : `${artist.name} tatúa en Saints & Sinners, estudio de tatuajes en Madrid. Escríbenos para ver sus trabajos y reservar.`,
    path: `/artistas/${artist.slug}`,
    mdSlug: artistIsReady(artist) ? `artistas/${artist.slug}` : undefined,
    image: artistCover(artist) ? `${SITE_URL}${artistCover(artist)}` : undefined,
    type: 'profile',
    // Sin portfolio publicado la página es contenido escaso: no se indexa hasta tenerlo.
    noindex: !artistIsReady(artist),
  });
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const pieces = piecesByArtist(artist.slug);
  const ready = artistIsReady(artist);
  const cover = artistCover(artist);
  const styles = artist.styles.map((s) => STYLES.find((st) => st.slug === s)).filter((s) => s !== undefined);
  const others = ARTISTS.filter((a) => a.slug !== artist.slug);
  const message = `Hola, quiero pedir presupuesto con ${artist.name}.`;

  return (
    <>
      <JsonLd
        id="ld-person"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: artist.name,
          jobTitle: 'Tatuador',
          url: `${SITE_URL}/artistas/${artist.slug}`,
          ...(cover ? { image: `${SITE_URL}${cover}` } : {}),
          ...(artist.instagram ? { sameAs: [artist.instagram] } : {}),
          ...(styles.length ? { knowsAbout: styles.map((s) => s.h1) } : {}),
          worksFor: { '@id': `${SITE_URL}/#business` },
        }}
      />

      <section aria-labelledby="artista-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Artistas', path: '/artistas' },
              { name: artist.name, path: `/artistas/${artist.slug}` },
            ]}
          />
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">Tatuador en Saints &amp; Sinners</p>
              <h1 id="artista-h1" className="font-display text-7xl leading-[0.95] tracking-tight text-bone sm:text-8xl lg:text-[10rem]">
                {artist.name}
              </h1>
              <p className="mt-8 max-w-xl text-xl leading-relaxed text-bone/90">
                {ready ? artist.tagline : 'Su portfolio llega muy pronto a la web. Mientras tanto, te enseñamos sus trabajos por WhatsApp.'}
              </p>
              {styles.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {styles.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/tatuajes/${s.slug}`} className="inline-flex h-9 items-center rounded-full border border-line px-4 text-sm text-bone/80 hover:border-gold hover:text-gold">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <WhatsAppLink placement={`artista-${artist.slug}-hero`} message={message} size="lg">
                  Reservar con {artist.name}
                </WhatsAppLink>
                {artist.instagram && (
                  <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-1 px-2 font-medium text-gold hover:underline">
                    Instagram <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                )}
              </div>
            </div>
            {cover && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-surface-1 lg:col-span-5">
                <Image src={cover} alt={pieces[0]?.alt ?? `Retrato de ${artist.name}`} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
        </Container>
      </section>

      {artist.bio.length > 0 && (
        <Section labelledBy="bio-title">
          <div className="grid gap-10 lg:grid-cols-12">
            <h2 id="bio-title" className="eyebrow lg:col-span-4">
              Sobre {artist.name}
            </h2>
            <div className="space-y-6 text-xl leading-relaxed text-bone/90 lg:col-span-8">
              {artist.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Section>
      )}

      {pieces.length > 0 && (
        <Section labelledBy="portfolio-title" className="border-t border-line">
          <SectionHeader id="portfolio-title" eyebrow="Portfolio" title={`Trabajos de ${artist.name}`} />
          <PortfolioGrid pieces={pieces} />
        </Section>
      )}

      <CtaBand
        placement={`artista-${artist.slug}-final`}
        title={`Reserva con ${artist.name}`}
        text="Mándanos tu idea, la zona y una referencia. Te respondemos con propuesta, precio y fechas."
        message={message}
      />

      <Section labelledBy="otros-title">
        <SectionHeader id="otros-title" eyebrow="El equipo" title="Otros artistas" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {others.map((a) => (
            <li key={a.slug}>
              <ArtistCard artist={a} index={ARTISTS.indexOf(a)} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
