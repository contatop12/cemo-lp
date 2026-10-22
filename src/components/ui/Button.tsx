import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'whatsapp' | 'secondary' | 'onDark' | 'link';

export type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

const base =
  'inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-md px-7 py-4 text-ui font-bold no-underline ' +
  'transition-colors duration-[var(--duration-fast)] ease-standard active:translate-y-px ' +
  'aria-disabled:pointer-events-none aria-disabled:bg-nevoa-2 aria-disabled:text-tinta-suave ' +
  'disabled:bg-nevoa-2 disabled:text-tinta-suave';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-azul-cemo text-papel hover:bg-azul-700',
  whatsapp: 'bg-whatsapp text-papel hover:bg-[#095A31]',
  secondary: 'border-2 border-azul-cemo bg-transparent text-azul-700 hover:bg-nevoa-2',
  onDark: 'bg-papel text-azul-profundo hover:bg-nevoa-2',
  link:
    'min-h-[3.25rem] px-0 bg-transparent text-azul-700 underline decoration-2 underline-offset-[3px] hover:decoration-[3px]',
};

export function Button({ variant = 'primary', href, children, className, type, ...rest }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes} {...(rest as ComponentPropsWithoutRef<'a'>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as Omit<ComponentPropsWithoutRef<'a'>, 'href'>)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
}
