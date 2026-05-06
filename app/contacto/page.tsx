import HeroSection from "@/components/contacto/hero";
import FormularioSection from "@/components/contacto/formulario";
import UbicacionSection from "@/components/contacto/ubicacion";
import FaqSection from "@/components/contacto/faq";
import HorariosSection from "@/components/contacto/horarios";
import JsonLd from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { CONTACT_FAQS } from "@/lib/faqs";

export const metadata = buildMetadata({
  title: "Contacto — Estudio de Tatuajes en Madrid",
  description:
    "Contacta con Saints & Sinners Tattoo Madrid. Pide presupuesto, reserva tu cita o consulta los servicios de tatuaje, piercing y micropigmentación de nuestro estudio.",
  path: "/contacto",
  ogTitle: "Contacta con Saints & Sinners Tattoo",
  ogKicker: "Presupuesto · Cita · Información",
  mdSlug: "contacto",
  keywords: [
    "contacto estudio tatuajes Madrid",
    "presupuesto tatuaje Madrid",
    "cita tatuaje Madrid",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-contacto"
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Contacto", path: "/contacto" },
        ])}
      />
      <JsonLd id="ld-contact-faq" data={faqPageSchema(CONTACT_FAQS)} />
      <HeroSection />
      <FormularioSection />
      <UbicacionSection />
      <HorariosSection />
      <FaqSection />
    </>
  );
}
