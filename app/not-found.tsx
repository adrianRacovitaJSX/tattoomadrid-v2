import Link from 'next/link';
import { Container } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';
import { buttonClasses } from '@/components/site/button-classes';

export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

/** 404 que no pierde la visita: lleva a trabajos, precios o WhatsApp. */
export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="pb-24 pt-36">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 id="nf-title" className="font-display text-5xl leading-tight tracking-tight text-bone sm:text-7xl">
          Esta página no existe
        </h1>
        <p className="mt-6 text-lg text-ash">Puede que el enlace sea antiguo. Esto es lo que suele buscar la gente:</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/tatuajes" className={buttonClasses('primary', 'lg')}>
            Ver trabajos
          </Link>
          <Link href="/precios" className={buttonClasses('secondary', 'lg')}>
            Precios
          </Link>
          <WhatsAppLink placement="404" variant="secondary" size="lg">
            Escribir por WhatsApp
          </WhatsAppLink>
        </div>
      </Container>
    </section>
  );
}
