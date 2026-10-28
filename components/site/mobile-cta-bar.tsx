'use client';

import { CallLink, WhatsAppLink } from './cta-link';

/** Barra fija inferior en móvil: las dos acciones que más convierten, siempre a un toque. */
export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 px-3 pt-2 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <WhatsAppLink placement="barra-movil" className="h-12 flex-[2]">
          WhatsApp
        </WhatsAppLink>
        <CallLink placement="barra-movil" className="h-12 flex-1" />
      </div>
    </div>
  );
}
