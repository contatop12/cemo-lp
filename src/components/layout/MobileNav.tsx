'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { WhatsappIcon } from '@/components/ui/icons';
import type { NavGroup, SiteSettings } from '@/content/types';
import { cn } from '@/lib/cn';
import { whatsappHref } from '@/lib/contact';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const noop = () => () => {};
// true só no cliente: o portal precisa de document.body.
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

// Diálogo modal em portal (fora de #app-root): o resto da página recebe `inert` e a rolagem trava.
export function MobileNav({ groups, settings }: { groups: NavGroup[]; settings: SiteSettings }) {
  const uid = useId();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<NavGroup['id'] | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const dialogId = `${uid}-menu`;

  useEffect(() => {
    if (!open) return;
    const appRoot = document.getElementById('app-root');
    const html = document.documentElement;
    appRoot?.setAttribute('inert', '');
    html.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    const button = trigger.current;
    return () => {
      appRoot?.removeAttribute('inert');
      html.style.overflow = '';
      button?.focus();
    };
  }, [open]);

  function close() {
    setOpen(false);
    setExpanded(null);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab' || !dialog.current) return;
    // Ignora itens dentro de painéis fechados do acordeão (hidden).
    const items = [...dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => !el.closest('[hidden]'));
    const first = items[0];
    const last = items[items.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const rowClass = 'flex min-h-12 w-full items-center justify-between rounded-sm px-3 text-left text-ui font-medium text-tinta no-underline';

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
        className="inline-flex min-h-12 min-w-12 items-center gap-2 rounded-md border-2 border-azul-cemo px-4 font-bold text-azul-700 xl:hidden"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Menu
      </button>
      {open && isClient
        ? createPortal(
            <div
              ref={dialog}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onKeyDown={onKeyDown}
              className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-papel"
            >
              <div className="flex items-center justify-between gap-3 border-b border-borda px-[var(--gutter)] py-3">
                <TrackedLink
                  event="whatsapp_click"
                  location="mobile_nav"
                  href={whatsappHref(settings)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-md bg-whatsapp px-4 font-bold text-papel no-underline"
                >
                  <WhatsappIcon className="size-5" />
                  WhatsApp
                </TrackedLink>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md px-3 font-bold text-azul-700"
                >
                  Fechar
                </button>
              </div>
              <nav aria-label="Principal (celular)" className="px-[var(--gutter)] py-4">
                <ul className="flex flex-col gap-1">
                  {groups.map((group) => {
                    if (group.kind === 'link' && group.href) {
                      return (
                        <li key={group.id}>
                          <Link href={group.href} onClick={close} className={rowClass}>
                            {group.label}
                          </Link>
                        </li>
                      );
                    }
                    const isOpen = expanded === group.id;
                    const panelId = `${uid}-${group.id}`;
                    return (
                      <li key={group.id} className="border-b border-borda">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setExpanded(isOpen ? null : group.id)}
                          className={rowClass}
                        >
                          {group.label}
                          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className={cn(isOpen && 'rotate-180')}>
                            <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </button>
                        <ul id={panelId} hidden={!isOpen} className="pb-3 pl-3">
                          {[group.featured, ...group.links.filter((l) => l.published !== false), group.viewAll]
                            .filter((l): l is NonNullable<typeof l> => Boolean(l))
                            .map((link) => (
                              <li key={link.href + link.label}>
                                <Link href={link.href} onClick={close} className={cn(rowClass, 'font-normal', link === group.viewAll && 'font-bold text-azul-700')}>
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
