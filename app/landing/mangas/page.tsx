import type { Metadata } from "next";
import OfferLanding, { type OfferLandingConfig } from "@/components/landing/offer-landing";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Manga de Tatuaje por 850 € en Madrid | Saints & Sinners";
const DESCRIPTION =
  "Oferta: manga interna o externa por 850 € en Saints & Sinners, estudio de tatuajes en Ciudad Lineal, Madrid. Diseño personalizado, precio cerrado, sesiones incluidas. Consulta gratuita.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/landing/mangas` },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/landing/mangas`,
    images: [{ url: DEFAULT_OG_IMAGE }],
    locale: "es_ES",
    type: "website",
  },
};

const config: OfferLandingConfig = {
  projectLabel: "OFERTA manga 850€",
  urgency: "Oferta mangas: interna o externa por 850 € · Solo 4 proyectos al mes",
  headlineStart: "Tu manga,",
  headlineAccent: "precio cerrado",
  subtitle:
    "Manga interna o externa con diseño 100 % personalizado y todas las sesiones incluidas. Lo que te decimos el primer día es lo que pagas.",
  price: "850 €",
  priceNote: "manga interna o externa · sesiones incluidas",
  availability: "Solo 4 proyectos grandes al mes",
  ctaLabel: "Quiero mi manga por 850 €",
  heroImage: "/images/backgrounds/bg-tattoo-1.jpg",
  galleryKicker: "Mangas",
  galleryTitle: "Mangas que hemos",
  galleryAccent: "hecho aquí",
  gallerySubtitle: "Realismo, japonés, chicano, blackwork. Es nuestra especialidad.",
  gallery: [
    { title: "Manga japonesa", src: "/IMG_4381.webp", span: "md:col-span-2 md:row-span-2" },
    { title: "Manga realismo mitológico", src: "/resenas-sns/adrian.webp" },
    { title: "Manga calavera y rosas", src: "/images/portfolio/gamboa-1.webp" },
    { title: "Manga blackwork", src: "/images/portfolio/gamboa-2.webp" },
    { title: "Manga chicano", src: "/IMG_4380.webp" },
    { title: "Manga realismo", src: "/images/portfolio/gamboa-4.webp" },
    { title: "Manga payaso", src: "/images/portfolio/gamboa-3.webp" },
  ],
  includedTitle: "Qué",
  includedAccent: "incluye",
  included: [
    { title: "Manga interna o externa", desc: "Tú eliges la cara del brazo. Cubrimos la zona completa de hombro a muñeca en esa cara." },
    { title: "Diseño 100 % personalizado", desc: "Partimos de tu idea y la desarrollamos con el artista que mejor encaja con tu estilo." },
    { title: "Todas las sesiones", desc: "Las que hagan falta para terminarla. El precio no cambia aunque necesite una sesión más." },
    { title: "Presupuesto cerrado", desc: "850 € desde el primer día. Sin letra pequeña ni sorpresas al final." },
    { title: "Consulta previa gratuita", desc: "Vienes al estudio, ves portfolios, conoces al artista y sales con un plan de fechas." },
    { title: "Retoque incluido", desc: "Una vez cicatrizada, revisamos la pieza y retocamos lo que haga falta sin coste." },
  ],
  steps: [
    { num: "1", title: "Cuéntanos tu idea", time: "30 segundos", desc: "Estilo, cara del brazo y lo que tienes en mente. Con eso basta para empezar." },
    { num: "2", title: "Consulta gratuita en el estudio", time: "Sin compromiso", desc: "Te asignamos el artista, definimos el diseño y cerramos el calendario de sesiones." },
    { num: "3", title: "Empezamos", time: "850 € cerrados", desc: "Sesiones planificadas, precio fijo, y una manga que llevarás toda la vida." },
  ],
  formTitle: "Reserva tu consulta",
  formAccent: "gratuita",
  formQuestion: "¿Qué estilo te gusta?",
  formOptions: ["Realismo", "Japonés", "Chicano", "Blackwork", "Neotradicional", "Aún no lo sé"],
  formPlaceholder: "Cuéntanos tu idea (opcional)",
  faqs: [
    { q: "¿Qué diferencia hay entre manga interna y externa?", a: "La externa cubre la cara exterior del brazo, la que se ve con el brazo relajado. La interna cubre la cara interior. La oferta incluye una de las dos; la manga completa (ambas caras) se presupuesta aparte." },
    { q: "¿Cuántas sesiones hacen falta?", a: "Normalmente entre 2 y 4 según el detalle y el estilo, espaciadas para que la piel cicatrice bien. Todas están incluidas en los 850 €." },
    { q: "¿Puedo elegir al artista?", a: "Sí. En la consulta te recomendamos quién encaja mejor con tu estilo, pero la decisión final es tuya." },
    { q: "¿Tengo que dejar señal para la consulta?", a: "No. La consulta es gratuita y sin compromiso. Solo si decides seguir adelante fijamos fechas." },
  ],
  whatsappText: "Hola, quiero info sobre la oferta de manga por 850 €",
};

export default function MangasLanding() {
  return <OfferLanding config={config} />;
}
