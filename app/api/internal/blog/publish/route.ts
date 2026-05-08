import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { writeClient } from '@/sanity/lib/client';
import { markdownToPortableText } from '@/sanity/lib/markdown-to-portable-text';
import { SITE_URL } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Endpoint para que n8n publique posts generados por IA.
//
// POST /api/internal/blog/publish
// Header: x-internal-token: <BLOG_PUBLISH_TOKEN>
// Body:
// {
//   "title":     "Título del post",        // requerido
//   "slug":      "slug-opcional",          // opcional, se deriva del título
//   "excerpt":   "Resumen / TL;DR ~50-300 chars",  // requerido
//   "markdown":  "## Sección...\n\nPárrafo...",     // requerido
//   "keywords":  ["tatuaje madrid", "..."],         // opcional
//   "coverImage": { "url": "https://...jpg", "alt": "..." },  // opcional
//   "status":    "published" | "draft",             // default: published
//   "publishedAt": "2026-05-08T10:00:00Z"           // opcional, default: ahora
// }
//
// Responde con: { ok: true, id, slug, url }

type CoverImageInput = { url: string; alt?: string };
type PublishBody = {
  title?: string;
  slug?: string;
  excerpt?: string;
  markdown?: string;
  keywords?: string[];
  coverImage?: CoverImageInput;
  status?: 'draft' | 'published';
  publishedAt?: string;
};

function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

async function uploadCoverImage(cover: CoverImageInput) {
  const res = await fetch(cover.url);
  if (!res.ok) {
    throw new Error(`coverImage fetch failed: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') ?? 'image/jpeg';
  const ext = contentType.split('/')[1]?.split(';')[0] ?? 'jpg';
  const filename = `cover-${Date.now()}.${ext}`;

  const asset = await writeClient().assets.upload('image', buffer, {
    filename,
    contentType,
  });
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: asset._id },
    ...(cover.alt ? { alt: cover.alt } : {}),
  };
}

export async function GET() {
  const tokenSet = Boolean(process.env.BLOG_PUBLISH_TOKEN);
  const writeTokenSet = Boolean(process.env.SANITY_API_WRITE_TOKEN);
  return NextResponse.json({
    ok: true,
    ready: tokenSet && writeTokenSet,
    config: {
      blogPublishToken: tokenSet ? 'set' : 'missing',
      sanityWriteToken: writeTokenSet ? 'set' : 'missing',
    },
  });
}

export async function POST(request: Request) {
  const expected = process.env.BLOG_PUBLISH_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'BLOG_PUBLISH_TOKEN no configurado en el servidor' },
      { status: 500 }
    );
  }

  const provided = request.headers.get('x-internal-token');
  if (provided !== expected) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  let body: PublishBody;
  try {
    body = (await request.json()) as PublishBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 }
    );
  }

  const errors: string[] = [];
  if (!body.title || body.title.trim().length < 10) {
    errors.push('title requerido (≥10 caracteres)');
  }
  if (!body.excerpt || body.excerpt.trim().length < 50) {
    errors.push('excerpt requerido (≥50 caracteres)');
  }
  if (!body.markdown || body.markdown.trim().length < 100) {
    errors.push('markdown requerido (≥100 caracteres)');
  }
  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: 'validation_failed', details: errors },
      { status: 400 }
    );
  }

  const title = body.title!.trim();
  const slug = body.slug?.trim() || slugify(title);
  const excerpt = body.excerpt!.trim();
  const markdown = body.markdown!;
  const status = body.status ?? 'published';
  const publishedAt = body.publishedAt
    ? new Date(body.publishedAt).toISOString()
    : new Date().toISOString();

  let coverImage: Awaited<ReturnType<typeof uploadCoverImage>> | undefined;
  if (body.coverImage?.url) {
    try {
      coverImage = await uploadCoverImage(body.coverImage);
    } catch (err) {
      return NextResponse.json(
        {
          ok: false,
          error: 'cover_image_failed',
          message: err instanceof Error ? err.message : 'unknown',
        },
        { status: 502 }
      );
    }
  }

  const portableTextBody = markdownToPortableText(markdown);
  if (portableTextBody.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'empty_body_after_conversion' },
      { status: 400 }
    );
  }

  // status=draft → prefijo `drafts.` en el _id (convención de Sanity).
  const docId =
    status === 'draft' ? `drafts.${crypto.randomUUID()}` : crypto.randomUUID();

  const doc = {
    _id: docId,
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt,
    publishedAt,
    body: portableTextBody,
    aiGenerated: true,
    ...(body.keywords?.length ? { keywords: body.keywords } : {}),
    ...(coverImage ? { coverImage } : {}),
  };

  try {
    const created = await writeClient().createOrReplace(doc);

    // Refresca caches de listado/sitemap/post individual.
    // Next.js 16: revalidateTag requiere un profile que define el cacheLife
    // del nuevo contenido. 'default' usa el perfil estándar del proyecto.
    revalidateTag('post', 'default');
    revalidateTag('blog-list', 'default');
    revalidateTag('sitemap', 'default');
    revalidateTag(`post:${slug}`, 'default');

    // Si IndexNow está configurado, hacemos ping del nuevo post.
    if (status === 'published' && process.env.INDEXNOW_INTERNAL_TOKEN) {
      const url = `${SITE_URL}/blog/${slug}`;
      fetch(`${SITE_URL}/api/indexnow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-token': process.env.INDEXNOW_INTERNAL_TOKEN,
        },
        body: JSON.stringify({ urls: [url] }),
      }).catch(() => {
        // best-effort, no bloquea la respuesta
      });
    }

    return NextResponse.json({
      ok: true,
      id: created._id,
      slug,
      url: `${SITE_URL}/blog/${slug}`,
      status,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: 'sanity_write_failed',
        message: err instanceof Error ? err.message : 'unknown',
      },
      { status: 502 }
    );
  }
}
