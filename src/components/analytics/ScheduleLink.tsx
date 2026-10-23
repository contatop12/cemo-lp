'use client';

import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { TrackedLink } from './TrackedLink';

// "Agendar" do header e da barra fixa: se a página tem formulário próprio (#agendar no topo ou #agendar-final no fim),
// leva até ele com o primeiro campo focado; senão, vai ao formulário da Home.
export function ScheduleLink({ location, ...rest }: { location: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById('agendar') ?? document.getElementById('agendar-final');
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    target.querySelector<HTMLElement>('input, select, textarea')?.focus({ preventScroll: true });
    window.history.replaceState(null, '', `#${target.id}`);
  }
  return <TrackedLink event="schedule_click" location={location} href="/#agendar" onClick={onClick} {...rest} />;
}
