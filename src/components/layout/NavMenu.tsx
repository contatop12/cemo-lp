'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import type { NavGroup, NavLink } from '@/content/types';
import { cn } from '@/lib/cn';

// Clique/Enter é o caminho principal; hover abre com atraso de 150 ms só para mouse.
const HOVER_DELAY_MS = 150;

const visible = (links: NavLink[]) => links.filter((l) => l.published !== false);

const linkClass =
  'flex min-h-12 items-center rounded-sm px-3 text-ui text-tinta no-underline hover:bg-nevoa-2 hover:text-azul-700 ' +
  'aria-[current=page]:font-bold aria-[current=page]:text-azul-700';

export function NavMenu({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const uid = useId();
  const [openId, setOpenId] = useState<NavGroup['id'] | null>(null);
  const root = useRef<HTMLUListElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const panels = useRef(new Map<string, HTMLDivElement>());
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focusOnOpen = useRef<NavGroup['id'] | null>(null);

  useEffect(() => {
    if (!openId) return;
    function onPointerDown(e: PointerEvent | MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node)) setOpenId(null);
    }
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape' && openId) {
        const button = buttons.current.get(openId);
        setOpenId(null);
        button?.focus();
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openId]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // Foca o primeiro link só depois que o painel aberto foi renderizado (um painel hidden não recebe foco).
  useEffect(() => {
    if (openId && focusOnOpen.current === openId) {
      focusOnOpen.current = null;
      panels.current.get(openId)?.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  }, [openId]);

  function onButtonKeyDown(e: KeyboardEvent<HTMLButtonElement>, id: NavGroup['id']) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusOnOpen.current = id;
      setOpenId(id);
    }
  }

  function hover(id: NavGroup['id'] | null) {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenId(id), HOVER_DELAY_MS);
  }

  const current = (href: string) => (pathname === href ? 'page' : undefined);

  return (
    <ul
      ref={root}
      className="flex items-center gap-1"
      onBlur={(e) => {
        // Foco de teclado saiu do menu: fecha para o painel não cobrir o elemento focado (WCAG 2.4.11).
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null);
      }}
    >
      {groups.map((group) => {
        if (group.kind === 'link' && group.href) {
          return (
            <li key={group.id}>
              <Link href={group.href} aria-current={current(group.href)} className="flex min-h-12 items-center whitespace-nowrap rounded-sm px-2.5 text-[0.9375rem] font-semibold text-tinta no-underline hover:bg-nevoa-2 hover:text-azul-700 aria-[current=page]:font-bold aria-[current=page]:text-azul-700 2xl:px-3 2xl:text-ui">
                {group.label}
              </Link>
            </li>
          );
        }

        const panelId = `${uid}-${group.id}`;
        const open = openId === group.id;
        const links = visible(group.links);

        return (
          <li
            key={group.id}
            className="relative"
            onMouseEnter={(e) => e.nativeEvent instanceof MouseEvent && hover(group.id)}
            onMouseLeave={() => hover(null)}
          >
            <button
              type="button"
              ref={(el) => {
                if (el) buttons.current.set(group.id, el);
              }}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : group.id)}
              onKeyDown={(e) => onButtonKeyDown(e, group.id)}
              className={cn(
                'flex min-h-12 items-center gap-1 whitespace-nowrap rounded-sm px-2.5 text-[0.9375rem] font-semibold text-tinta hover:text-azul-700 2xl:px-3 2xl:text-ui',
                open && 'text-azul-700',
              )}
            >
              {group.label}
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className={cn('transition-transform duration-[var(--duration-fast)]', open && 'rotate-180')}>
                <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <div
              id={panelId}
              ref={(el) => {
                if (el) panels.current.set(group.id, el);
              }}
              hidden={!open}
              className={cn(
                'absolute left-0 top-full z-40 mt-2 rounded-lg border border-borda bg-papel p-4 shadow-3',
                group.kind === 'mega' ? 'w-[min(40rem,80vw)]' : 'w-72',
              )}
            >
              {group.featured ? (
                <Link
                  href={group.featured.href}
                  aria-current={current(group.featured.href)}
                  className="mb-3 flex min-h-12 items-center rounded-md bg-nevoa px-3 font-bold text-azul-700 no-underline hover:bg-nevoa-2"
                >
                  {group.featured.label}
                </Link>
              ) : null}
              <ul className={cn('grid gap-1', group.kind === 'mega' && 'sm:grid-cols-2')}>
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} aria-current={current(link.href)} className={linkClass} onClick={() => setOpenId(null)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {group.viewAll ? (
                <Link
                  href={group.viewAll.href}
                  className="mt-3 flex min-h-12 items-center border-t border-borda px-3 pt-3 font-bold text-azul-700 underline underline-offset-[3px]"
                >
                  {group.viewAll.label}
                </Link>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
