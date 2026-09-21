-- Panel de clientes (/panel): seguimiento de pagos y fuente de cada lead.
-- Todas las columnas son nullable sin default: ALTER instantáneo, sin reescritura de tabla.

-- Pagos
alter table public.leads
  add column if not exists precio_pagado numeric(10, 2),
  add column if not exists fecha_pago timestamptz;

-- Atribución (la rellena n8n al insertar el lead desde /api/landing)
alter table public.leads
  add column if not exists fuente text,      -- meta | google | tiktok | ia | directo | ...
  add column if not exists canal text,       -- paid | organic | referral | direct
  add column if not exists plataforma text,  -- instagram | facebook | google_ads | google_search | ...
  add column if not exists campana text,     -- utm_campaign
  add column if not exists atribucion jsonb; -- primer y último contacto en bruto (UTMs, click ids, referrer)

comment on column public.leads.precio_pagado is 'Importe cobrado al cliente en euros (panel /panel)';
comment on column public.leads.fecha_pago is 'Fecha en la que se registró el pago (panel /panel)';
comment on column public.leads.fuente is 'Origen del lead: meta, google, tiktok, ia, directo...';
comment on column public.leads.canal is 'paid, organic, referral o direct';
comment on column public.leads.plataforma is 'Detalle del origen: instagram, facebook, google_ads, google_search...';
comment on column public.leads.campana is 'utm_campaign del contacto atribuido';
comment on column public.leads.atribucion is 'Datos en bruto de atribución: first/last touch';
