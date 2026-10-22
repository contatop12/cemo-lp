import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Logo } from '@/components/brand/Logo';
import type { NavGroup, SiteSettings } from '@/content/types';
import { NavMenu } from './NavMenu';
import { UtilityBar } from './UtilityBar';

// Header fixo no topo com fundo sólido. Ao rolar, encolhe (80 → 68 px) e ganha sombra via animação
// guiada pela rolagem em CSS (sem listener de scroll); navegadores sem suporte mantêm o header estático.
export function Header({ settings, navigation }: { settings: SiteSettings; navigation: NavGroup[] }) {
  return (
    <>
      <UtilityBar settings={settings} />
      <header className="site-header sticky top-0 z-30 border-b border-borda bg-papel">
        <div className="mx-auto flex h-[var(--header-h,5rem)] max-w-wide items-center justify-between gap-6 px-[var(--gutter)]">
          <Link href="/" className="shrink-0 rounded-sm">
            <Logo height={56} priority className="h-12 w-auto lg:h-14" />
          </Link>
          <nav aria-label="Principal" className="hidden lg:block">
            <NavMenu groups={navigation} />
          </nav>
          <TrackedLink
            event="schedule_click"
            location="header"
            href="/#agendar"
            className="hidden min-h-[3.25rem] items-center rounded-md bg-azul-cemo px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-azul-700 lg:inline-flex"
          >
            Agendar consulta
          </TrackedLink>
        </div>
      </header>
    </>
  );
}
