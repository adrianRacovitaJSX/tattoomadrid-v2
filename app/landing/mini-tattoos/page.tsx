import type { Metadata } from "next";
import OfferLanding, { type OfferLandingConfig } from "@/components/landing/offer-landing";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "3 Mini Tattoos por 100 € en Madrid | Saints & Sinners";
const DESCRIPTION =
  "3 mini tattoos por 100 € en Saints & Sinners, estudio de tatuajes en Ciudad Lineal (Madrid). Diseño incluido, en una sola cita. Reserva por WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/landing/mini-tattoos` },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/landing/mini-tattoos`,
    images: [{ url: DEFAULT_OG_IMAGE }],
    locale: "es_ES",
    type: "website",
  },
};

const config: OfferLandingConfig = {
  projectLabel: "OFERTA 3 mini tattoos 100€",
  urgency: "Oferta mini tattoos: 3 por 100 € · Plazas limitadas cada semana",
  headlineStart: "Tres mini tattoos,",
  headlineAccent: "un solo precio",
  subtitle:
    "Tres diseños pequeños tatuados el mismo día por artistas con más de 13 años de experiencia. Perfecto para tu primer tatuaje o para venir con amigos.",
  price: "100 €",
  priceNote: "los tres · diseño incluido",
  availability: "Citas disponibles esta semana",
  ctaLabel: "Quiero mis 3 mini tattoos",
  heroImage: "/images/backgrounds/bg-tattoo-2.jpg",
  galleryKicker: "Mini tattoos",
  galleryTitle: "Pequeños, pero",
  galleryAccent: "con carácter",
  gallerySubtitle: "Fine line, símbolos, letras, constelaciones. Lo pequeño también se hace bien.",
  gallery: [
    { title: "Fine line y símbolos", src: "/resenas-sns/esteff.webp", span: "md:col-span-2 md:row-span-2" },
    { title: "Microrealismo", src: "/images/portfolio/airon-3.webp" },
    { title: "Botánico en antebrazo", src: "/images/portfolio/edward-4.webp" },
    { title: "Rosa y mariposa", src: "/images/portfolio/airon-2.webp" },
    { title: "Neotradicional", src: "/images/portfolio/edward-2.webp" },
  ],
  includedTitle: "Qué",
  includedAccent: "incluye",
  included: [
    { title: "3 tatuajes de hasta 5 cm", desc: "Tres piezas pequeñas para ti, o repartidas entre amigos que vengan juntos a la misma cita." },
    { title: "Diseño incluido", desc: "Trae tu idea o elige entre nuestros diseños. Lo adaptamos y lo preparamos antes de la cita." },
    { title: "Todo en una sesión", desc: "Entras y sales con los tres hechos. Sin volver, sin esperas." },
    { title: "Material estéril y desechable", desc: "Agujas de un solo uso, cabina esterilizada y licencia sanitaria de la Comunidad de Madrid." },
    { title: "Cuidados y seguimiento", desc: "Te explicamos cómo cuidarlos y resolvemos cualquier duda por WhatsApp después." },
    { title: "Sin señal", desc: "Reservas por WhatsApp y pagas el día de la cita. Sin compromiso hasta entonces." },
  ],
  steps: [
    { num: "1", title: "Dinos qué quieres", time: "30 segundos", desc: "Rellena el formulario con tu idea o el estilo que te gusta." },
    { num: "2", title: "Cerramos fecha por WhatsApp", time: "Menos de 2 horas", desc: "Te confirmamos disponibilidad, resolvemos dudas y preparamos los diseños." },
    { num: "3", title: "Vienes y sales tatuado", time: "1 sesión", desc: "Los tres mini tattoos en una sola cita. 100 € en total." },
  ],
  formTitle: "Reserva tus",
  formAccent: "3 mini tattoos",
  formQuestion: "¿Qué estilo te gusta?",
  formOptions: ["Fine line", "Letras o frases", "Símbolos", "Florales", "Minimalista", "Aún no lo sé"],
  formPlaceholder: "Cuéntanos tu idea (opcional)",
  faqs: [
    { q: "¿Qué tamaño tienen los mini tattoos?", a: "Hasta 5 cm aproximadamente. Si tu idea es más grande te hacemos un presupuesto aparte sin compromiso." },
    { q: "¿Puedo repartir los tres entre amigos?", a: "Sí. Los tres tatuajes pueden ser para una persona o repartirse entre quienes vengan a la misma cita." },
    { q: "¿Vale para cualquier zona del cuerpo?", a: "Para la mayoría sí: muñeca, antebrazo, tobillo, clavícula, detrás de la oreja, dedos… Algunas zonas delicadas se valoran en la cita." },
    { q: "¿Tengo que dejar señal?", a: "No. Reservas por WhatsApp y pagas el día de la cita en el estudio." },
  ],
  whatsappText: "Hola, quiero reservar la oferta de 3 mini tattoos por 100 €",
};

export default function MiniTattoosLanding() {
  return <OfferLanding config={config} />;
}
