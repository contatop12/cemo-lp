import { z } from 'zod';
import { LEAD_INTEREST_IDS, type LeadInterestId } from '@/content/types';
import { sanitizeText } from './sanitize';
import type { LeadAttribution, LeadFieldErrors, LeadSubmission } from './types';

export const FIELD_MESSAGES = {
  name: 'Informe seu nome (pelo menos 2 letras).',
  whatsapp: 'Informe um telefone com DDD, por exemplo (11) 91234-5678',
  interest: 'Escolha o que você está buscando.',
} as const;

// Telefones brasileiros: DDD (11–99) + 8 dígitos (fixo) ou 9 dígitos começando por 9 (celular).
export function normalizeWhatsapp(input: string): string | null {
  if (/[a-z]/i.test(input)) return null;
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = digits.replace(/^0+/, ''); // prefixo de operadora/tronco
  let national = digits;
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) national = digits.slice(2);
  if (national.length !== 10 && national.length !== 11) return null;
  if (!/^[1-9][1-9]/.test(national)) return null;
  if (national.length === 11 && national[2] !== '9') return null;
  return `55${national}`;
}

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;

const rawSchema = z.object({
  name: z.string(),
  whatsapp: z.string(),
  interest: z.string(),
  website: z.string().optional(),
  attribution: z.unknown().optional(),
});

const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'wbraid',
  'gbraid',
  'landingPage',
  'conversionPage',
  'referrer',
  'timestamp',
] as const;

// Atribuição é opcional (storage pode estar bloqueado): chaves desconhecidas descartadas, strings ≤ 500.
function parseAttribution(value: unknown): LeadAttribution {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  const out: Record<string, string> = { landingPage: '', conversionPage: '', referrer: '', timestamp: '' };
  for (const key of ATTRIBUTION_KEYS) {
    const v = source[key];
    if (typeof v === 'string' && v.trim() !== '') out[key] = sanitizeText(v, 500);
  }
  return out as unknown as LeadAttribution;
}

export function validateLeadInput(
  raw: unknown,
): { ok: true; data: LeadSubmission; honeypotFilled: boolean } | { ok: false; errors: LeadFieldErrors } {
  const parsed = rawSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: LeadFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field === 'name' || field === 'whatsapp' || field === 'interest') errors[field] = FIELD_MESSAGES[field];
    }
    return { ok: false, errors: Object.keys(errors).length > 0 ? errors : { ...FIELD_MESSAGES } };
  }

  const input = parsed.data;
  const errors: LeadFieldErrors = {};

  const name = sanitizeText(input.name, 80);
  if (name.length < 2 || !NAME_PATTERN.test(name)) errors.name = FIELD_MESSAGES.name;

  const whatsapp = normalizeWhatsapp(input.whatsapp);
  if (!whatsapp) errors.whatsapp = FIELD_MESSAGES.whatsapp;

  const interest = input.interest as LeadInterestId;
  if (!(LEAD_INTEREST_IDS as readonly string[]).includes(interest)) errors.interest = FIELD_MESSAGES.interest;

  if (Object.keys(errors).length > 0 || !whatsapp) return { ok: false, errors };

  return {
    ok: true,
    honeypotFilled: typeof input.website === 'string' && input.website.trim() !== '',
    data: { name, whatsapp, interest, attribution: parseAttribution(input.attribution) },
  };
}
