import type { DayOfWeek, SiteSettings } from '@/content/types';

// Saudação idêntica à do site WordPress: o gatilho da conversão de WhatsApp no GTM (GTM-PH3D5ZS) é
// "Click URL contém api.whatsapp.com/send?phone=…&text=<saudação>". O assunto vem depois dela.
const WHATSAPP_GREETING = 'Olá, Estou entrando em contato através do site CEMO!';
// Assunto genérico: nunca carrega informação de saúde (LGPD).
const DEFAULT_WHATSAPP_TOPIC = 'Gostaria de agendar uma consulta.';

export function formatAddress(s: SiteSettings): string {
  const a = s.address;
  return `${a.streetAddress} – ${a.neighborhood}, ${a.city}/${a.region}, CEP ${a.postalCode}`;
}

function addressQuery(s: SiteSettings): string {
  const a = s.address;
  return `${a.streetAddress}, ${a.city} - ${a.region}, ${a.postalCode}`;
}

export function whatsappHref(s: SiteSettings, topic: string = DEFAULT_WHATSAPP_TOPIC): string {
  return `https://api.whatsapp.com/send?phone=${s.whatsapp.digits}&text=${encodeURIComponent(`${WHATSAPP_GREETING} ${topic}`)}`;
}

export function telHref(s: SiteSettings): string {
  return `tel:${s.phone.e164}`;
}

export function directionsHref(s: SiteSettings): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressQuery(s))}`;
}

export function mapsEmbedSrc(s: SiteSettings): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(addressQuery(s))}&output=embed`;
}

export function reviewsHref(s: SiteSettings): string {
  if (s.googleBusiness.reviewsUrl) return s.googleBusiness.reviewsUrl;
  // TODO_CONTENT_VALIDATION em siteSettings.todos: substituir pela URL de avaliações do perfil.
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.shortName} ${s.address.city}`)}`;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  Monday: 'Segunda',
  Tuesday: 'Terça',
  Wednesday: 'Quarta',
  Thursday: 'Quinta',
  Friday: 'Sexta',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

export function formatHoursLines(s: SiteSettings): string[] {
  return s.hours.map((spec) => {
    const first = spec.days[0];
    const last = spec.days[spec.days.length - 1];
    if (!first || !last) return '';
    const days =
      first === last ? DAY_LABELS[first] : `${DAY_LABELS[first]} a ${DAY_LABELS[last].toLowerCase()}`;
    return `${days}: ${spec.opens} às ${spec.closes}`;
  });
}
