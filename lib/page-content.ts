// Contenido en Markdown plano de las páginas principales — fuente única
// para llms.txt, llms-full.txt y /md/[slug]. Mantenerlo sincronizado con
// los componentes JSX cuando cambien títulos, precios o FAQs.

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  body: string;
};

const HOME_MD = `# Saints & Sinners Tattoo Madrid — Estudio de tatuajes profesional desde 2008

> Saints & Sinners es un estudio de tatuajes en Madrid con más de 17 años de historia. Tatuajes personalizados, piercing y micropigmentación realizados por un equipo especializado en realismo, chicano, neotradicional y fine line. Confirmamos las citas en menos de 24 horas.

## Sobre el estudio

Saints & Sinners Tattoo Madrid es un estudio dirigido por el tatuador Gamboa, abierto desde 2008 en Madrid. Trabajamos por cita previa con consulta artística gratuita y nuestro equipo cubre los principales estilos contemporáneos: realismo, chicano, black & grey, neotradicional, fine line, lettering y diseño exclusivo.

## Servicios principales

- Tatuaje personalizado (desde 70 €)
- Piercing facial y corporal (desde 30 €)
- Micropigmentación de cejas (desde 250 €)
- Eliminación láser de tatuajes (desde 60 € por sesión)
- Diseño exclusivo de tatuaje incluido en la sesión

## Cómo reservar

Completa el formulario en [/reservar](https://tattoomadrid.com/reservar). Te confirmamos disponibilidad en menos de 24 horas. Para reservar la cita pedimos un depósito de 50 € que se descuenta del precio final del tatuaje.
`;

const SERVICIOS_MD = `# Servicios de tatuajes en Madrid — Saints & Sinners

> Saints & Sinners ofrece tatuaje personalizado, piercing, micropigmentación y eliminación láser en su estudio de Madrid. Las tarifas comienzan en 70 € para tatuajes pequeños, 30 € para piercings, 250 € para micropigmentación de cejas y 60 € por sesión de láser. Todos los servicios incluyen consulta previa gratuita.

## Comparativa de servicios

| Servicio | Precio desde | Duración | Sesiones | Cuidados clave |
|---|---|---|---|---|
| Tatuaje personalizado | 70 € | 1–6 h | 1–4 | Limpieza diaria 2 semanas + crema cicatrizante |
| Piercing facial / corporal | 30 € | 10–30 min | 1 | Suero fisiológico 2 veces al día, 4–8 semanas |
| Micropigmentación cejas | 250 € | 2–3 h | 2 (con repaso a las 4–6 semanas) | Sin agua ni cremas grasas durante 7 días |
| Eliminación láser | 60 € por sesión | 15–30 min | 5–10 (separadas 6–8 semanas) | Hidratación + protección solar SPF 50 |
| Diseño exclusivo | Incluido en sesión | Boceto 2–7 días | — | — |

## Tatuaje personalizado

Diseños a medida en realismo, neotradicional, blackwork, japonés, fine line y acuarela. Incluye consulta previa gratuita y un retoque sin coste en los primeros 3 meses tras el tatuaje.

## Piercing

Perforaciones realizadas con joyería de titanio implant grade y técnica estéril desechable. Asesoramiento por profesional certificado en control de infecciones.

## Micropigmentación

Cejas pelo a pelo, eyeliner y micropigmentación capilar con técnicas hiperrealistas y materiales hipoalergénicos. Repaso incluido entre las 4 y 6 semanas posteriores.

## Eliminación láser de tatuajes

Eliminación o aclarado mediante láser Q-Switched de última generación. Plan personalizado según pigmento, profundidad y tono de piel.

## Preguntas frecuentes

### ¿Cuál es el proceso para agendar una cita?
Por teléfono, email o el formulario de [/reservar](https://tattoomadrid.com/reservar). Respondemos en menos de 24 horas para confirmar disponibilidad.

### ¿Necesito una consulta previa antes de tatuarme?
Para tatuajes personalizados sí — la consulta es gratuita y sirve para definir diseño, tamaño, ubicación y presupuesto. Para diseños pequeños o flash no es obligatoria.

### ¿Cuánto cuesta un tatuaje?
Las tarifas comienzan en 70 € para piezas pequeñas. El precio final depende de tamaño, complejidad, ubicación y artista. Trabajamos por sesión o por proyecto completo.

### ¿Es seguro hacerse un tatuaje o piercing?
Sí. Cumplimos los protocolos de higiene y la normativa española aplicable. Material esterilizado o desechable y artistas certificados en control de infecciones.

### ¿Cuánto tarda en sanar un tatuaje?
La sanación superficial dura unas 2 semanas; la cicatrización completa se prolonga hasta 4–6 semanas siguiendo las instrucciones de cuidado.
`;

