import { TrackedLink } from '@/components/analytics/TrackedLink';
import { LeadForm } from '@/components/forms/LeadForm';
import { WhatsappIcon } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import type { LeadInterest, SiteSettings } from '@/content/types';
import { formatHoursLines, telHref, whatsappHref } from '@/lib/contact';

// Entrada de conversão logo após o hero/prova: formulário curto + contato direto.
export function ConversionBlock({ interests, settings }: { interests: LeadInterest[]; settings: SiteSettings }) {
  return (
    <Section id="agendar" tone="nevoa" labelledBy="agendar-titulo">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="agendar-titulo" className="text-h2">
            Quer agendar uma consulta?
          </h2>
          <p className="mt-4 max-w-[48ch] text-lead text-tinta-suave">
            Deixe seu nome e WhatsApp. Nossa equipe retorna para encontrar o melhor horário para você.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <p className="font-bold">Prefere falar agora?</p>
            <TrackedLink
              event="whatsapp_click"
              location="home_conversion"
              href={whatsappHref(settings)}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
            >
              <WhatsappIcon />
              Falar no WhatsApp
            </TrackedLink>
            <TrackedLink
              event="phone_click"
              location="home_conversion"
              href={telHref(settings)}
              className="inline-flex min-h-12 w-fit items-center font-bold text-azul-700 underline underline-offset-[3px]"
            >
              Ligar para {settings.phone.display}
            </TrackedLink>
            <ul className="mt-2 text-tinta-suave">
              {formatHoursLines(settings).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-lg bg-papel p-6 shadow-1 sm:p-8 lg:col-span-6 lg:col-start-7">
          <LeadForm
            interests={interests}
            formId="home_conversion"
            location="home_conversion"
            whatsappFallbackHref={whatsappHref(settings)}
          />
        </div>
      </div>
    </Section>
  );
}
