// El Studio embebido necesita ocupar toda la pantalla. Este layout aísla
// el contenido del frame del sitio (que ya se omite en /admin vía SiteFrame)
// y desactiva indexación.
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CMS · Saints & Sinners',
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
