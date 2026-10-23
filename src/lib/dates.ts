// Datas exibidas e comparadas no fuso da clínica (as datas do WordPress vêm em UTC, com "Z").
const TZ = 'America/Sao_Paulo';

export function formatDatePt(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ });
}

/** AAAA-MM-DD no fuso da clínica. */
export function localDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: TZ });
}
