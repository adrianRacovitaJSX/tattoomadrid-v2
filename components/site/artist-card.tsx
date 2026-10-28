import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { type Artist, artistCover, artistIsReady } from '@/lib/artists';
import { piecesByArtist } from '@/lib/portfolio';
import { STYLES } from '@/lib/styles';

export default function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const cover = artistCover(artist);
  const count = piecesByArtist(artist.slug).length;
  const ready = artistIsReady(artist);
  const styles = artist.styles.map((s) => STYLES.find((st) => st.slug === s)?.name).filter(Boolean);

  return (
    <Link
      href={`/artistas/${artist.slug}`}
      className="group relative block overflow-hidden rounded-[4px] bg-surface-1 focus-visible:outline-offset-4"
    >
      <div className="relative aspect-[4/5]">
        {cover ? (
          <Image
            src={cover}
            alt={`Trabajo de ${artist.name}, tatuador en Saints & Sinners Madrid`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#2a2a2e,transparent_60%)]">
            <span className="font-display text-[10rem] leading-none text-line">{artist.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <span className="tabular absolute left-5 top-5 text-sm text-bone/70">{String(index + 1).padStart(2, '0')}</span>
        {!ready && (
          <span className="absolute right-5 top-5 rounded-full border border-bone/20 px-3 py-1 text-xs text-bone/80">
            Portfolio en camino
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-5xl leading-none tracking-tight text-bone sm:text-6xl">{artist.name}</h3>
          <ArrowUpRight
            aria-hidden
            className="size-8 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>
        {ready && <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/80">{artist.tagline}</p>}
        {(styles.length > 0 || count > 0) && (
          <p className="eyebrow mt-4 text-[0.7rem]">
            {[...styles, count > 0 ? `${count} trabajos` : null].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}
