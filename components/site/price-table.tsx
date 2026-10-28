import Link from 'next/link';
import { SERVICE_PRICES } from '@/lib/services';

/** Tabla de precios orientativos: datos citables por buscadores y asistentes de IA. */
export default function PriceTable({ caption = 'Precios orientativos en Saints & Sinners Madrid (IVA incluido)' }: { caption?: string }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="mb-4 text-left text-ash">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-ash">
            <th scope="col" className="py-3 pr-4 font-medium">Servicio</th>
            <th scope="col" className="py-3 pr-4 font-medium">Desde</th>
            <th scope="col" className="py-3 pr-4 font-medium">Duración</th>
            <th scope="col" className="py-3 pr-4 font-medium">Sesiones</th>
            <th scope="col" className="py-3 font-medium">Cuidados</th>
          </tr>
        </thead>
        <tbody>
          {SERVICE_PRICES.map((row) => (
            <tr key={row.id} className="border-b border-line align-top">
              <th scope="row" className="py-4 pr-4 font-medium text-bone">
                {row.href ? (
                  <Link href={row.href} className="hover:text-gold">
                    {row.servicio}
                  </Link>
                ) : (
                  row.servicio
                )}
              </th>
              <td className="tabular py-4 pr-4 font-display text-lg whitespace-nowrap text-gold">{row.desde}</td>
              <td className="py-4 pr-4 text-bone/80">{row.duracion}</td>
              <td className="py-4 pr-4 text-bone/80">{row.sesiones}</td>
              <td className="py-4 text-ash">{row.cuidados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
