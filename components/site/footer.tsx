import Link from 'next/link';
import Image from 'next/image';
import { BUSINESS } from '@/lib/seo';
import { ADDRESS_LINE, HOURS_LINES, MAPS_URL, TEL_HREF } from '@/lib/contact';
import { STYLES } from '@/lib/styles';
import { ARTISTS } from '@/lib/artists';

const SERVICES = [
  { name: 'Piercing en Madrid', href: '/piercing-madrid' },
  { name: 'Precios de tatuajes', href: '/precios' },
  { name: 'Ofertas', href: '/ofertas' },
  { name: 'Todos los servicios', href: '/servicios' },
  { name: 'Reservar cita', href: '/reservar' },
];

const LEGAL = [
  { name: 'Aviso legal', href: '/aviso-legal' },
  { name: 'Privacidad', href: '/privacidad' },
  { name: 'Cookies', href: '/cookies' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-24 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-5">
          <Image src="/images/logo-gamboa.png" alt="Saints & Sinners Tattoo Madrid" width={600} height={300} className="h-14 w-auto" sizes="112px" />
          <p className="max-w-xs text-sm leading-relaxed text-ash">
            Estudio de tatuajes y piercing en Madrid desde {BUSINESS.founded}. Realismo, black and grey y proyectos a medida.
          </p>
          <div className="flex gap-4 text-sm">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-gold">
              Instagram
            </a>
            <a href={BUSINESS.tiktok} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-gold">
              TikTok
            </a>
          </div>
        </div>

        <nav aria-label="Estilos y artistas">
          <h2 className="eyebrow mb-4">Estilos</h2>
          <ul className="space-y-1 text-sm">
            {STYLES.map((s) => (
              <li key={s.slug}>
                <Link href={`/tatuajes/${s.slug}`} className="inline-flex min-h-10 items-center text-bone/80 hover:text-gold">
                  {s.h1}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="eyebrow mb-4 mt-8">Artistas</h2>
          <ul className="space-y-1 text-sm">
            {ARTISTS.map((a) => (
              <li key={a.slug}>
                <Link href={`/artistas/${a.slug}`} className="inline-flex min-h-10 items-center text-bone/80 hover:text-gold">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Servicios">
          <h2 className="eyebrow mb-4">Estudio</h2>
          <ul className="space-y-1 text-sm">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="inline-flex min-h-10 items-center text-bone/80 hover:text-gold">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="space-y-5 text-sm not-italic">
          <h2 className="eyebrow">Visítanos</h2>
          <p>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-bone hover:text-gold">
              {ADDRESS_LINE}
            </a>
          </p>
          <dl className="space-y-1 text-ash">
            {HOURS_LINES.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd className="tabular text-bone">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="flex flex-col">
            <a href={TEL_HREF} className="tabular inline-flex min-h-11 items-center text-bone hover:text-gold">
              {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="inline-flex min-h-11 items-center text-bone/80 hover:text-gold">
              {BUSINESS.email}
            </a>
          </p>
        </address>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {BUSINESS.legalName}. Madrid.
          </p>
          <ul className="flex gap-5">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
