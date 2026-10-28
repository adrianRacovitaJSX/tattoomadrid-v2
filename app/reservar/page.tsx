import ReservaForm from "@/components/reservar/formulario";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import JsonLd from "@/components/json-ld";
import { buildMetadata, BUSINESS } from "@/lib/seo";
import { reserveActionSchema } from "@/lib/schema";
import { CONTACT_FAQS } from "@/lib/faqs";
import { ADDRESS_LINE, HOURS_LINES, MAPS_URL, TEL_HREF } from "@/lib/contact";
import { Breadcrumbs, Container, FaqList, Section, SectionHeader } from "@/components/site/blocks";
import { WhatsAppLink } from "@/components/site/cta-link";

export const metadata = buildMetadata({
  title: "Pedir Cita de Tatuaje en Madrid",
  description:
    "Pide cita en Saints & Sinners Madrid: cuéntanos tu idea por WhatsApp o con el formulario y te respondemos con propuesta, precio y fechas disponibles.",
  path: "/reservar",
  ogTitle: "Reserva tu cita en Saints & Sinners",
  ogKicker: "Propuesta y presupuesto sin compromiso",
  mdSlug: "reservar",
  keywords: ["reservar cita tatuaje Madrid", "pedir cita tatuaje Madrid", "contacto estudio tatuajes Madrid"],
});

export default function ReservarPage() {
  return (
    <>
      <JsonLd id="ld-reserve-action" data={reserveActionSchema()} />

      <section aria-labelledby="reservar-h1" className="pt-28 lg:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: "Reservar", path: "/reservar" }]} />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6">Reservar</p>
              <h1 id="reservar-h1" className="font-display text-5xl leading-[1.02] tracking-tight text-bone sm:text-7xl">
                Cuéntanos tu idea
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
                La forma más rápida es WhatsApp: mándanos la idea, la zona y una foto de referencia. Si lo prefieres, usa el formulario y te escribimos nosotros.
              </p>
              <div className="mt-8">
                <WhatsAppLink placement="reservar-hero" size="lg" />
              </div>

              <div className="mt-12">
                <p className="mb-4 text-sm text-ash">O rellena el formulario:</p>
                <ReservaForm />
              </div>
            </div>

            <aside aria-label="Datos del estudio" className="lg:col-span-5">
              <div className="space-y-8 rounded-[4px] border border-line bg-surface-1 p-6 sm:p-8 lg:sticky lg:top-28">
                <div className="flex gap-4">
                  <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <h2 className="font-medium text-bone">Dirección</h2>
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-1 block text-ash hover:text-gold">
                      {ADDRESS_LINE}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div className="flex-1">
                    <h2 className="font-medium text-bone">Horario</h2>
                    <dl className="mt-1 space-y-1">
                      {HOURS_LINES.map((h) => (
                        <div key={h.days} className="flex justify-between gap-4 text-ash">
                          <dt>{h.days}</dt>
                          <dd className="tabular text-bone">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <h2 className="font-medium text-bone">Teléfono</h2>
                    <a href={TEL_HREF} className="tabular mt-1 block text-ash hover:text-gold">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail aria-hidden className="mt-1 size-5 shrink-0 text-gold" />
                  <div>
                    <h2 className="font-medium text-bone">Email</h2>
                    <a href={`mailto:${BUSINESS.email}`} className="mt-1 block break-all text-ash hover:text-gold">
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Section labelledBy="faq-title" className="mt-12 border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeader id="faq-title" eyebrow="Dudas" title="Antes de reservar" />
          <FaqList items={CONTACT_FAQS} schemaId="ld-faq-reservar" />
        </div>
      </Section>
    </>
  );
}
