import HeroSection from "@/components/contacto/hero";
import FormularioSection from "@/components/contacto/formulario";
import UbicacionSection from "@/components/contacto/ubicacion";
import FaqSection from "@/components/contacto/faq";
import HorariosSection from "@/components/contacto/horarios";

export const metadata = {
  title: 'Contacto | Estudio de Tatuajes en Madrid',
  description: 'Contacta con Saints & Sinners, estudio de tatuajes en Madrid. Agenda una cita, consulta precios o solicita información sobre nuestros servicios de tatuaje y piercing.',
  keywords: 'contacto estudio tatuajes Madrid, reservar cita tatuaje Madrid, estudio de tatuajes, presupuesto tatuaje Madrid, cita estudio tatuajes'
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <FormularioSection />
      <UbicacionSection />
      <HorariosSection />
      <FaqSection />
    </>
  );
}