'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Piece } from '@/lib/portfolio';
import { ARTISTS } from '@/lib/artists';
import { STYLES } from '@/lib/styles';
import { track } from './track';

type Props = {
  pieces: Piece[];
  /** Muestra los filtros por estilo encima de la rejilla. */
  filters?: boolean;
  /** Prioriza la carga de las primeras imágenes (cuando la rejilla está arriba). */
  priorityCount?: number;
  className?: string;
};

const artistName = (slug?: string) => ARTISTS.find((a) => a.slug === slug)?.name;

export default function PortfolioGrid({ pieces, filters = false, priorityCount = 0, className }: Props) {
  const [style, setStyle] = useState<string>('todos');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const availableStyles = STYLES.filter((s) => pieces.some((p) => p.styles.includes(s.slug)));
  const visible = style === 'todos' ? pieces : pieces.filter((p) => p.styles.includes(style as Piece['styles'][number]));

  const open = (i: number) => {
    setOpenIndex(i);
    track('portfolio_open', { piece: visible[i].id });
  };
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIndex, step]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <div className={className}>
      {filters && availableStyles.length > 1 && (
        <div role="group" aria-label="Filtrar por estilo" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {[{ slug: 'todos', name: 'Todos' }, ...availableStyles].map((s) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={style === s.slug}
              onClick={() => {
                setStyle(s.slug);
                track('portfolio_filter', { style: s.slug });
              }}
              className={cn(
                'h-10 shrink-0 cursor-pointer rounded-full border px-4 text-sm transition-colors',
                style === s.slug ? 'border-gold bg-gold text-ink' : 'border-line text-bone/80 hover:border-bone/40'
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {visible.map((piece, i) => (
          <li key={piece.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[4px] bg-surface-1 text-left"
              aria-label={`Ampliar: ${piece.title}`}
            >
              <Image
                src={piece.src}
                alt={piece.alt}
                width={piece.width}
                height={piece.height}
                sizes="(min-width: 1024px) 400px, 50vw"
                priority={i < priorityCount}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 text-sm opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                <span className="block font-medium text-bone">{piece.title}</span>
                <span className="block text-xs text-ash">
                  {[piece.placement, artistName(piece.artist)].filter(Boolean).join(' · ')}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === dialogRef.current && close()}
        aria-label={current?.title}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-bone backdrop:bg-ink/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="text-sm">
                <span className="font-medium">{current.title}</span>
                <span className="text-ash">
                  {' '}
                  · {[current.placement, artistName(current.artist)].filter(Boolean).join(' · ')}
                </span>
              </p>
              <button type="button" onClick={close} aria-label="Cerrar" className="flex size-11 cursor-pointer items-center justify-center">
                <X className="size-6" />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Anterior"
                    className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/70"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Siguiente"
                    className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ink/70"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>
            <p className="px-4 py-3 text-center text-xs text-ash tabular">
              {(openIndex ?? 0) + 1} / {visible.length}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
