import Link from 'next/link';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Logo } from '@/components/brand/Logo';
import type { NavGroup, SiteSettings } from '@/content/types';
import { MobileNav } from './MobileNav';
import { NavMenu } from './NavMenu';
import { UtilityBar } from './UtilityBar';

// Header fixo no topo com fundo sólido. Menu completo a partir de 1280 px (abaixo disso, o menu em gaveta: com o
// logo horizontal os seis grupos não cabem em uma linha em 1024–1279 px). Ao rolar, encolhe (80 → 68 px) e ganha sombra via animação
// guiada pela rolagem em CSS (sem listener de scroll); navegadores sem suporte mantêm o header estático.
export function Header({ settings, navigation }: { settings: SiteSettings; navigation: NavGroup[] }) {
  return (
    <>
      <UtilityBar settings={settings} />
      <header className="site-header sticky top-0 z-30 border-b border-borda bg-papel">
        <div className="mx-auto flex h-[var(--header-h,5rem)] max-w-wide items-center justify-between gap-4 px-[var(--gutter)]">
          <Link href="/" className="shrink-0 rounded-sm">
            <Logo layout="horizontal" height={40} className="h-9 w-auto 2xl:h-10" />
          </Link>
          <nav aria-label="Principal" className="hidden xl:block">
            <NavMenu groups={navigation} />
          </nav>
          <TrackedLink
            event="schedule_click"
            location="header"
            href="/#agendar"
            aria-label="Agendar consulta"
            className="hidden min-h-[3.25rem] shrink-0 items-center whitespace-nowrap rounded-md bg-azul-cemo px-5 py-3 text-[1.0625rem] font-bold 2xl:text-ui text-papel no-underline hover:bg-azul-700 xl:inline-flex"
          >
            <span aria-hidden="true" className="2xl:hidden">Agendar</span>
            <span aria-hidden="true" className="hidden 2xl:inline">Agendar consulta</span>
          </TrackedLink>
          <MobileNav groups={navigation} settings={settings} />
        </div>
      </header>
    </>
  );
}
