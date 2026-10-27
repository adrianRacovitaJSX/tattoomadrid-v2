import { piecesByArtist, type ArtistSlug, type StyleSlug } from './portfolio';

export type Artist = {
  slug: ArtistSlug;
  name: string;
  /** Una línea: qué hace y por qué elegirle. */
  tagline: string;
  /** Párrafos de bio. Vacío hasta que el artista la confirme. */
  bio: string[];
  styles: StyleSlug[];
  instagram?: string;
  /** Foto del artista. Si falta, la tarjeta usa su mejor pieza como portada. */
  portrait?: string;
};

/**
 * Equipo actual. Lo que no esté confirmado por el estudio se deja vacío:
 * la UI oculta los campos vacíos en vez de inventar contenido.
 */
export const ARTISTS: Artist[] = [
  {
    slug: 'gamboa',
    name: 'Gamboa',
    tagline: 'Realismo y black and grey a gran escala: mangas, espaldas y piezas de proyecto.',
    bio: [
      'Gamboa da nombre a Saints & Sinners by Gamboa. Su trabajo se reconoce por el contraste profundo, las texturas de piel y las composiciones que cubren un brazo o una pierna entera como una sola pieza.',
      'Trabaja por proyecto: primero una consulta para entender la idea, después boceto sobre tu anatomía y sesiones planificadas hasta cerrar la pieza.',
    ],
    styles: ['realismo', 'black-and-grey'],
    instagram: 'https://www.instagram.com/saintsandsinnersmadrid/',
  },
  {
    slug: 'mauri',
    name: 'Mauri',
    tagline: 'Portfolio en preparación.',
    bio: [],
    styles: [],
  },
  {
    slug: 'grietaz',
    name: 'Grietaz',
    tagline: 'Portfolio en preparación.',
    bio: [],
    styles: [],
  },
];

export function getArtist(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}

/** Un artista se indexa y se destaca solo cuando tiene trabajos publicados. */
export function artistIsReady(artist: Artist) {
  return piecesByArtist(artist.slug).length >= 3;
}

export function artistCover(artist: Artist) {
  return artist.portrait ?? piecesByArtist(artist.slug)[0]?.src;
}
