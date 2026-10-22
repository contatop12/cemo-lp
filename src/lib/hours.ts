import type { DayOfWeek, OpeningHoursSpec } from '@/content/types';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Sao_Paulo',
  weekday: 'long',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function toMinutes(hhmm: string): number {
  const [h = '0', m = '0'] = hhmm.split(':');
  return Number(h) * 60 + Number(m);
}

// Horário de Brasília independente do fuso da máquina; `closes` é exclusivo.
export function isOpenNow(hours: OpeningHoursSpec[], now: Date): boolean {
  const parts = formatter.formatToParts(now);
  const weekday = parts.find((p) => p.type === 'weekday')?.value as DayOfWeek | undefined;
  const hour = parts.find((p) => p.type === 'hour')?.value ?? '0';
  const minute = parts.find((p) => p.type === 'minute')?.value ?? '0';
  if (!weekday) return false;
  const current = Number(hour) * 60 + Number(minute);
  return hours.some(
    (spec) => spec.days.includes(weekday) && current >= toMinutes(spec.opens) && current < toMinutes(spec.closes),
  );
}
