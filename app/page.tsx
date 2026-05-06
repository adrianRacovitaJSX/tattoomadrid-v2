import HeroSection from "@/components/hero";
import AboutSection from "@/components/about";
import StatsSection from "@/components/stats";
import ServicesSection from "@/components/services";
import TestimonialsSection from "@/components/testimonials";
import ContactSection from "@/components/contact";
import JsonLd from "@/components/json-ld";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: `${SITE_NAME} — Estudio de Tatuajes Profesional en Madrid desde 2008`,
  description:
    "Saints & Sinners es un estudio de tatuajes en Madrid con más de 17 años de experiencia. Tatuajes personalizados, piercing y micropigmentación con artistas especializados. Reserva tu cita.",
  path: "/",
  ogTitle: "Estudio de tatuajes profesional en Madrid",
  ogKicker: "Desde 2008 · Tatuaje, piercing y micropigmentación",
  mdSlug: "index",
  keywords: [
    "estudio de tatuajes Madrid",
    "tatuajes Madrid",
    "Saints and Sinners",
    "tatuadores profesionales",
    "piercing Madrid",
    "micropigmentación Madrid",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-home"
        data={breadcrumbSchema([{ name: "Inicio", path: "/" }])}
      />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
