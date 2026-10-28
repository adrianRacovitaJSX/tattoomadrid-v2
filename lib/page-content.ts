// Contenido en Markdown de las páginas comerciales — fuente para llms.txt,
// llms-full.txt y /md/[slug]. Se genera desde los mismos datos que la web
// (precios, estilos, artistas, horario, FAQ), así que no se desincroniza.
// Las rutas /md/blog y /md/blog/<slug> se sirven desde Sanity.

import { BUSINESS, SITE_URL } from './seo';
import { ADDRESS_LINE, HOURS_LINES } from './contact';
import { SERVICE_PRICES, DEPOSIT } from './services';
import { STYLES } from './styles';
import { ARTISTS, artistIsReady } from './artists';
import { PIECES, piecesByArtist, piecesByStyle } from './portfolio';
import { PROMOS } from './promos';
import { CONTACT_FAQS, HOME_FAQS } from './faqs';

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  body: string;
};

const url = (path: string) => `${SITE_URL}${path}`;
const faqMd = (faqs: { question: string; answer: string }[]) =>
  faqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n');

const hoursMd = HOURS_LINES.map((h) => `- ${h.days}: ${h.time}`).join('\n');

const nap = `## Dónde estamos

- Dirección: ${ADDRESS_LINE} (Ciudad Lineal)
- Teléfono y WhatsApp: ${BUSINESS.phone}
- Email: ${BUSINESS.email}

Horario:
${hoursMd}`;

const pricesTable = [
  '| Servicio | Desde | Duración | Sesiones | Cuidados |',
  '| --- | --- | --- | --- | --- |',
  ...SERVICE_PRICES.map((s) => `| ${s.servicio} | ${s.desde} | ${s.duracion} | ${s.sesiones} | ${s.cuidados} |`),
].join('\n');

const offersMd = PROMOS.map((p) => `- **${p.title}: ${p.price}** (${p.priceNote}). ${p.description} [Ver oferta](${url(p.href)})`).join('\n');

const readyArtists = ARTISTS.filter(artistIsReady);

const HOME_MD = `# Saints & Sinners Tattoo Madrid — Estudio de tatuajes en Madrid desde ${BUSINESS.founded}

> Estudio de tatuajes y piercing en Ciudad Lineal, Madrid, abierto desde ${BUSINESS.founded}. Especialistas en realismo y black and grey: mangas, espaldas y proyectos a medida. Tatuajes desde 70 € con diseño incluido.

## Estilos

${STYLES.map((s) => `- [${s.h1}](${url(`/tatuajes/${s.slug}`)}): ${s.lead}`).join('\n')}

## Artistas

${ARTISTS.map((a) => `- [${a.name}](${url(`/artistas/${a.slug}`)})${artistIsReady(a) ? `: ${a.tagline}` : ''}`).join('\n')}

## Ofertas

${offersMd}

## Precios orientativos

${pricesTable}

## Preguntas frecuentes

${faqMd(HOME_FAQS)}

${nap}`;

const TATUAJES_MD = `# Tatuajes en Madrid: trabajos reales de Saints & Sinners

> Galería de ${PIECES.length} tatuajes hechos en el estudio, en ${STYLES.map((s) => s.name.toLowerCase()).join(', ')}.

${PIECES.map((p) => `- ${p.title} (${p.placement}): ${p.alt}.`).join('\n')}

Estilos: ${STYLES.map((s) => `[${s.name}](${url(`/tatuajes/${s.slug}`)})`).join(' · ')}`;

const styleMd = (slug: (typeof STYLES)[number]['slug']) => {
  const s = STYLES.find((st) => st.slug === slug)!;
  const pieces = piecesByStyle(slug);
  return `# ${s.h1}

> ${s.lead}

${s.body.join('\n\n')}

## Trabajos de ${s.name.toLowerCase()} en el estudio

${pieces.map((p) => `- ${p.title} (${p.placement}): ${p.alt}.`).join('\n')}

## Preguntas frecuentes

${faqMd(s.faqs)}

Pide presupuesto por WhatsApp al ${BUSINESS.phone} o en ${url('/reservar')}.`;
};

const ARTISTAS_MD = `# Tatuadores de Saints & Sinners en Madrid

> El equipo de Saints & Sinners: ${ARTISTS.map((a) => a.name).join(', ')}. Cada artista tiene su especialidad; si no sabes con quién, te recomendamos.

${readyArtists.map((a) => `## [${a.name}](${url(`/artistas/${a.slug}`)})\n\n${a.tagline}\n\n${a.bio.join('\n\n')}`).join('\n\n')}`;

