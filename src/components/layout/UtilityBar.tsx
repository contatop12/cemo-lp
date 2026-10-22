import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import type { SiteSettings } from '@/content/types';
import { telHref, whatsappHref } from '@/lib/contact';
import { OpenNowBadge } from './OpenNowBadge';

const linkClass =
  'min-target inline-flex items-center gap-2 px-2 font-bold text-papel no-underline hover:text-ciano-claro hover:underline';

// Barra discreta acima do header (só desktop): contato direto, endereço e horário.
export function UtilityBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="on-dark hidden bg-azul-profundo text-small text-texto-escuro-suave lg:block">
      <div className="mx-auto flex max-w-wide items-center justify-between gap-6 px-[var(--gutter)]">
        <p className="truncate">
          {settings.address.streetAddress} · {settings.address.city}/{settings.address.region}
          <span className="mx-3" aria-hidden="true">
            ·
          </span>
          <OpenNowBadge hours={settings.hours} />
        </p>
        <div className="flex items-center gap-2">
          {settings.externalExamOnlineUrl ? (
            // TODO_CONTENT_VALIDATION: confirmar se o "Exame online" continua em uso
            <a href={settings.externalExamOnlineUrl} className={linkClass} rel="noopener">
              Exame online
            </a>
          ) : null}
          <TrackedLink event="phone_click" location="utility-bar" href={telHref(settings)} className={linkClass}>
            <span className="sr-only">Ligar para </span>
            {settings.phone.display}
          </TrackedLink>
          <TrackedLink event="whatsapp_click" location="utility-bar" href={whatsappHref(settings)} className={linkClass}>
            <WhatsappIcon className="size-5" />
            WhatsApp {settings.whatsapp.display}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
