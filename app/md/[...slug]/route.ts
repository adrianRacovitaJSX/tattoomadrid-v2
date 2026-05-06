import { PAGES, findPage } from '@/lib/page-content';
import { SITE_URL } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const dynamicParams = false;

// Servimos versiones .md individuales por página. La estrategia "raw markdown
// URLs" (Mintlify, Anthropic, Cursor) reduce hasta 10x los tokens vs HTML y
// es el formato preferido por LLMs.
//
// Rutas generadas:
//   /md/index             → home
//   /md/servicios         → /servicios
//   /md/reservar          → /reservar
//   /md/contacto          → /contacto
//   /md/blog              → /blog
//   /md/blog/<slug>       → cada post

export function generateStaticParams() {
  return PAGES.map((page) => ({
    slug: page.slug.split('/'),
  }));
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params;
  const joined = slug.join('/');
  const page = findPage(joined);

  if (!page) {
    return new Response(`# 404\n\nNo existe versión Markdown para /${joined}.`, {
      status: 404,
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
  }

  const canonical =
    page.slug === 'index' ? SITE_URL : `${SITE_URL}/${page.slug}`;
  const header = `<!-- canonical: ${canonical} -->\n\n`;

  return new Response(header + page.body.trim() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
