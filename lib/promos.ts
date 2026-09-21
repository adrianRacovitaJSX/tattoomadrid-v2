/**
 * Promociones activas enlazadas desde la home.
 * Cambia `href` cuando las landings estén publicadas (a día de hoy ambas rutas devuelven 404).
 */
export type Promo = {
  id: string;
  kicker: string;
  title: string;
  price: string;
  priceNote: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
};

export const PROMOS: Promo[] = [
  {
    id: "mini-tattoos",
    kicker: "Oferta mini tattoos",
    title: "3 mini tattoos",
    price: "100 €",
    priceNote: "los tres, en una sola sesión",
    description:
      "Tres diseños pequeños a elegir, tatuados el mismo día. Ideal para tu primer tatuaje o para venir con amigos.",
    bullets: ["Hasta 5 cm cada uno", "Diseño incluido", "Mismo día, sin esperas"],
    cta: "Quiero mis 3 mini tattoos",
    href: "/landing/mini-tattoos",
    image: "/resenas-sns/esteff.webp",
    imageAlt: "Mini tattoos de línea fina realizados en Saints & Sinners Madrid",
  },
  {
    id: "mangas",
    kicker: "Oferta mangas",
    title: "Manga interna o externa",
    price: "850 €",
    priceNote: "precio cerrado, sesiones incluidas",
    description:
      "Media manga interna o externa con diseño personalizado y presupuesto cerrado desde el primer día. Sin sorpresas.",
    bullets: ["Diseño 100 % personalizado", "Todos los estilos", "Consulta previa gratuita"],
    cta: "Quiero mi manga por 850 €",
    href: "/landing/mangas",
    image: "/IMG_4381.webp",
    imageAlt: "Manga japonesa tatuada en Saints & Sinners Madrid",
  },
];
