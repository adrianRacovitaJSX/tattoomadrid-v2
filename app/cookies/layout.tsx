import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Política de Cookies',
  description: 'Política de cookies de Saints & Sinners Tattoo Madrid. Información sobre las cookies utilizadas en nuestro sitio web y cómo controlarlas.',
  path: '/cookies',
  noindex: true,
});

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
