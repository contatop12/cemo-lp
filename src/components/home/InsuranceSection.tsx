import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import { InsuranceGrid } from '@/components/ui/InsuranceGrid';
import { Section } from '@/components/ui/Section';
import type { InsurancePlan, SiteSettings } from '@/content/types';
import { whatsappHref } from '@/lib/contact';

export function InsuranceSection({ plans, settings }: { plans: InsurancePlan[]; settings: SiteSettings }) {
  return (
    <Section id="convenios" labelledBy="convenios-titulo">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="convenios-titulo" className="text-h2">
            Convênios
          </h2>
          <p className="mt-4 text-lead text-tinta-suave">Consulte a cobertura do seu plano antes de agendar.</p>
          <p className="mt-3 text-small text-tinta-suave">
            A cobertura depende do plano, do procedimento e da autorização da operadora.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <TrackedLink
              event="whatsapp_click"
              location="convenios"
              href={whatsappHref(settings, 'Olá! Gostaria de confirmar a cobertura do meu convênio no CEMO.')}
              className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
            >
              <WhatsappIcon />
              Confirmar cobertura
            </TrackedLink>
            <Link href="/convenios/" className="inline-flex min-h-12 w-fit items-center font-bold text-azul-700 underline underline-offset-[3px]">
              Ver convênios
            </Link>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <InsuranceGrid plans={plans} />
        </div>
      </div>
    </Section>
  );
}
