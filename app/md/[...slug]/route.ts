import { PAGES, findPage } from '@/lib/page-content';
import { SITE_URL } from '@/lib/seo';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  postBySlugQuery,
  postsListQuery,
} from '@/sanity/lib/queries';
import { portableTextToMarkdown } from '@/sanity/lib/portable-text-to-markdown';
import type { Post, PostListItem } from '@/sanity/lib/types';

export const runtime = 'nodejs';
export const revalidate = 60;

// Servimos versiones .md individuales por página. La estrategia "raw markdown
// URLs" (Mintlify, Anthropic, Cursor) reduce hasta 10x los tokens vs HTML y
// es el formato preferido por LLMs.
//
// Rutas:
//   /md/index             → home (PAGES estático)
//   /md/servicios         → /servicios (PAGES estático)
//   /md/reservar          → /reservar (PAGES estático)
//   /md/contacto          → /contacto (PAGES estático)
//   /md/blog              → /blog (Sanity, dinámico)
//   /md/blog/<slug>       → post (Sanity, dinámico)

const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
} as const;

function notFound(joined: string) {
  return new Response(`# 404\n\nNo existe versión Markdown para /${joined}.`, {
    status: 404,
    headers: MARKDOWN_HEADERS,
  });
}

function withCanonicalHeader(canonical: string, body: string) {
  const header = `<!-- canonical: ${canonical} -->\n\n`;
  return new Response(header + body.trim() + '\n', {
    headers: {
      ...MARKDOWN_HEADERS,
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function blogIndexMarkdown(): Promise<string> {
  const posts = await sanityFetch<PostListItem[]>(postsListQuery, {
    tags: ['post', 'blog-list'],
  });

  if (posts.length === 0) {
    return [
      '# Blog de Saints & Sinners Tattoo Madrid',
      '',
      '> Todavía no hay artículos publicados. Vuelve pronto.',
    ].join('\n');
  }

  const items = posts
    .map(
      (p) =>
        `- [${p.title}](${SITE_URL}/blog/${p.slug}) — ${p.excerpt}`
    )
    .join('\n');

  return [
    '# Blog de Saints & Sinners Tattoo Madrid',
    '',
    '> Artículos del equipo de Saints & Sinners sobre tendencias en tatuajes, dolor por zona, cuidados post-tatuaje y consejos para tu primera sesión.',
    '',
    '## Artículos disponibles',
    '',
    items,
  ].join('\n');
}

async function blogPostMarkdown(slug: string): Promise<string | null> {
  const post = await sanityFetch<Post | null>(postBySlugQuery, {
    params: { slug },
    tags: ['post', `post:${slug}`],
  });
  if (!post) return null;

  return [
    `# ${post.title}`,
    '',
    `> ${post.excerpt}`,
    '',
    `_Publicado el ${formatDate(post.publishedAt)}_`,
    '',
    portableTextToMarkdown(post.body),
  ].join('\n');
}

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params;
  const joined = slug.join('/');

  // Páginas estáticas (no-blog)
  const staticPage = findPage(joined);
  if (staticPage) {
    const canonical =
      staticPage.slug === 'index' ? SITE_URL : `${SITE_URL}/${staticPage.slug}`;
    return withCanonicalHeader(canonical, staticPage.body);
  }

  // Blog dinámico
  if (slug[0] === 'blog') {
    if (slug.length === 1) {
      const body = await blogIndexMarkdown();
      return withCanonicalHeader(`${SITE_URL}/blog`, body);
    }
    const postSlug = slug.slice(1).join('/');
    const body = await blogPostMarkdown(postSlug);
    if (!body) return notFound(joined);
    return withCanonicalHeader(`${SITE_URL}/blog/${postSlug}`, body);
  }

  return notFound(joined);
}

// Mantenemos generateStaticParams sólo para rutas no-blog (build-time).
// Las rutas /md/blog* se resuelven dinámicamente con revalidate.
export function generateStaticParams() {
  return PAGES.filter((p) => !p.slug.startsWith('blog'))
    .map((page) => ({ slug: page.slug.split('/') }));
}
