import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Saints & Sinners Tattoo Madrid',
  description: 'Política de cookies de Saints & Sinners Tattoo Madrid. Información sobre las cookies utilizadas en nuestro sitio web y cómo controlarlas.',
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
