import Link from 'next/link';
import { Calendar, Sparkles, ArrowRight } from 'lucide-react';

type Props = {
  // Sección concreta de /servicios a la que enlazar mediante ancla.
  // Útil para topic clustering: cada post enlaza al servicio relacionado.
  servicesAnchor?: string;
  servicesLabel?: string;
};

export default function RelatedCta({
  servicesAnchor = '',
  servicesLabel = 'Conoce todos nuestros servicios',
}: Props) {
  const servicesHref = servicesAnchor ? `/servicios#${servicesAnchor}` : '/servicios';

  return (
    <aside
      aria-label="Próximo paso"
      className="my-12 grid gap-4 md:grid-cols-2"
    >
      <Link
        href={servicesHref}
        className="group flex items-start gap-4 rounded-xl border border-[#be8f52]/30 bg-white p-5 shadow-sm transition-all hover:border-[#be8f52] hover:shadow-md dark:bg-zinc-900"
      >
        <Sparkles size={22} className="mt-1 shrink-0 text-[#be8f52]" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {servicesLabel}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Tatuajes personalizados, piercing, micropigmentación y eliminación láser.
          </p>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-[#be8f52]">
            Ver servicios
            <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      <Link
        href="/reservar"
        className="group flex items-start gap-4 rounded-xl border border-[#be8f52]/30 bg-[#be8f52]/5 p-5 shadow-sm transition-all hover:border-[#be8f52] hover:shadow-md dark:bg-[#be8f52]/10"
      >
        <Calendar size={22} className="mt-1 shrink-0 text-[#be8f52]" />
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Reserva tu cita
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Completa el formulario y te confirmamos disponibilidad en menos de 24 h.
          </p>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-[#be8f52]">
            Ir al formulario
            <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </aside>
  );
}
