import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

const tones = {
  papel: 'bg-papel',
  nevoa: 'bg-nevoa',
  escuro: 'on-dark bg-azul-profundo text-papel',
} as const;

export function Section({
  id,
  tone = 'papel',
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone?: 'papel' | 'nevoa' | 'escuro';
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-[var(--space-section)]', tones[tone], className)}>
      {children}
    </section>
  );
}
