import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/fetch';
import { sitemapPostsQuery } from '@/sanity/lib/queries';

const SITE_URL = 'https://tattoomadrid.com';

// Fecha estable de la última actualización mayor del sitio.
// Cambiarla manualmente cuando se actualice contenido comercial — Google
// penaliza dateModified sin cambio real (Glenn Gabe / Google Search Central).
const SITE_LAST_UPDATED = new Date('2026-05-06');

const COMMERCIAL_LASTMOD: Record<string, Date> = {
  '/': SITE_LAST_UPDATED,
  '/servicios': SITE_LAST_UPDATED,
  '/reservar': SITE_LAST_UPDATED,
  '/contacto': SITE_LAST_UPDATED,
  '/blog': SITE_LAST_UPDATED,
};

type SitemapPost = {
  slug: string;
  publishedAt: string;
  _updatedAt: string;
};

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<SitemapPost[]>(sitemapPostsQuery, {
    tags: ['post', 'sitemap'],
    revalidate: 300,
  });

  const latestBlogDate =
    posts.length > 0
      ? new Date(
          posts
            .map((p) => p._updatedAt || p.publishedAt)
            .sort()
            .pop() as string
        )
      : SITE_LAST_UPDATED;

  const commercial: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: COMMERCIAL_LASTMOD['/'],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: COMMERCIAL_LASTMOD['/servicios'],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reservar`,
      lastModified: COMMERCIAL_LASTMOD['/reservar'],
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: COMMERCIAL_LASTMOD['/contacto'],
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...commercial, ...blog];
}
