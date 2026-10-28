export type Faq = { question: string; answer: string };

export const SERVICES_FAQS: Faq[] = [
  {
    question: '¿Cuál es el proceso para agendar una cita?',
    answer:
      'Para agendar una cita, puedes contactarnos por teléfono, email o a través del formulario de contacto en nuestra web. Te responderemos en menos de 24 horas para confirmar disponibilidad y acordar una fecha para tu sesión o consulta previa.',
  },
  {
    question: '¿Necesito una consulta previa antes de tatuarme?',
    answer:
      'Para tatuajes personalizados, recomendamos siempre una consulta previa (gratuita) para discutir el diseño, tamaño, ubicación y presupuesto. Para diseños pequeños o flash, no es necesaria una consulta previa, pero siempre es recomendable.',
  },
  {
    question: '¿Cuánto cuesta un tatuaje?',
    answer:
      'El precio varía según el tamaño, complejidad, ubicación y artista elegido. Nuestras tarifas comienzan en 70€ para piezas pequeñas. Durante la consulta te proporcionaremos un presupuesto detallado. Trabajamos tanto por sesión como por proyecto completo.',
  },
  {
    question: '¿Es seguro hacerse un tatuaje o piercing?',
    answer:
      'Sí, seguimos estrictos protocolos de higiene y seguridad. Utilizamos materiales esterilizados o desechables, y nuestros artistas están certificados en control de infecciones y primeros auxilios. Después de cada procedimiento, recibirás instrucciones detalladas para el cuidado.',
  },
  {
    question: '¿Cuánto tiempo tarda en sanar un tatuaje?',
    answer:
      'La sanación superficial toma aproximadamente 2 semanas, mientras que la sanación completa puede tomar hasta 4-6 semanas. Durante este tiempo, deberás seguir las instrucciones de cuidado proporcionadas por tu tatuador para obtener el mejor resultado.',
  },
];

export const CONTACT_FAQS: Faq[] = [
  {
    question: '¿Cuánto tiempo tardáis en responder a una consulta?',
    answer:
      'Nos comprometemos a responder todas las consultas en un plazo máximo de 24-48 horas laborables. Para consultas urgentes, te recomendamos llamarnos directamente.',
  },
  {
    question: '¿Cómo funciona el proceso de reserva de cita?',
    answer:
      'Una vez recibamos tu solicitud, te contactaremos para confirmar detalles y disponibilidad. Para confirmar la cita, solicitamos un depósito de 50€ que se descuenta del precio final del tatuaje. Este depósito garantiza tu fecha y permite a nuestros artistas comenzar a trabajar en tu diseño.',
  },
  {
    question: '¿Puedo solicitar un presupuesto sin compromiso?',
    answer:
      'Sí, ofrecemos presupuestos sin compromiso. Para obtener un presupuesto más preciso, es recomendable que nos proporciones detalles sobre el diseño, tamaño y ubicación del tatuaje, idealmente con referencias visuales.',
  },
  {
    question: '¿Qué formas de pago aceptáis?',
    answer:
      'Aceptamos efectivo, tarjetas de crédito/débito, transferencia bancaria y Bizum. Para el depósito inicial, preferimos transferencia bancaria o Bizum.',
  },
  {
    question: '¿Necesito una consulta presencial antes del tatuaje?',
    answer:
      'Para tatuajes de tamaño mediano o grande, recomendamos una consulta presencial para discutir todos los detalles. Para diseños pequeños o sencillos, podemos gestionar la consulta online. En ambos casos, la consulta es gratuita.',
  },
];

export const SERVICES_CATALOG = [
  {
    name: 'Tatuajes Personalizados',
    description:
      'Diseños a medida en realismo, neotradicional, blackwork, japonés, fine line, acuarela y más. Incluye consulta previa gratuita y un retoque sin coste en los 3 primeros meses.',
    category: 'Tatuaje',
    priceFrom: 70,
  },
  {
    name: 'Piercings faciales y corporales',
    description:
      'Perforaciones realizadas con joyería de titanio implant grade, técnicas estériles desechables y asesoramiento por artista certificado.',
    category: 'Piercing',
    priceFrom: 30,
  },
  {
    name: 'Micropigmentación',
    description:
      'Cejas, eyeliner y micropigmentación capilar con técnicas hiperrealistas y materiales hipoalergénicos.',
    category: 'Micropigmentación',
    priceFrom: 250,
  },
  {
    name: 'Eliminación láser de tatuajes',
    description:
      'Eliminación o aclarado de tatuajes con láser Q-Switched de última generación. Sesiones personalizadas según pigmento y profundidad.',
    category: 'Eliminación láser',
    priceFrom: 60,
  },
  {
    name: 'Diseños personalizados',
    description:
      'Desarrollo de bocetos exclusivos para tu tatuaje con asesoramiento artístico antes de la sesión.',
    category: 'Diseño',
  },
];

/** Preguntas de la home: responden las objeciones antes del primer contacto. */
export const HOME_FAQS: Faq[] = [
  {
    question: '¿Cuánto cuesta un tatuaje en Madrid?',
    answer:
      'En Saints & Sinners los tatuajes empiezan en 70 €. El precio final depende del tamaño, la zona y el nivel de detalle; te damos presupuesto cerrado antes de empezar.',
  },
  {
    question: '¿Cómo pido cita?',
    answer:
      'Escríbenos por WhatsApp o rellena el formulario de reserva con tu idea, la zona y una referencia. Te respondemos con propuesta, precio y fechas disponibles.',
  },
  {
    question: '¿Hay que dejar señal?',
    answer:
      'Para reservar fecha pedimos una señal de 50 € que se descuenta del precio final del tatuaje.',
  },
  {
    question: '¿El diseño está incluido?',
    answer:
      'Sí. El artista prepara el diseño a partir de tu idea y lo ajusta contigo antes de la sesión.',
  },
  {
    question: '¿Incluye retoque?',
    answer:
      'Incluimos un retoque gratuito dentro de los 3 primeros meses tras el tatuaje, si la cicatrización lo necesita.',
  },
  {
    question: '¿Puedo ir sin cita previa?',
    answer:
      'Trabajamos con cita para dedicar a cada pieza el tiempo que necesita. Escríbenos por WhatsApp y te decimos el primer hueco disponible.',
  },
];
