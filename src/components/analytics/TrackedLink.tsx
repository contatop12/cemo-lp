'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { track, type AnalyticsEventName, type TrackParams } from '@/lib/analytics/events';

export function TrackedLink({
  event,
  location,
  href,
  params,
  onClick,
  ...rest
}: {
  event: AnalyticsEventName;
  location: string;
  href: string;
  params?: Omit<TrackParams, 'location'>;
} & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    track(event, { ...params, location });
    onClick?.(e);
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link href={href} onClick={handleClick} {...rest} />;
  }
  // Externos (WhatsApp, mapas…): noopener por padrão, a menos que o chamador defina rel.
  const rel = rest.rel ?? (/^https?:/.test(href) ? 'noopener' : undefined);
  return <a href={href} onClick={handleClick} {...rest} rel={rel} />;
}
