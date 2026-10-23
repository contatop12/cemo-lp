import { LeadForm } from '@/components/forms/LeadForm';
import type { LeadInterest, LeadInterestId, SiteSettings } from '@/content/types';
import { whatsappHref } from '@/lib/contact';

// Formulário curto contextual: o interesse da página já vem marcado (briefing §51). `id` vira âncora dos CTAs.
export function LeadPanel({
  id = 'agendar',
  title,
  interests,
  defaultInterest,
  settings,
  formId,
}: {
  id?: string;
  title: string;
  interests: LeadInterest[];
  defaultInterest?: LeadInterestId;
  settings: SiteSettings;
  formId: string;
}) {
  const headingId = `${id}-titulo`;
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28 rounded-lg bg-papel p-6 shadow-2 sm:p-8">
      <h2 id={headingId} className="text-h3">
        {title}
      </h2>
      <p className="mt-2 text-small text-tinta-suave">Deixe nome e WhatsApp: a equipe retorna para encontrar o melhor horário.</p>
      <div className="mt-5">
        <LeadForm interests={interests} defaultInterest={defaultInterest} formId={formId} location={formId} whatsappFallbackHref={whatsappHref(settings)} />
      </div>
    </section>
  );
}
