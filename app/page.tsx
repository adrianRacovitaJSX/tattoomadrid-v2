import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import JsonLd from '@/components/json-ld';
import { buildMetadata, BUSINESS } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { PIECES } from '@/lib/portfolio';
import { ARTISTS } from '@/lib/artists';
import { HOME_FAQS } from '@/lib/faqs';
import { Container, CtaBand, FaqList, Section, SectionHeader } from '@/components/site/blocks';
import { WhatsAppLink } from '@/components/site/cta-link';
import { buttonClasses } from '@/components/site/button-classes';
import PortfolioGrid from '@/components/site/portfolio-grid';
import ArtistCard from '@/components/site/artist-card';
import {
  LocationSection,
  OffersGrid,
  ProcessSteps,
  ReviewsCta,
  StyleCards,
  TrustStrip,
} from '@/components/site/sections';

export const metadata = buildMetadata({
  title: 'Estudio de Tatuajes en Madrid desde 2008 | Saints & Sinners',
  description:
    'Estudio de tatuajes en Madrid (Ciudad Lineal) especializado en realismo y black and grey. Mira trabajos reales y pide presupuesto por WhatsApp.',
  path: '/',
  ogTitle: 'Estudio de tatuajes en Madrid',
  ogKicker: 'Desde 2008 · Realismo, black and grey y piercing',
  mdSlug: 'index',
  keywords: ['estudio de tatuajes Madrid', 'tatuajes Madrid', 'tatuadores Madrid', 'tatuajes realistas Madrid', 'piercing Madrid'],
});

const HERO = PIECES.find((p) => p.id === 'manga-japonesa-dragon-hannya')!;

export default function Home() {
  return (
    <>
      <JsonLd id="ld-breadcrumb-home" data={breadcrumbSchema([{ name: 'Inicio', path: '/' }])} />

      {/* 1 · Hero: qué es, dónde, prueba de nivel y acción, en el primer pantallazo */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden pt-24 lg:pt-32">
        <Container className="grid items-center gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
          <div>
            <p className="eyebrow mb-6">Saints &amp; Sinners · Ciudad Lineal · Desde {BUSINESS.founded}</p>
            <h1 id="hero-title" className="font-display text-[2.75rem] leading-[1.02] tracking-tight text-bone sm:text-6xl lg:text-7xl xl:text-8xl">
              Estudio de tatuajes en <em className="not-italic text-gold">Madrid</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash sm:text-xl">
              Realismo, black and grey y proyectos a medida: mangas, espaldas y piezas pequeñas con el mismo cuidado. Cuéntanos tu idea y te damos propuesta y presupuesto sin compromiso.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink placement="hero" size="lg" />
              <Link href="#trabajos" className={buttonClasses('secondary', 'lg')}>
                Ver trabajos
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone/80">
              {['Material de un solo uso', 'Retoque incluido los 3 primeros meses', 'Diseño a medida'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check aria-hidden className="size-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-surface-1">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ash">
              {HERO.title} · {HERO.placement}
            </figcaption>
          </figure>
        </Container>
      </section>

      <Container>
        <TrustStrip />
      </Container>

      {/* 2 · Portfolio: la prueba más fuerte, justo después del hero */}
      <Section id="trabajos" labelledBy="trabajos-title">
        <SectionHeader
          id="trabajos-title"
          eyebrow="Trabajos reales"
          title="Hechos en nuestro estudio"
          intro="Sin fotos de catálogo: estas piezas se tatuaron en Saints & Sinners. Filtra por estilo y toca para ampliar."
          action={
            <Link href="/tatuajes" className="inline-flex items-center gap-1 font-medium text-gold hover:underline">
              Ver todos los trabajos <ArrowUpRight aria-hidden className="size-4" />
            </Link>
          }
        />
        <PortfolioGrid pieces={PIECES.filter((p) => p.id !== HERO.id).slice(0, 9)} filters />
      </Section>

      {/* 3 · Oferta activa */}
      <section aria-labelledby="ofertas-title" className="border-y border-line bg-surface-1 py-20 lg:py-24">
        <Container>
          <SectionHeader
            id="ofertas-title"
            eyebrow="Ofertas"
            title="Precio cerrado, sin sorpresas"
            action={
              <Link href="/ofertas" className="inline-flex items-center gap-1 font-medium text-gold hover:underline">
                Condiciones <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            }
          />
          <OffersGrid />
        </Container>
      </section>

      {/* 4 · Estilos: enlazan a sus páginas SEO */}
      <Section labelledBy="estilos-title">
        <SectionHeader
          id="estilos-title"
          eyebrow="Estilos"
          title="¿Qué estilo buscas?"
          intro="Cada estilo tiene su página con trabajos, precios orientativos y dudas frecuentes."
        />
        <StyleCards />
      </Section>

      {/* 5 · Artistas */}
      <section aria-labelledby="artistas-title" className="border-t border-line py-20 lg:py-28">
        <Container>
          <SectionHeader
            id="artistas-title"
            eyebrow="El equipo"
            title="Artistas"
            intro="Elige a tu artista por su trabajo. Cada uno tiene su especialidad y su portfolio."
            action={
              <Link href="/artistas" className="inline-flex items-center gap-1 font-medium text-gold hover:underline">
                Conocer al equipo <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            }
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ARTISTS.map((a, i) => (
              <li key={a.slug}>
                <ArtistCard artist={a} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 6 · Cómo funciona + precio orientativo: resuelven las dos dudas antes del contacto */}
      <Section labelledBy="proceso-title" className="border-t border-line">
        <SectionHeader id="proceso-title" eyebrow="Cómo funciona" title="De la idea a la piel en 3 pasos" />
        <ProcessSteps />
        <div className="mt-10 grid gap-6 rounded-[4px] border border-line p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Precios</p>
            <p className="font-display text-3xl text-bone sm:text-4xl">
              Tatuajes desde <span className="tabular text-gold">70 €</span>
            </p>
            <p className="mt-2 text-ash">El precio depende del tamaño, la zona y el detalle. Te damos presupuesto cerrado antes de empezar.</p>
          </div>
          <Link href="/precios" className={buttonClasses('secondary', 'lg')}>
            Ver precios
          </Link>
        </div>
      </Section>

      <Container className="pb-4">
        <ReviewsCta />
      </Container>

      {/* 7 · FAQ */}
      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title="Preguntas frecuentes" />
          <FaqList items={HOME_FAQS} schemaId="ld-faq-home" />
        </div>
      </Section>

      {/* 8 · Ubicación y horario */}
      <div className="border-t border-line">
        <LocationSection placement="home-ubicacion" />
      </div>

      <CtaBand placement="home-final" />
    </>
  );
}
