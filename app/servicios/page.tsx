import HeroSection from "@/components/servicios/hero";
import ServiciosGridSection from "@/components/servicios/servicios-grid";
import SeguridadSection from "@/components/servicios/seguridad";
import ServiciosAdicionalesSection from "@/components/servicios/servicios-adicionales";
import PreguntasFrecuentesSection from "@/components/servicios/preguntas-frecuentes";
import TablaComparativaServicios from "@/components/servicios/tabla-comparativa";
import ContactSection from "@/components/contact";
import JsonLd from "@/components/json-ld";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqPageSchema, servicesCatalogSchema } from "@/lib/schema";
import { SERVICES_CATALOG, SERVICES_FAQS } from "@/lib/faqs";

export const metadata = buildMetadata({
  title: "Servicios de Tatuajes en Madrid — Tatuaje, Piercing y Micropigmentación",
  description:
    "Servicios profesionales en Saints & Sinners Madrid: tatuajes personalizados, piercings, micropigmentación y eliminación láser. Artistas con más de 17 años de experiencia.",
  path: "/servicios",
  ogTitle: "Servicios profesionales de tatuaje en Madrid",
  ogKicker: "Tatuaje · Piercing · Micropigmentación · Láser",
  mdSlug: "servicios",
  keywords: [
    "servicios tatuajes Madrid",
    "estudio de tatuajes Madrid",
    "piercing Madrid",
    "micropigmentación Madrid",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-servicios"
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
      <JsonLd id="ld-services-catalog" data={servicesCatalogSchema(SERVICES_CATALOG)} />
      <JsonLd id="ld-services-faq" data={faqPageSchema(SERVICES_FAQS)} />
      <HeroSection />
      <ServiciosGridSection />
      <TablaComparativaServicios />
      <SeguridadSection />
      <ServiciosAdicionalesSection />
      <PreguntasFrecuentesSection />
      <ContactSection />
    </>
  );
}
