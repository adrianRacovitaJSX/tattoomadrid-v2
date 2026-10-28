/**
 * Enlace comercial de cada post del blog. Los posts informativos apoyan a la
 * página que debe posicionar para esa búsqueda (evita que compitan entre sí):
 * el post enlaza con el texto de la búsqueda a su página comercial.
 */
type CommercialLink = { href: string; label: string };

const RULES: { test: RegExp; link: CommercialLink }[] = [
  { test: /precio|cuesta|barato/, link: { href: '/precios', label: 'Precios de tatuajes en Madrid' } },
  { test: /tatuadores|elegir/, link: { href: '/artistas', label: 'Tatuadores en Madrid' } },
  { test: /realis/, link: { href: '/tatuajes/realismo', label: 'Tatuajes realistas en Madrid' } },
  { test: /blackwork|black/, link: { href: '/tatuajes/black-and-grey', label: 'Tatuajes black and grey en Madrid' } },
  { test: /minimal|pequen|fine|mariposa|simbolo|significado/, link: { href: '/tatuajes/fine-line', label: 'Tatuajes fine line en Madrid' } },
  { test: /japon/, link: { href: '/tatuajes/japones', label: 'Tatuajes japoneses en Madrid' } },
  { test: /piercing/, link: { href: '/piercing-madrid', label: 'Piercing en Madrid' } },
  { test: /estudio|madrid-centro/, link: { href: '/', label: 'Estudio de tatuajes en Madrid' } },
];

export function commercialLinkForPost(slug: string): CommercialLink {
  return RULES.find((r) => r.test.test(slug))?.link ?? { href: '/tatuajes', label: 'Tatuajes en Madrid: trabajos reales' };
}