const RESERVAR_MD = `# Reserva tu cita — Saints & Sinners Tattoo Madrid

> Reserva una sesión de tatuaje, piercing o micropigmentación en Saints & Sinners Tattoo Madrid completando el formulario online. Te confirmamos disponibilidad en menos de 24 horas y solicitamos un depósito de 50 € que se descuenta del precio final.

## Cómo funciona la reserva

1. Rellena el formulario con tus datos, el servicio que quieres y una descripción del diseño.
2. Te respondemos en menos de 24 horas con disponibilidad y precio orientativo.
3. Confirmamos la cita con un depósito de 50 € (transferencia o Bizum).
4. Acudes a la sesión en nuestro estudio de Madrid.

## Datos de contacto

- Email: info@tattoomadrid.com
- Web: https://tattoomadrid.com
- Instagram: https://www.instagram.com/saintsandsinnersmadrid/

## Formas de pago aceptadas

Efectivo, tarjeta de crédito y débito, transferencia bancaria y Bizum. Para el depósito inicial preferimos transferencia o Bizum.
`;

const CONTACTO_MD = `# Contacto — Saints & Sinners Tattoo Madrid

> Contacta con Saints & Sinners Tattoo Madrid por email, teléfono o formulario web. Respondemos consultas en 24–48 horas laborables. Ofrecemos presupuestos sin compromiso y consulta presencial gratuita para tatuajes medianos y grandes.

## Datos de contacto

- Email: info@tattoomadrid.com
- Web: https://tattoomadrid.com

## Preguntas frecuentes

### ¿Cuánto tardáis en responder?
Respondemos consultas en un plazo máximo de 24–48 horas laborables. Para urgencias, llamada directa.

### ¿Cómo funciona la reserva de cita?
Una vez recibimos tu solicitud confirmamos disponibilidad. Para fijar la cita pedimos un depósito de 50 € que se descuenta del precio final del tatuaje.

### ¿Puedo pedir presupuesto sin compromiso?
Sí, presupuesto sin compromiso. Para más precisión, indica diseño, tamaño y ubicación con referencias visuales.

### ¿Qué formas de pago aceptáis?
Efectivo, tarjetas de crédito/débito, transferencia bancaria y Bizum.

### ¿Necesito consulta presencial antes del tatuaje?
Para tatuajes medianos o grandes recomendamos consulta presencial. Para diseños pequeños se gestiona online. La consulta es siempre gratuita.
`;

// Las rutas /md/blog y /md/blog/<slug> se sirven dinámicamente desde Sanity
// (ver app/md/[...slug]/route.ts). El contenido estático aquí cubre solo las
// páginas comerciales que no cambian a través del CMS.

export const PAGES: PageContent[] = [
  {
    slug: 'index',
    title: 'Saints & Sinners Tattoo Madrid',
    description: 'Estudio de tatuajes profesional en Madrid desde 2008.',
    body: HOME_MD,
  },
  {
    slug: 'servicios',
    title: 'Servicios de tatuajes en Madrid',
    description: 'Tatuaje, piercing, micropigmentación y eliminación láser.',
    body: SERVICIOS_MD,
  },
  {
    slug: 'reservar',
    title: 'Reserva tu cita',
    description: 'Formulario y proceso de reserva con depósito de 50 €.',
    body: RESERVAR_MD,
  },
  {
    slug: 'contacto',
    title: 'Contacto',
    description: 'Datos de contacto y FAQ del estudio.',
    body: CONTACTO_MD,
  },
];

export function findPage(slug: string): PageContent | undefined {
  return PAGES.find((p) => p.slug === slug);
}
