// Analytics recebe só eventos genéricos. Nunca nome, telefone, serviço procurado, condição ou diagnóstico
// (LGPD — dado de saúde). A allowlist abaixo é a única forma de um parâmetro chegar ao dataLayer.

export type AnalyticsEventName =
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'whatsapp_click'
  | 'phone_click'
  | 'schedule_click'
  | 'directions_click'
  | 'reviews_click'
  | 'service_cta_click'
  | 'video_play'
  | 'doctor_view';

export interface TrackParams {
  location?: string;
  page_type?: string;
  form_id?: string;
}

const ALLOWED_PARAMS: ReadonlyArray<keyof TrackParams> = ['location', 'page_type', 'form_id'];

type DataLayerWindow = Window & { dataLayer?: unknown[] };

export function track(name: AnalyticsEventName, params: TrackParams = {}): void {
  if (typeof window === 'undefined') return;
  const payload: Record<string, string> = { event: name };
  for (const key of ALLOWED_PARAMS) {
    const value = params[key];
    if (typeof value === 'string' && value !== '') payload[key] = value;
  }
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(payload);
}
