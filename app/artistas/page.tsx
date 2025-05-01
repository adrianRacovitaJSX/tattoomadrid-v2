import HeroSection from "@/components/artistas/hero";
import TeamGridSection from "@/components/artistas/team-grid";
import ArtistasDestacadosSection from "@/components/artistas/artistas-destacados";
import TestimoniosSection from "@/components/artistas/testimonios";
import ContactSection from "@/components/contact";

export const metadata = {
  title: 'Artistas Tatuadores | Estudio de Tatuajes en Madrid',
  description: 'Conoce a nuestro equipo de tatuadores profesionales en Madrid. Artistas especializados en diferentes estilos: realismo, neotradicional, japonés y más en nuestro estudio de tatuajes.',
  keywords: 'tatuadores Madrid, artistas tatuaje, estudio de tatuajes Madrid, estudio de tatuajes, Saints and Sinners, tatuadores profesionales'
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <TeamGridSection />
      <ArtistasDestacadosSection />
      <ContactSection />
    </>
  );
}