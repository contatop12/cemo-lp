import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const sizes = {
  site: 'max-w-site',
  wide: 'max-w-wide',
  prose: 'max-w-prose',
} as const;

export function Container({
  size = 'site',
  as: Tag = 'div',
  className,
  children,
}: {
  size?: 'site' | 'wide' | 'prose';
  as?: 'div' | 'section';
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn('mx-auto w-full px-[var(--gutter)]', sizes[size], className)}>{children}</Tag>;
}
