import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { cn } from '@/lib/cn';

// Topo das páginas internas: trilha, H1, abertura e (em páginas comerciais) o formulário ao lado, acima da metade da
// página (briefing §52). Os anéis finos ao fundo repetem o motivo da Home em escala menor.
export function PageHero({
  breadcrumbs,
  title,
  lead,
  children,
  aside,
  compact = false,
}: {
  breadcrumbs: Array<{ name: string; path: string }>;
  title: string;
  lead: string;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-borda bg-nevoa">
      <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className="pointer-events-none absolute -right-40 -top-40 hidden w-[40rem] lg:block">
        {[60, 96, 126, 151, 172, 189, 202].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" className="stroke-azul-cemo" strokeOpacity={0.1} strokeWidth={1} />
        ))}
      </svg>
      <div
        className={cn(
          'relative mx-auto grid max-w-wide gap-10 px-[var(--gutter)] lg:grid-cols-12 lg:gap-8',
          compact ? 'pb-12 pt-6 lg:pb-14' : 'pb-12 pt-6 lg:pb-20',
        )}
      >
        <div className={cn(aside ? 'lg:col-span-7' : 'lg:col-span-9')}>
          <Breadcrumbs items={breadcrumbs} />
          <h1 id="page-title" className="mt-6 max-w-[22ch] text-h1 lg:mt-8">
            {title}
          </h1>
          <p className="mt-5 max-w-[56ch] text-lead text-tinta-suave">{lead}</p>
          {children}
        </div>
        {aside ? <div className="lg:col-span-5 lg:pt-14">{aside}</div> : null}
      </div>
    </section>
  );
}
