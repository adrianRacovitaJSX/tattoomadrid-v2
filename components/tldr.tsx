import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

// "Answer-first" / TL;DR de 40-60 palabras justo bajo el H1 o H2.
// Investigación GEO 2026 (Profound, GEO Lab): páginas con answer capsule
// reciben +24pp de citation rate por LLMs. El atributo data-tldr alinea con
// nuestro Speakable schema (cssSelector: "[data-tldr]").
export default function TLDR({ children, className }: Props) {
  return (
    <aside
      data-tldr
      role="note"
      aria-label="Resumen rápido"
      className={
        'my-6 rounded-xl border-l-4 border-[#be8f52] bg-[#be8f52]/5 p-5 text-base leading-relaxed text-gray-800 shadow-sm dark:bg-[#be8f52]/10 dark:text-gray-100 ' +
        (className ?? '')
      }
    >
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#be8f52]">
        En resumen
      </span>
      {children}
    </aside>
  );
}
