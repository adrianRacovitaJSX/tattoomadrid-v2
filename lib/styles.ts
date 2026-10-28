import type { StyleSlug } from './portfolio';

export type TattooStyle = {
  slug: StyleSlug;
  name: string;
  /** H1 de la página /tatuajes/[slug] */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Primera frase: respuesta directa (AI Overviews / snippets). */
  lead: string;
  body: string[];
  faqs: { question: string; answer: string }[];
};

export const STYLES: TattooStyle[] = [
  {
    slug: 'realismo',
    name: 'Realismo',
    h1: 'Tatuajes realistas en Madrid',
    metaTitle: 'Tatuajes Realistas en Madrid',
    metaDescription:
      'Tatuajes realistas en Madrid: retratos, animales y mangas completas en black and grey. Mira trabajos reales del estudio y pide presupuesto por WhatsApp.',
    lead: 'El realismo reproduce en la piel una imagen con volumen, luz y textura de fotografía; en Saints & Sinners es la especialidad del estudio.',
    body: [
      'Funciona mejor en piezas medianas y grandes: un antebrazo, una manga o una espalda dan espacio para el detalle que hace creíble un retrato.',
      'Cada proyecto empieza con una consulta para elegir referencias de calidad, adaptar la composición a tu anatomía y planificar las sesiones.',
    ],
    faqs: [
      {
        question: '¿Qué tamaño mínimo necesita un tatuaje realista?',
        answer:
          'Para que el detalle envejezca bien recomendamos piezas medianas o grandes. En la consulta valoramos el tamaño según la referencia y la zona.',
      },
      {
        question: '¿Cuántas sesiones lleva una manga realista?',
        answer:
          'Depende del diseño y de la zona. En la consulta te damos una estimación de sesiones y un presupuesto antes de empezar.',
      },
    ],
  },
  {
    slug: 'black-and-grey',
    name: 'Black and grey',
    h1: 'Tatuajes black and grey en Madrid',
    metaTitle: 'Tatuajes Black and Grey en Madrid',
    metaDescription:
      'Tatuajes black and grey en Madrid: degradados en negro y grises para mangas, espaldas y piezas de proyecto. Trabajos reales y presupuesto por WhatsApp.',
    lead: 'El black and grey trabaja solo con tinta negra diluida en grises, lo que da degradados suaves y un envejecimiento muy estable.',
    body: [
      'Es la técnica de la mayoría de mangas y espaldas del estudio: permite unir varias figuras en una composición continua.',
      'Combina con realismo, lettering y ornamentación, y se adapta a cualquier tono de piel.',
    ],
    faqs: [
      {
        question: '¿El black and grey se borra antes que el color?',
        answer:
          'No. Al trabajar con tinta negra, bien hecho y bien cuidado mantiene el contraste durante años.',
      },
    ],
  },
  {
    slug: 'fine-line',
    name: 'Fine line',
    h1: 'Tatuajes fine line y mini tattoos en Madrid',
    metaTitle: 'Tatuajes Fine Line en Madrid',
    metaDescription:
      'Tatuajes de línea fina y mini tattoos en Madrid: letras, símbolos, fechas y constelaciones. Oferta 3 mini tattoos por 100 €. Reserva por WhatsApp.',
    lead: 'El fine line usa agujas muy finas para trazos delicados: letras, símbolos, fechas o constelaciones en tamaño pequeño.',
    body: [
      'Es el estilo más pedido para un primer tatuaje: sesiones cortas y diseños discretos.',
      'Si quieres varios, la oferta de 3 mini tattoos por 100 € incluye diseño y se hacen en la misma cita.',
    ],
    faqs: [
      {
        question: '¿Duele un tatuaje fine line?',
        answer:
          'Al ser piezas pequeñas y de trazo fino la sesión es corta. La sensación depende sobre todo de la zona.',
      },
    ],
  },
  {
    slug: 'japones',
    name: 'Japonés',
    h1: 'Tatuajes japoneses en Madrid',
    metaTitle: 'Tatuajes Japoneses en Madrid',
    metaDescription:
      'Tatuajes de inspiración japonesa en Madrid: dragones, máscaras hannya, flores de cerezo y mangas completas. Mira trabajos reales y pide presupuesto.',
    lead: 'El tatuaje japonés usa motivos tradicionales (dragones, hannya, koi, flores de cerezo) organizados para fluir con el cuerpo.',
    body: [
      'Es un estilo pensado para piezas grandes: mangas, espaldas o piernas donde el fondo une todos los elementos.',
      'Lo trabajamos tanto en color como en black and grey.',
    ],
    faqs: [
      {
        question: '¿Se puede hacer un tatuaje japonés pequeño?',
        answer:
          'Sí, aunque el estilo luce más en piezas grandes. En la consulta vemos cómo adaptar el motivo a la zona.',
      },
    ],
  },
];

export function getStyle(slug: string) {
  return STYLES.find((s) => s.slug === slug);
}
