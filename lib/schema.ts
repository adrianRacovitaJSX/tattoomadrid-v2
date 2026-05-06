import { BUSINESS, SITE_URL, SITE_NAME, absoluteUrl } from './seo';

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    // Subtipos específicos (Schema.org admite arrays). TattooParlor es subtipo de
    // HealthAndBeautyBusiness; declarar ambos garantiza retro-compatibilidad.
    '@type': ['LocalBusiness', 'TattooParlor', 'HealthAndBeautyBusiness'],
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    image: absoluteUrl('/images/tattooo.jpg'),
    logo: absoluteUrl('/images/logo-gamboa.png'),
    foundingDate: BUSINESS.founded,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Bizum',
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    openingHoursSpecification: BUSINESS.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dow,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [BUSINESS.instagram, BUSINESS.tiktok],
    areaServed: [
      { '@type': 'City', name: 'Madrid' },
      { '@type': 'AdministrativeArea', name: 'Comunidad de Madrid' },
    ],
    knowsAbout: [
      'Tatuajes personalizados',
      'Tatuaje realista',
      'Microrealismo',
      'Tatuaje minimalista',
      'Tatuaje neotradicional',
      'Piercing',
      'Micropigmentación',
    ],
  };
}

type ServiceItem = {
  name: string;
  description: string;
  category?: string;
  priceFrom?: number;
};

export function servicesCatalogSchema(services: ServiceItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Servicios de Saints & Sinners Tattoo Madrid',
    provider: { '@id': BUSINESS_ID },
    itemListElement: services.map((s, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': BUSINESS_ID },
        ...(s.category ? { category: s.category } : {}),
        areaServed: { '@type': 'City', name: 'Madrid' },
      },
      ...(s.priceFrom !== undefined
        ? {
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'EUR',
              price: s.priceFrom,
              minPrice: s.priceFrom,
              valueAddedTaxIncluded: true,
            },
          }
        : {}),
      availability: 'https://schema.org/InStock',
    })),
  };
}

type FaqItem = { question: string; answer: string };

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    // Las preguntas y sus respuestas son citables por motores generativos.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-tldr]', 'h1', 'h2'],
    },
  };
}

export function reserveActionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ReserveAction',
    name: 'Reservar cita en Saints & Sinners Tattoo Madrid',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/reservar`,
      inLanguage: 'es-ES',
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'Reservation',
      provider: { '@id': BUSINESS_ID },
      reservationFor: {
        '@type': 'Service',
        name: 'Sesión de tatuaje, piercing o micropigmentación',
        provider: { '@id': BUSINESS_ID },
      },
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'es-ES',
    publisher: { '@id': BUSINESS_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

type Breadcrumb = { name: string; path: string };

export function breadcrumbSchema(items: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type BlogPostingInput = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
};

export function blogPostingSchema(input: BlogPostingInput) {
  const url = absoluteUrl(`/blog/${input.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ?? absoluteUrl('/images/tattooo.jpg'),
    author: {
      '@type': 'Organization',
      name: input.authorName ?? SITE_NAME,
      url: SITE_URL,
    },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: 'es-ES',
    url,
    // Speakable: marca el TL;DR y el H1 como las secciones más citables.
    // Usado por AI Overviews / Perplexity / ChatGPT como señal explícita
    // del fragmento "respuesta directa" del documento.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-tldr]', 'h1'],
    },
  };
}

// Person/ItemList schema para artistas: pendiente. Cuando se publique
// /artistas/[slug] reactivar `artistsItemListSchema` con `@id` único por
// artista y `worksFor` apuntando a BUSINESS_ID.
