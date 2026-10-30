// CRM e, quando informado pela CEMO, RQE — na publicidade médica os dois aparecem juntos (nunca inventado).
export function formatRegistry(doctor: { crm: string; rqe: string | null }): string {
  return doctor.rqe ? `${doctor.crm}, RQE ${doctor.rqe}` : doctor.crm;
}
