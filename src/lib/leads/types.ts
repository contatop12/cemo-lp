import type { LeadInterestId } from '@/content/types';

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  wbraid?: string;
  gbraid?: string;
  landingPage: string;
  referrer: string;
  timestamp: string;
}

export interface LeadAttribution extends Attribution {
  conversionPage: string;
}

// whatsapp já normalizado: só dígitos, com o código do país (55).
export interface LeadSubmission {
  name: string;
  whatsapp: string;
  interest: LeadInterestId;
  attribution: LeadAttribution;
}

export interface LeadRecord extends LeadSubmission {
  id: string;
  receivedAt: string;
  source: 'cemo-site';
}

export type LeadFieldErrors = Partial<Record<'name' | 'whatsapp' | 'interest', string>>;
