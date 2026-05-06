import type { MetadataRoute } from 'next';
import { blogPosts } from './blog/posts';

const SITE_URL = 'https://tattoomadrid.com';

// Fecha estable de la última actualización mayor del sitio.
// Cambiarla manualmente cuando se actualice contenido comercial — Google
// penaliza dateModified sin cambio real (Glenn Gabe / Google Search Central).
const SITE_LAST_UPDATED = new Date('2026-05-06');

// Fechas de la última actualización por sección comercial.
const COMMERCIAL_LASTMOD: Record<string, Date> = {
  '/': SITE_LAST_UPDATED,
  '/servicios': SITE_LAST_UPDATED,
  '/reservar': SITE_LAST_UPDATED,
  '/contacto': SITE_LAST_UPDATED,
  '/blog': SITE_LAST_UPDATED,
};

export default function sitemap(): MetadataRoute.Sitemap {
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
      lastModified: latestBlogDate(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const blog: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...commercial, ...blog];
}

function latestBlogDate(): Date {
  if (blogPosts.length === 0) return SITE_LAST_UPDATED;
  return new Date(
    blogPosts
      .map((p) => p.date)
      .sort()
      .pop() as string
  );
}
