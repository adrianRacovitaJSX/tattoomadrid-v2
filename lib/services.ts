/**
 * Precios y datos de cada servicio: única fuente para /precios, /servicios,
 * /piercing-madrid y la tabla comparativa. Cambiar aquí, no en los componentes.
 */
export type ServicePrice = {
  id: string;
  servicio: string;
  desde: string;
  duracion: string;
  sesiones: string;
  cuidados: string;
  href?: string;
};

export const SERVICE_PRICES: ServicePrice[] = [
  {
    id: 'tatuaje',
    servicio: 'Tatuaje personalizado',
    desde: '70 €',
    duracion: '1–6 h',
    sesiones: '1–4',
    cuidados: 'Limpieza diaria 2 semanas + crema cicatrizante',
    href: '/tatuajes',
  },
  {
    id: 'piercing',
    servicio: 'Piercing facial / corporal',
    desde: '30 €',
    duracion: '10–30 min',
    sesiones: '1',
    cuidados: 'Suero fisiológico 2 veces al día, 4–8 semanas',
    href: '/piercing-madrid',
  },
  {
    id: 'micropigmentacion',
    servicio: 'Micropigmentación de cejas',
    desde: '250 €',
    duracion: '2–3 h',
    sesiones: '2 (con repaso a las 4–6 semanas)',
    cuidados: 'Sin agua ni cremas grasas durante 7 días',
    href: '/servicios#micropigmentacion',
  },
  {
    id: 'laser',
    servicio: 'Eliminación láser de tatuaje',
    desde: '60 € por sesión',
    duracion: '15–30 min',
    sesiones: '5–10 (separadas 6–8 semanas)',
    cuidados: 'Hidratación + protección solar SPF 50 entre sesiones',
    href: '/servicios#laser',
  },
  {
    id: 'diseno',
    servicio: 'Diseño exclusivo de tatuaje',
    desde: 'Incluido en sesión',
    duracion: 'Boceto 2–7 días',
    sesiones: '—',
    cuidados: '—',
  },
];

export const DEPOSIT = '50 €';
