import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { ARTISTS, artistCover, artistIsReady } from '@/lib/artists';
import { piecesByArtist } from '@/lib/portfolio';
import { STYLES } from '@/lib/styles';
import { Breadcrumbs, Container, CtaBand } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';

export const metadata = buildMetadata({
  title: 'Tatuadores en Madrid: Nuestros Artistas',
  description:
    'Conoce a los tatuadores de Saints & Sinners en Madrid: Gamboa, Mauri y Grietaz. Mira el portfolio de cada artista y reserva con quien encaje con tu idea.',
  path: '/artistas',
  ogTitle: 'Los artistas de Saints & Sinners',
  ogKicker: 'Tatuadores en Madrid',
  keywords: ['tatuadores Madrid', 'mejores tatuadores de Madrid', 'tatuador realismo Madrid'],
});

export default function ArtistasPage() {
  return (
    <>
      <section aria-labelledby="artistas-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: 'Artistas', path: '/artistas' }]} />
          <p className="eyebrow mb-6">El equipo</p>
          <h1 id="artistas-h1" className="font-display max-w-5xl text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl lg:text-8xl">
            Tatuadores en Madrid con estilo propio
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
            En Saints &amp; Sinners cada artista tiene su especialidad. Elige por su trabajo, no por disponibilidad: te ponemos con quien mejor encaja con tu idea.
          </p>
        </Container>
      </section>

      <ol className="mt-16 border-t border-line lg:mt-24">
        {ARTISTS.map((artist, i) => {
          const pieces = piecesByArtist(artist.slug);
          const cover = artistCover(artist);
          const ready = artistIsReady(artist);
          const styles = artist.styles.map((s) => STYLES.find((st) => st.slug === s)?.name).filter(Boolean);
          return (
            <li key={artist.slug} className="border-b border-line">
              <Container className="grid gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
                <div className="lg:col-span-5">
                  <p className="tabular text-sm text-ash">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="font-display mt-4 text-7xl leading-none tracking-tight text-bone sm:text-8xl lg:text-9xl">
                    <Link href={`/artistas/${artist.slug}`} className="hover:text-gold">
                      {artist.name}
                    </Link>
                  </h2>
                  {styles.length > 0 && <p className="eyebrow mt-6">{styles.join(' · ')}</p>}
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-ash">
                    {ready ? artist.tagline : 'Estamos preparando su portfolio. Mientras tanto, escríbenos y te enseñamos sus trabajos por WhatsApp.'}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <WhatsAppLink placement={`artistas-${artist.slug}`} message={`Hola, quiero pedir presupuesto con ${artist.name}.`}>
                      Reservar con {artist.name}
                    </WhatsAppLink>
                    <Link href={`/artistas/${artist.slug}`} className="inline-flex h-11 items-center gap-1 px-1 text-sm font-medium text-gold hover:underline">
                      Ver portfolio <ArrowUpRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {pieces.length > 0 ? (
                    <ul className="grid grid-cols-3 gap-2 sm:gap-3">
                      {pieces.slice(0, 3).map((p, j) => (
                        <li key={p.id} className={j === 0 ? 'col-span-2 row-span-2' : ''}>
                          <Link href={`/artistas/${artist.slug}`} className="relative block h-full min-h-40 overflow-hidden rounded-[4px] bg-surface-1">
                            <Image
                              src={p.src}
                              alt={p.alt}
                              width={p.width}
                              height={p.height}
                              sizes={j === 0 ? '(min-width: 1024px) 38vw, 66vw' : '(min-width: 1024px) 19vw, 33vw'}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[4px] border border-dashed border-line bg-surface-1">
                      {cover ? null : (
                        <span aria-hidden className="font-display text-[12rem] leading-none text-line">
                          {artist.name[0]}
                        </span>
                      )}
                      <span className="absolute bottom-5 left-5 rounded-full border border-bone/20 px-3 py-1 text-xs text-bone/80">
                        Portfolio en camino
                      </span>
                    </div>
                  )}
                </div>
              </Container>
            </li>
          );
        })}
      </ol>

      <CtaBand
        placement="artistas-final"
        title="¿No sabes con quién?"
        text="Cuéntanos tu idea y te recomendamos el artista que mejor encaja con tu estilo y tu presupuesto."
        message="Hola, tengo una idea de tatuaje y no sé con qué artista hacerla."
      />
    </>
  );
}
