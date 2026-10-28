'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/site/header';
import Footer from '@/components/site/footer';
import MobileCtaBar from '@/components/site/mobile-cta-bar';

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isPanel = pathname?.startsWith('/panel');
  const isLanding = pathname?.startsWith('/landing');
  const isAutomations = pathname?.startsWith('/automations');

  if (isAdmin || isPanel || isLanding || isAutomations) {
    // Studio embebido, panel de clientes, panel técnico y landings de captación:
    // pantalla completa, sin cabecera ni pie.
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="contenido" className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
