import SeguridadHeroSection from "@/components/servicios/seguridad/hero";
import SeguridadGridSection from "@/components/servicios/seguridad/grid";
import SeguridadProtocolosSection from "@/components/servicios/seguridad/protocolos";
import SeguridadCertificacionesSection from "@/components/servicios/seguridad/certificaciones";
import PreguntasFrecuentesSection from "@/components/servicios/seguridad/preguntas-frecuentes";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Seguridad e Higiene en Tatuajes Madrid | Estudio Certificado | Saints & Sinners',
  description: 'Máximos estándares de seguridad e higiene en nuestro estudio de tatuajes en Madrid. Materiales esterilizados, equipos certificados y procedimientos seguros en cada sesión.',
  keywords: 'seguridad tatuajes Madrid, higiene estudio tatuajes, estudio certificado Madrid, tatuajes seguros Madrid, esterilización tatuajes, Saints and Sinners',
  alternates: {
    canonical: 'https://saintsandsinners.es/servicios/seguridad'
  },
  openGraph: {
    title: 'Seguridad e Higiene en Tatuajes Madrid | Saints & Sinners',
    description: 'Nuestro estudio en Madrid garantiza los más altos estándares de seguridad e higiene con materiales esterilizados y cabinas específicas de esterilización.',
    url: 'https://saintsandsinners.es/servicios/seguridad',
    siteName: 'Saints & Sinners Tattoo Madrid',
    locale: 'es_ES',
    type: 'website',
  },
};

export default function SeguridadPage() {
  return (
    <>
      <SeguridadHeroSection />
      <SeguridadGridSection />
      <SeguridadProtocolosSection />
      <SeguridadCertificacionesSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
} 