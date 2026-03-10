import HeroSection from "@/components/servicios/hero";
import ServiciosGridSection from "@/components/servicios/servicios-grid";
import SeguridadSection from "@/components/servicios/seguridad";
import ServiciosAdicionalesSection from "@/components/servicios/servicios-adicionales";
import PreguntasFrecuentesSection from "@/components/servicios/preguntas-frecuentes";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Servicios de Tatuajes | Estudio de Tatuajes en Madrid',
  description: 'Descubre todos los servicios de nuestro estudio de tatuajes en Madrid: tatuajes personalizados, piercings, micropigmentación, eliminación láser y más. Profesionales certificados.',
  keywords: 'servicios tatuajes Madrid, estudio de tatuajes Madrid, estudio de tatuajes, piercings, micropigmentación, eliminación de tatuajes, Saints and Sinners'
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <ServiciosGridSection />
      <SeguridadSection />
      <ServiciosAdicionalesSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
}