'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';
import PageTransition from '@/components/ui/page-transition';

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isPanel = pathname?.startsWith('/panel');
  const isLanding = pathname?.startsWith('/landing');

  if (isAdmin || isPanel || isLanding) {
    // Studio embebido, panel de clientes y landings de captación:
    // pantalla completa, sin header/footer ni transición de página.
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