const artistMd = (slug: string) => {
  const a = ARTISTS.find((ar) => ar.slug === slug)!;
  return `# ${a.name}, tatuador en Madrid

> ${a.tagline}

${a.bio.join('\n\n')}

## Trabajos

${piecesByArtist(a.slug).map((p) => `- ${p.title} (${p.placement}): ${p.alt}.`).join('\n')}`;
};

const PRECIOS_MD = `# ¿Cuánto cuesta un tatuaje en Madrid?

> En Saints & Sinners los tatuajes empiezan en 70 € con el diseño incluido. El precio final depende del tamaño, el detalle y la zona; damos presupuesto cerrado antes de empezar. Para reservar fecha se deja una señal de ${DEPOSIT} que se descuenta del total.

${pricesTable}

## Ofertas con precio cerrado

${offersMd}

## Qué influye en el precio

- Tamaño: más superficie, más horas.
- Detalle y estilo: el realismo lleva más tiempo que la línea fina.
- Zona del cuerpo: costillas, manos o cuello son más lentas.
- Sesiones: las piezas grandes se planifican por sesiones.`;

const OFERTAS_MD = `# Ofertas de tatuajes en Madrid

> Ofertas con precio cerrado y diseño incluido en Saints & Sinners. Plazas limitadas cada semana.

${offersMd}`;

const piercing = SERVICE_PRICES.find((s) => s.id === 'piercing')!;
const PIERCING_MD = `# Piercing en Madrid

> Piercings desde ${piercing.desde} en el estudio de Ciudad Lineal, con joyería de titanio, agujas de un solo uso y guía de cuidados.

- Duración: ${piercing.duracion}
- Cuidados: ${piercing.cuidados}

${nap}`;

const SERVICIOS_MD = `# Servicios de Saints & Sinners en Madrid

> Tatuaje, piercing, micropigmentación y eliminación láser en el mismo estudio, con presupuesto antes de empezar.

${pricesTable}

## Higiene

Material de un solo uso abierto delante del cliente, cabina esterilizada y licencia sanitaria de la Comunidad de Madrid.`;

const RESERVAR_MD = `# Pedir cita en Saints & Sinners Tattoo Madrid

> La forma más rápida es WhatsApp (${BUSINESS.phone}): envía la idea, la zona y una foto de referencia. También hay formulario en ${url('/reservar')}.

## Señal y pagos

Para reservar fecha se deja una señal de ${DEPOSIT} que se descuenta del precio final. Aceptamos efectivo, tarjeta y Bizum.

## Preguntas frecuentes

${faqMd(CONTACT_FAQS)}

${nap}`;

export const PAGES: PageContent[] = [
  { slug: 'index', title: 'Saints & Sinners Tattoo Madrid', description: 'Estudio de tatuajes en Madrid desde 2008.', body: HOME_MD },
  { slug: 'tatuajes', title: 'Tatuajes en Madrid: trabajos reales', description: 'Galería de trabajos del estudio por estilo.', body: TATUAJES_MD },
  ...STYLES.map((s) => ({
    slug: `tatuajes/${s.slug}`,
    title: s.h1,
    description: s.lead,
    body: styleMd(s.slug),
  })),
  { slug: 'artistas', title: 'Tatuadores de Saints & Sinners', description: 'El equipo de artistas del estudio.', body: ARTISTAS_MD },
  ...readyArtists.map((a) => ({
    slug: `artistas/${a.slug}`,
    title: `${a.name}, tatuador en Madrid`,
    description: a.tagline,
    body: artistMd(a.slug),
  })),
  { slug: 'precios', title: 'Precios de tatuajes en Madrid', description: 'Precios orientativos, señal y ofertas.', body: PRECIOS_MD },
  { slug: 'ofertas', title: 'Ofertas de tatuajes en Madrid', description: 'Ofertas con precio cerrado.', body: OFERTAS_MD },
  { slug: 'piercing-madrid', title: 'Piercing en Madrid', description: 'Piercing desde 30 € en Ciudad Lineal.', body: PIERCING_MD },
  { slug: 'servicios', title: 'Servicios del estudio', description: 'Tatuaje, piercing, micropigmentación y láser.', body: SERVICIOS_MD },
  { slug: 'reservar', title: 'Pedir cita', description: 'WhatsApp, formulario, señal y pagos.', body: RESERVAR_MD },
];

export function findPage(slug: string): PageContent | undefined {
  return PAGES.find((p) => p.slug === slug);
}
