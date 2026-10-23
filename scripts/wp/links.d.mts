export type HrefDecision =
  | { kind: 'internal' | 'asset' | 'external' | 'anchor' | 'contact'; href: string }
  | { kind: 'unlink' };

export function classifyHref(
  href: string | null,
  tables: { redirects: Record<string, string>; gone: Set<string>; fixes?: Record<string, string> },
): HrefDecision;
