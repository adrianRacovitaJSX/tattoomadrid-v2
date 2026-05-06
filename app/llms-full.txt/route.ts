import { PAGES } from '@/lib/page-content';
import { SITE_URL } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-static';

// llms-full.txt: concatenado en Markdown de todo el sitio para crawlers de
// LLMs (Anthropic, Mintlify, Cursor lo soportan oficialmente; OpenAI y
// Perplexity lo procesan sin anuncio formal). Coste casi nulo y elimina la
// necesidad de fetch HTML + parseo.
export function GET() {
  const header = `# ${'Saints & Sinners Tattoo Madrid'} — llms-full.txt

> Versión completa en Markdown del sitio web ${SITE_URL}.
> Esta versión está pensada para ser consumida por modelos de lenguaje y
> motores generativos (ChatGPT Search, Perplexity, Claude, Gemini, Copilot).
> Para la versión navegable, visita ${SITE_URL}.

`;

  const body = PAGES.map((page) => {
    const url =
      page.slug === 'index' ? SITE_URL : `${SITE_URL}/${page.slug}`;
    return `<!-- source: ${url} -->\n\n${page.body.trim()}`;
  }).join('\n\n---\n\n');

  return new Response(header + body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
