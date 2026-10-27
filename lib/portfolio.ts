/**
 * Portfolio del estudio. Cada pieza es una foto real de un trabajo hecho en
 * Saints & Sinners. Para añadir piezas de un artista:
 *   1. Sube la imagen (webp, lado largo ≤ 2000 px) a /public/images/artistas/<slug>/
 *   2. Añade una entrada aquí con su `artist`, sus `styles` y sus dimensiones reales.
 * El `alt` describe el trabajo (motivo, técnica, zona): es lo que lee Google Imágenes.
 */

export type StyleSlug = 'realismo' | 'black-and-grey' | 'fine-line' | 'japones';
export type ArtistSlug = 'gamboa' | 'mauri' | 'grietaz';

export type Piece = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  styles: StyleSlug[];
  /** Zona del cuerpo */
  placement: string;
  /** Autor confirmado. Sin autor = trabajo del estudio sin atribuir. */
  artist?: ArtistSlug;
};

export const PIECES: Piece[] = [
  {
    id: 'manga-japonesa-dragon-hannya',
    src: '/IMG_4381.webp',
    width: 1264,
    height: 1574,
    title: 'Dragón y hannya',
    alt: 'Manga japonesa en black and grey con dragón, máscara hannya y flores de cerezo',
    styles: ['japones', 'black-and-grey'],
    placement: 'Brazo completo',
  },
  {
    id: 'manga-realismo-muerte-buho',
    src: '/images/portfolio/gamboa-1.webp',
    width: 880,
    height: 1596,
    title: 'La Muerte y el búho',
    alt: 'Manga completa realista en black and grey con la Muerte encapuchada, rosas y búho',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Brazo completo',
    artist: 'gamboa',
  },
  {
    id: 'espalda-realismo-clasico',
    src: '/IMG_0843.webp',
    width: 1320,
    height: 1702,
    title: 'Espalda completa',
    alt: 'Espalda completa tatuada en realismo black and grey con figuras clásicas y ornamentos',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Espalda',
  },
  {
    id: 'manga-realismo-payaso',
    src: '/images/portfolio/gamboa-3.webp',
    width: 1141,
    height: 1554,
    title: 'Payaso realista',
    alt: 'Tatuaje realista de payaso en black and grey con lettering Caution en brazo y pecho',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Brazo y pecho',
    artist: 'gamboa',
  },
  {
    id: 'pierna-realismo-retrato',
    src: '/AA4A48F6-6483-4F4B-8A71-45887F2B7150.webp',
    width: 1320,
    height: 2346,
    title: 'Retrato en pierna',
    alt: 'Pierna completa en realismo black and grey con retrato de mujer y lettering',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Pierna completa',
  },
  {
    id: 'manga-realismo-retrato-lettering',
    src: '/images/portfolio/gamboa-4.webp',
    width: 1209,
    height: 1623,
    title: 'Retrato y lettering',
    alt: 'Manga realista en black and grey con retrato femenino y lettering',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Brazo completo',
    artist: 'gamboa',
  },
  {
    id: 'antebrazo-dios-griego',
    src: '/resenas-sns/adrian.webp',
    width: 1932,
    height: 2576,
    title: 'Dios griego',
    alt: 'Antebrazo con retrato realista de dios griego en black and grey',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Antebrazo',
  },
  {
    id: 'manga-black-and-grey',
    src: '/images/portfolio/gamboa-2.webp',
    width: 1320,
    height: 2346,
    title: 'Manga black and grey',
    alt: 'Manga completa en black and grey con escena arquitectónica y figuras',
    styles: ['black-and-grey', 'realismo'],
    placement: 'Brazo completo',
    artist: 'gamboa',
  },
  {
    id: 'antebrazo-angel-guerrero',
    src: '/resenas-sns/jorge.webp',
    width: 1932,
    height: 2576,
    title: 'Ángel guerrero',
    alt: 'Antebrazo con ángel guerrero realista en black and grey',
    styles: ['realismo', 'black-and-grey'],
    placement: 'Antebrazo',
  },
  {
    id: 'antebrazo-chicano-lettering',
    src: '/IMG_4380.webp',
    width: 1320,
    height: 2091,
    title: 'Antebrazo con lettering',
    alt: 'Antebrazo en black and grey con figuras realistas y lettering',
    styles: ['black-and-grey'],
    placement: 'Antebrazo',
  },
  {
    id: 'mini-tattoos-fine-line',
    src: '/resenas-sns/esteff.webp',
    width: 1932,
    height: 2576,
    title: 'Mini tattoos fine line',
    alt: 'Seis mini tattoos de línea fina: letras, números, trébol, constelación y símbolos',
    styles: ['fine-line'],
    placement: 'Varias zonas',
  },
];

export function piecesByArtist(artist: ArtistSlug) {
  return PIECES.filter((p) => p.artist === artist);
}

export function piecesByStyle(style: StyleSlug) {
  return PIECES.filter((p) => p.styles.includes(style));
}
