import type { Metadata } from 'next';

export const SITE_URL = 'https://tattoomadrid.com';
export const SITE_NAME = 'Saints & Sinners Tattoo Madrid';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/tattooo.jpg`;

export const BUSINESS = {
  name: SITE_NAME,
  legalName: 'Saints & Sinners Tattoo',
  email: 'info@tattoomadrid.com',
  phone: '+34 910 00 00 00',
  street: 'Calle de Don Ramón de la Cruz, 76',
  postalCode: '28006',
  city: 'Madrid',
  region: 'Comunidad de Madrid',
  country: 'ES',
  latitude: 40.4313,
  longitude: -3.6754,
  founded: '2008',
  instagram: 'https://www.instagram.com/saintsandsinnersmadrid/',
  tiktok: 'https://www.tiktok.com/@saintsandsinnersbygamboa',
  hours: [
    { dow: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '20:00' },
    { dow: ['Saturday'], opens: '11:00', closes: '15:00' },
  ],
} as const;

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Si se proporciona, genera OG dinámica via /api/og en vez de la imagen por defecto. */
  ogTitle?: string;
  ogKicker?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
  /** Slug de la versión Markdown (sin .md). Si se proporciona, se añade
   *  `<link rel="alternate" type="text/markdown">` para crawlers de LLMs. */
  mdSlug?: string;
};

function dynamicOgUrl(title: string, kicker?: string) {
  const params = new URLSearchParams({ title });
  if (kicker) params.set('kicker', kicker);
  return `${SITE_URL}/api/og?${params.toString()}`;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = new URL(input.path, SITE_URL).toString();
  const image =
    input.image ??
    (input.ogTitle
      ? dynamicOgUrl(input.ogTitle, input.ogKicker)
      : DEFAULT_OG_IMAGE);

  const mdHref = input.mdSlug
    ? `${SITE_URL}/md/${input.mdSlug}`
    : undefined;

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: url,
      languages: {
        'es-ES': url,
        'x-default': url,
      },
      // Versión Markdown para crawlers de LLMs. Anthropic, Cursor y Mintlify
      // adoptaron este patrón de `rel="alternate" type="text/markdown"`.
      ...(mdHref
        ? {
            types: {
              'text/markdown': mdHref,
            },
          }
        : {}),
    },
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: input.type ?? 'website',
      url,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      locale: 'es_ES',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
