import CabinasHeroSection from "@/components/servicios/cabinas/hero";
import CabinasGridSection from "@/components/servicios/cabinas/grid";
import CabinasCaracteristicasSection from "@/components/servicios/cabinas/caracteristicas";
import CabinasTarifasSection from "@/components/servicios/cabinas/tarifas";
import PreguntasFrecuentesSection from "@/components/servicios/cabinas/preguntas-frecuentes";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Alquiler de Cabinas para Tatuadores en Madrid | Espacios Equipados | Saints & Sinners',
  description: 'Alquiler de espacios totalmente equipados para tatuadores independientes en Madrid. Cabinas disponibles por días o semanas con todo el material necesario.',
  keywords: 'alquiler cabinas tatuajes Madrid, espacio para tatuadores Madrid, alquiler estudio tatuaje Madrid, cabinas tatuaje Madrid, sala equipada tatuadores Madrid, Saints and Sinners',
  alternates: {
    canonical: 'https://saintsandsinners.es/servicios/cabinas'
  },
  openGraph: {
    title: 'Alquiler de Cabinas para Tatuadores en Madrid | Saints & Sinners',
    description: 'Espacios totalmente equipados para tatuadores independientes. Alquila tu cabina por días o semanas con tarifas flexibles y todo el material necesario.',
    url: 'https://saintsandsinners.es/servicios/cabinas',
    siteName: 'Saints & Sinners Tattoo Madrid',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function CabinasPage() {
  return (
    <>
      <CabinasHeroSection />
      <CabinasGridSection />
      <CabinasCaracteristicasSection />
      <CabinasTarifasSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
} 