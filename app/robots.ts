import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Bots IA / motores generativos a los que damos visibilidad explícita.
// Mantenemos el listado como fuente de verdad para que aparezcan en stanzas
// individuales con `Allow: /` y queden cubiertos también por `User-agent: *`.
//
// Investigación 2026: bloquear estos bots correlaciona con -23% de tráfico
// sin reducción equivalente en citaciones. Para una marca que busca visibilidad
// la decisión es permitirlos a todos. Si en el futuro quieres reservar parte
// del portfolio del entrenamiento de modelos, hazlo a nivel de archivo (.ai.txt).
const AI_BOTS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'OAI-AdsBot',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'claude-web',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google
  'Google-Extended',
  'Googlebot',
  'GoogleOther',
  // Microsoft
  'bingbot',
  'BingPreview',
  // Common Crawl (alimenta entrenamientos abiertos)
  'CCBot',
  // Apple
  'Applebot',
  'Applebot-Extended',
  // Otros
  'Amazonbot',
  'Bytespider',
  'Meta-ExternalAgent',
  'MistralAI-User',
  'DuckAssistBot',
  'YouBot',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  const sharedDisallow = [
    '/api/',
    '/automations',
    '/automations/',
    '/landing/gracias',
    '/_next/',
    '/aviso-legal',
    '/privacidad',
    '/cookies',
  ];

  // Recursos que sí queremos servir explícitamente para LLMs.
  const sharedAllow = [
    '/llms.txt',
    '/llms-full.txt',
    '/md/',
    '/sitemap.xml',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', ...sharedAllow],
        disallow: sharedDisallow,
      },
      // Stanza explícita por bot — algunos crawlers sólo respetan reglas
      // dirigidas a su user-agent y no las de '*' (documentado en sus docs
      // oficiales para PerplexityBot, GPTBot y ClaudeBot).
      ...AI_BOTS.map((agent) => ({
        userAgent: agent,
        allow: ['/', ...sharedAllow],
        disallow: sharedDisallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
