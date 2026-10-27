import { BUSINESS } from './seo';

/** Número en formato internacional sin signos, para wa.me y tel:. */
export const PHONE_E164 = BUSINESS.phone.replace(/[^\d+]/g, '');
export const PHONE_DIGITS = PHONE_E164.replace('+', '');
export const TEL_HREF = `tel:${PHONE_E164}`;

/**
 * Enlace a WhatsApp con mensaje prerrellenado. El mensaje indica la página de
 * origen para que el estudio (y el panel) sepan de dónde viene el lead.
 */
export function whatsappUrl(text = 'Hola, quiero pedir presupuesto para un tatuaje.') {
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${BUSINESS.name}, ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`
)}`;

export const ADDRESS_LINE = `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}`;

const DAY_ES: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

/**
 * Horario legible generado desde BUSINESS.hours, la única fuente de verdad
 * (la misma que alimenta el schema). No escribir horarios a mano en componentes.
 */
export const HOURS_LINES = BUSINESS.hours.map((h) => {
  const first = DAY_ES[h.dow[0]];
  const last = DAY_ES[h.dow[h.dow.length - 1]];
  const days = h.dow.length > 1 ? `${first} a ${last}` : first;
  return { days, time: `${h.opens} – ${h.closes}` };
});
