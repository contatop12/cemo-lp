// @vitest-environment node
import type { OpeningHoursSpec } from '@/content/types';
import { isOpenNow } from './hours';

const HOURS: OpeningHoursSpec[] = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '18:00' },
  { days: ['Friday'], opens: '08:00', closes: '17:00' },
  { days: ['Saturday'], opens: '08:00', closes: '12:00' },
];

// Datas em horário de Brasília (UTC-3). 2026-10-19 é segunda-feira.
const at = (iso: string) => new Date(`${iso}-03:00`);

describe('isOpenNow (America/Sao_Paulo)', () => {
  it.each([
    ['segunda 09:00', '2026-10-19T09:00:00', true],
    ['segunda 07:59', '2026-10-19T07:59:00', false],
    ['sexta 16:59', '2026-10-23T16:59:00', true],
    ['sexta 17:00 (fechamento exclusivo)', '2026-10-23T17:00:00', false],
    ['sábado 11:59', '2026-10-24T11:59:00', true],
    ['sábado 12:00', '2026-10-24T12:00:00', false],
    ['domingo 10:00', '2026-10-25T10:00:00', false],
  ])('%s → %s', (_label, iso, expected) => {
    expect(isOpenNow(HOURS, at(iso))).toBe(expected);
  });

  it('independe do fuso da máquina (meia-noite UTC de sábado ainda é sexta 21h em SP)', () => {
    expect(isOpenNow(HOURS, new Date('2026-10-24T00:30:00Z'))).toBe(false);
  });
});
