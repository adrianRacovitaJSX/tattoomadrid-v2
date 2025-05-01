import TatuajesHeroSection from "@/components/servicios/tatuajes/hero";
import TatuajesGridSection from "@/components/servicios/tatuajes/grid";
import TatuajesProcesosSection from "@/components/servicios/tatuajes/procesos";
import TatuajesEstilosSection from "@/components/servicios/tatuajes/estilos";
import PreguntasFrecuentesSection from "@/components/servicios/tatuajes/preguntas-frecuentes";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Tatuajes Personalizados en Madrid | Mejores Artistas | Saints & Sinners',
  description: 'Especialistas en tatuajes personalizados en Madrid. Diseños únicos adaptados a tus ideas, todos los estilos: realismo, blackwork, old school y más. Artistas certificados.',
  keywords: 'tatuajes Madrid, tatuajes personalizados Madrid, estudio de tatuajes Madrid, mejores tatuadores Madrid, tatuajes realismo Madrid, tatuajes blackwork Madrid, Saints and Sinners',
  alternates: {
    canonical: 'https://saintsandsinners.es/servicios/tatuajes'
  },
  openGraph: {
    title: 'Tatuajes Personalizados en Madrid | Saints & Sinners Tattoo Studio',
    description: 'Diseños únicos de tatuajes creados por los mejores artistas de Madrid. Todos los estilos disponibles con materiales premium y atención personalizada.',
    url: 'https://saintsandsinners.es/servicios/tatuajes',
    siteName: 'Saints & Sinners Tattoo Madrid',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function TatuajesPage() {
  return (
    <>
      <TatuajesHeroSection />
      <TatuajesGridSection />
      <TatuajesProcesosSection />
      <TatuajesEstilosSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
} 