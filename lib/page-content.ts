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

const BLOG_INDEX_MD = `# Blog de Saints & Sinners Tattoo Madrid

> Artículos del equipo de Saints & Sinners sobre tendencias en tatuajes, dolor por zona, cuidados post-tatuaje y consejos para tu primera sesión.

## Artículos disponibles

- [Tendencias en tatuajes 2025](https://tattoomadrid.com/blog/tendencias-tatuajes-2025): repaso a los cinco estilos que dominan 2025 (minimalista, neotradicional, microrealismo, biomecánico).
- [¿Duele hacerse un tatuaje?](https://tattoomadrid.com/blog/duele-hacerse-tatuaje): guía del nivel de dolor por zona del cuerpo y consejos para reducirlo.
- [Cómo cuidar tu tatuaje recién hecho](https://tattoomadrid.com/blog/cuidar-tatuaje-recien-hecho): rutina día a día de curación y errores frecuentes a evitar.
`;

const BLOG_TENDENCIAS_MD = `# Tendencias en tatuajes 2025

> Las tendencias de tatuajes en 2025 se mueven en cinco grandes corrientes: minimalista, neotradicional a color, simbología astral, microrealismo y biomecánico/cyberpunk. El minimalismo y el microrealismo siguen liderando entre quienes se tatúan por primera vez, mientras que el color regresa con fuerza tras años dominados por blackwork.

## 1. Tatuajes minimalistas

Diseños pequeños y delicados con líneas finas, símbolos discretos (lunas, corazones, constelaciones) o tipografías personalizadas. Es la elección más popular entre primeros tatuajes.

## 2. Neotradicional a color

Después de años dominados por blackwork, el color vuelve con fuerza. Estilos neotradicional y acuarela se imponen entre quienes buscan piezas vibrantes.

## 3. Inspiración astral y espiritual

Símbolos zodiacales, fases lunares, geometría sagrada, ojos y manos. Tatuajes con carga simbólica además de impacto visual.

## 4. Microrealismo y retratos

Hiperrealismo en miniatura. Ideal para homenajes a personas, mascotas o ídolos gracias a la mejora de agujas y técnicas.

## 5. Biomecánico y cyberpunk

Estética futurista con fusión de elementos mecánicos y orgánicos. Vuelve con fuerza, especialmente en brazos y piernas.

## Comparativa rápida

| Estilo | Popularidad | Dolor | Curación |
|---|---|---|---|
| Minimalista | Alta | Baja | 1–2 semanas |
| Neotradicional color | Media-Alta | Media | 2–3 semanas |
| Astral | Alta | Variable | 2–3 semanas |
| Microrealismo | Media | Media-Alta | 2–4 semanas |
| Biomecánico | En aumento | Alta | 3–4 semanas |
`;

const BLOG_DUELE_MD = `# ¿Duele hacerse un tatuaje? Esto es lo que debes saber según su ubicación

> Hacerse un tatuaje genera una molestia variable según la zona del cuerpo, tu tolerancia personal y la técnica del tatuador. Las zonas con más grasa y músculo (antebrazo, hombro, muslo) duelen poco; las cercanas al hueso (costillas, tobillos, esternón) duelen mucho más. Una sesión típica dura 1–4 horas y la incomodidad es soportable con preparación adecuada.

## Factores que influyen en el dolor

- Tolerancia individual al dolor
- Tamaño y duración del tatuaje
- Técnica del tatuador y tipo de aguja
- Ubicación del tatuaje
- Hidratación, descanso y alimentación previa

## Dolor por zona del cuerpo

| Zona | Nivel de dolor | Notas |
|---|---|---|
| Antebrazo | Bajo | Ideal para principiantes |
| Hombro | Bajo | Cómodo y de fácil acceso |
| Espalda baja | Medio | Soportable, molesta al estirarse |
| Costillas | Alto | Zona sensible cercana al hueso |
| Tobillos y pies | Alto | Cerca del hueso, poca grasa |
| Cuello y cara | Muy alto | No recomendado para primer tatuaje |

## Cómo reducir el dolor

- Descansa bien la noche anterior
- Come ligero antes de la sesión, no llegues en ayunas
- Evita alcohol y cafeína 24 horas antes
- Usa ropa cómoda y holgada que dé acceso a la zona
- Confía en profesionales con buena técnica
`;

const BLOG_CUIDAR_MD = `# Cómo cuidar tu tatuaje recién hecho — Guía día a día

> La curación de un tatuaje completo dura entre 4 y 6 semanas. Los primeros 4 días se lava 2-3 veces al día con agua templada y jabón neutro y se aplica una capa fina de crema cicatrizante. Entre los días 5-10 aparecen costras que no deben arrancarse. Evita sol, piscina, gimnasio y ropa ajustada hasta cicatrización completa.

## Día 1: tras la sesión

- El tatuador limpia la zona y coloca film transparente o parche.
- Mantén el film entre 2 y 4 horas.
- Lava con agua templada y jabón neutro, sin frotar.
- Seca con toalla limpia a toques suaves.
- Aplica una capa fina de crema cicatrizante (Bepanthol Tattoo o equivalente).

## Días 2–4: limpieza y crema

- Lava 2–3 veces al día.
- Aplica crema tras cada lavado.
- No te rasques aunque pique.
- Evita sol, piscina, sauna y gimnasio.

## Días 5–10: formación de costras

- Aparecen costras o piel seca: es normal.
- No las arranques.
- Sigue aplicando crema, pero sin exceso.

## Días 11–20: últimos cuidados

- Las costras caen solas.
- El color se ve más claro: se asentará en las semanas siguientes.
- Hidrata con crema suave varias veces al día.

## Lo que NO debes hacer

- No usar alcohol, agua oxigenada ni vaselina
- No exponer al sol durante al menos 3 semanas
- No rascar ni retirar costras
- No usar ropa ajustada sobre la zona
`;

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
  {
    slug: 'blog',
    title: 'Blog',
    description: 'Artículos sobre tendencias, dolor y cuidados post-tatuaje.',
    body: BLOG_INDEX_MD,
  },
  {
    slug: 'blog/tendencias-tatuajes-2025',
    title: 'Tendencias en tatuajes 2025',
    description: 'Cinco corrientes que dominan 2025.',
    body: BLOG_TENDENCIAS_MD,
  },
  {
    slug: 'blog/duele-hacerse-tatuaje',
    title: '¿Duele hacerse un tatuaje?',
    description: 'Guía del dolor por zona del cuerpo y consejos prácticos.',
    body: BLOG_DUELE_MD,
  },
  {
    slug: 'blog/cuidar-tatuaje-recien-hecho',
    title: 'Cómo cuidar tu tatuaje recién hecho',
    description: 'Rutina día a día y errores frecuentes.',
    body: BLOG_CUIDAR_MD,
  },
];

export function findPage(slug: string): PageContent | undefined {
  return PAGES.find((p) => p.slug === slug);
}
