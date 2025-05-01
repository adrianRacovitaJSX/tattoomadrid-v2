import PiercingsHeroSection from "@/components/servicios/piercings/hero";
import PiercingsGridSection from "@/components/servicios/piercings/grid";
import PiercingesProcesosSection from "@/components/servicios/piercings/procesos";
import PiercingsGaleriaSection from "@/components/servicios/piercings/galeria";
import PreguntasFrecuentesSection from "@/components/servicios/piercings/preguntas-frecuentes";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Piercings Profesionales en Madrid | Joyería de Calidad | Saints & Sinners',
  description: 'Servicio de piercings profesionales en Madrid con las máximas garantías de seguridad. Joyería de alta calidad en titanio y oro. Perforaciones corporales seguras.',
  keywords: 'piercing Madrid, perforaciones corporales Madrid, piercings profesionales Madrid, joyería piercings Madrid, estudio piercing Madrid, Saints and Sinners',
  alternates: {
    canonical: 'https://saintsandsinners.es/servicios/piercings'
  },
  openGraph: {
    title: 'Piercings Profesionales en Madrid | Saints & Sinners',
    description: 'Servicio de piercings profesionales y joyería de alta calidad en titanio y oro. Realizamos todo tipo de perforaciones con los más altos estándares de seguridad.',
    url: 'https://saintsandsinners.es/servicios/piercings',
    siteName: 'Saints & Sinners Tattoo Madrid',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function PiercingsPage() {
  return (
    <>
      <PiercingsHeroSection />
      <PiercingsGridSection />
      <PiercingesProcesosSection />
      <PiercingsGaleriaSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
} 