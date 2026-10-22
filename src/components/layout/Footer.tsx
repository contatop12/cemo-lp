import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Logo } from '@/components/brand/Logo';
import type { Doctor, NavGroup, NavLink, SiteSettings } from '@/content/types';
import { formatAddress, formatHoursLines, telHref, whatsappHref } from '@/lib/contact';

const linkClass = 'inline-flex min-h-12 min-w-12 items-center text-papel no-underline hover:text-ciano-claro hover:underline';

function group(navigation: NavGroup[], id: NavGroup['id']) {
  return navigation.find((g) => g.id === id);
}

const published = (links: NavLink[]) => links.filter((l) => l.published !== false);

function Column({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="font-sans text-ui font-bold text-verde-cemo">{title}</h2>
      <ul className="mt-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  settings,
  navigation,
  technicalResponsible,
}: {
  settings: SiteSettings;
  navigation: NavGroup[];
  technicalResponsible: Doctor | null;
}) {
  const especialidades = published(group(navigation, 'especialidades')?.links ?? []);
  const exames = group(navigation, 'exames');
  const conteudos = published(group(navigation, 'conteudos')?.links ?? []);
  const cemo: NavLink[] = [
    ...(group(navigation, 'a-cemo')?.links ?? []),
    { label: 'Corpo Clínico', href: '/corpo-clinico/' },
  ];

  return (
    <footer className="on-dark bg-azul-profundo text-texto-escuro-suave">
      <div className="mx-auto grid max-w-wide gap-10 px-[var(--gutter)] py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="white" height={64} />
          <address className="mt-6 not-italic">
            <p className="font-bold text-papel">{settings.name}</p>
            <p className="mt-2">{formatAddress(settings)}</p>
            <ul className="mt-3">
              <li>
                <TrackedLink event="phone_click" location="footer" href={telHref(settings)} className={linkClass}>
                  Telefone {settings.phone.display}
                </TrackedLink>
              </li>
              <li>
                <TrackedLink event="whatsapp_click" location="footer" href={whatsappHref(settings)} className={linkClass}>
                  WhatsApp {settings.whatsapp.display}
                </TrackedLink>
              </li>
              <li>
                <a href={`mailto:${settings.email}`} className={linkClass}>
                  {settings.email}
                </a>
              </li>
            </ul>
          </address>
          <div className="mt-4">
            <p className="font-bold text-papel">Horário de atendimento</p>
            <ul className="mt-1">
              {formatHoursLines(settings).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <Column title="CEMO" links={cemo} />
        <Column title="Especialidades" links={especialidades} />
        <Column
          title="Exames"
          links={[...(exames?.links ?? []).slice(0, 6), { label: 'Todos os exames', href: exames?.viewAll?.href ?? '/exames/' }]}
        />
        <Column title="Condições e conteúdos" links={conteudos} />
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-wide flex-col gap-4 px-[var(--gutter)] py-6 text-small md:flex-row md:items-center md:justify-between">
          <div>
            {technicalResponsible ? (
              <p>
                {`Responsável técnico: ${technicalResponsible.honorific} ${technicalResponsible.name} — ${technicalResponsible.crm}`}
              </p>
            ) : null}
            <p>© {settings.name}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6">
            <li>
              <Link href="/privacidade/" className={linkClass}>
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link href="/cookies/" className={linkClass}>
                Política de cookies
              </Link>
            </li>
            <li>
              <a href={settings.social.instagram} rel="noopener noreferrer" target="_blank" className={linkClass}>
                Instagram
              </a>
            </li>
            <li>
              <a href={settings.social.facebook} rel="noopener noreferrer" target="_blank" className={linkClass}>
                Facebook
              </a>
            </li>
            <li>Desenvolvido por P12 Digital</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
