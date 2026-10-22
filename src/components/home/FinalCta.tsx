import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import type { SiteSettings } from '@/content/types';
import { whatsappHref } from '@/lib/contact';

// Única faixa azul-profundo da Home.
export function FinalCta({ settings }: { settings: SiteSettings }) {
  return (
    <section id="agende" aria-labelledby="agende-titulo" className="on-dark py-[var(--space-section)]">
      <div className="mx-auto max-w-wide px-[var(--gutter)]">
        {/* Curva-pálpebra com raio fixo: o texto nunca fica sob a curva. */}
        <div className="rounded-tl-[6rem_4rem] bg-azul-profundo px-6 pb-14 pt-20 text-papel sm:px-12 lg:rounded-tl-[14rem_9rem] lg:px-20 lg:pt-24">
          <h2 id="agende-titulo" className="max-w-[20ch] text-h2 text-papel">
            Cuide da sua visão com quem acompanha cada etapa
          </h2>
          <p className="mt-4 max-w-[52ch] text-lead text-texto-escuro-suave">
            Agende sua consulta na CEMO, em Taboão da Serra. Nossa equipe orienta você do primeiro contato ao acompanhamento.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              event="schedule_click"
              location="final"
              href="#agendar"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md bg-papel px-7 py-4 text-ui font-bold text-azul-profundo no-underline hover:bg-nevoa-2"
            >
              Agendar consulta
            </TrackedLink>
            <TrackedLink
              event="whatsapp_click"
              location="final"
              href={whatsappHref(settings)}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-md bg-whatsapp px-7 py-4 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
            >
              <WhatsappIcon />
              Falar no WhatsApp
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
