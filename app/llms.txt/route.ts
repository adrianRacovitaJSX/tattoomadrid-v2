import { PAGES } from '@/lib/page-content';
import { BUSINESS, SITE_URL } from '@/lib/seo';
import { ADDRESS_LINE } from '@/lib/contact';

export const dynamic = 'force-static';

// llms.txt (llmstxt.org): índice para motores generativos. Se genera desde
// lib/page-content, así que siempre lista las páginas comerciales vigentes.
export function GET() {
  const pages = PAGES.map((p) => `- [${p.title}](${SITE_URL}/md/${p.slug}): ${p.description}`).join('\n');

  const body = `# ${BUSINESS.name}

> Estudio de tatuajes y piercing en Madrid (Ciudad Lineal) desde ${BUSINESS.founded}. Especialistas en realismo y black and grey. Tatuajes desde 70 € con diseño incluido; piercing desde 30 €.

- Web: ${SITE_URL}
- Dirección: ${ADDRESS_LINE}
- Teléfono y WhatsApp: ${BUSINESS.phone}
- Email: ${BUSINESS.email}
- Instagram: ${BUSINESS.instagram}
- TikTok: ${BUSINESS.tiktok}

## Páginas

${pages}

## Blog

- [Artículos](${SITE_URL}/md/blog): cuidados, dolor por zona y estilos de tatuaje.

## Optional

- [Todo el contenido en un archivo](${SITE_URL}/llms-full.txt)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
