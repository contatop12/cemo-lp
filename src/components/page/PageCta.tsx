import { TrackedLink } from '@/components/analytics/TrackedLink';
import { LeadForm } from '@/components/forms/LeadForm';
import { WhatsappIcon } from '@/components/ui/icons';
import type { LeadInterest, LeadInterestId, SiteSettings } from '@/content/types';
import { directionsHref, formatAddress, formatHoursLines, telHref, whatsappHref } from '@/lib/contact';

// Fecho das páginas comerciais: o formulário de novo (briefing §52), contato direto e onde fica — "é perto de mim?".
export function PageCta({
  title,
  interests,
  defaultInterest,
  settings,
  formId,
}: {
  title: string;
  interests: LeadInterest[];
  defaultInterest?: LeadInterestId;
  settings: SiteSettings;
  formId: string;
}) {
  return (
    <section id="agendar-final" aria-labelledby="agendar-final-titulo" className="on-dark scroll-mt-28 bg-azul-profundo py-[var(--space-section)] text-papel">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="agendar-final-titulo" className="max-w-[18ch] text-h2 text-papel">
            {title}
          </h2>
          <p className="mt-4 max-w-[44ch] text-lead text-texto-escuro-suave">
            Atendimento no CEMO, em Taboão da Serra: consulta com o especialista da área e exames no mesmo lugar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <TrackedLink
              event="whatsapp_click"
              location={`${formId}_cta`}
              href={whatsappHref(settings)}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-4 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
            >
              <WhatsappIcon />
              Falar no WhatsApp
            </TrackedLink>
            <TrackedLink
              event="phone_click"
              location={`${formId}_cta`}
              href={telHref(settings)}
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-md border-2 border-papel px-6 py-4 text-ui font-bold text-papel no-underline hover:bg-papel/10"
            >
              Ligar {settings.phone.display}
            </TrackedLink>
          </div>
          <div className="mt-10 border-t border-papel/20 pt-6 text-texto-escuro-suave">
            <p className="font-bold text-papel">{formatAddress(settings)}</p>
            <ul className="mt-2">
              {formatHoursLines(settings).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <TrackedLink
              event="directions_click"
              location={`${formId}_cta`}
              href={directionsHref(settings)}
              className="mt-3 inline-flex min-h-12 items-center font-bold text-papel underline underline-offset-[3px]"
            >
              Como chegar
            </TrackedLink>
          </div>
        </div>
        <div className="rounded-lg bg-papel p-6 text-tinta sm:p-8 lg:col-span-6 lg:col-start-7">
          <LeadForm interests={interests} defaultInterest={defaultInterest} formId={formId} location={formId} whatsappFallbackHref={whatsappHref(settings)} />
        </div>
      </div>
    </section>
  );
}
