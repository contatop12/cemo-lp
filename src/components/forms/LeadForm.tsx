'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { Button } from '@/components/ui/Button';
import { WhatsappIcon } from '@/components/ui/icons';
import type { LeadInterest, LeadInterestId } from '@/content/types';
import { track } from '@/lib/analytics/events';
import { getLeadAttribution, safeStorage } from '@/lib/attribution';
import { cn } from '@/lib/cn';
import { normalizeWhatsapp, validateLeadInput } from '@/lib/leads/schema';
import type { LeadFieldErrors } from '@/lib/leads/types';

export interface LeadFormProps {
  interests: LeadInterest[];
  defaultInterest?: LeadInterestId;
  formId: string;
  location: string;
  whatsappFallbackHref: string;
}

type Field = keyof LeadFieldErrors;
type Status = 'idle' | 'submitting' | 'failed';

const RATE_LIMIT_MESSAGE = 'Muitas tentativas. Tente novamente em alguns minutos.';

// Formata ao sair do campo (nunca bloqueia digitação ou colagem): 5511912345678 → (11) 91234-5678.
function formatWhatsapp(value: string): string {
  const normalized = normalizeWhatsapp(value);
  if (!normalized) return value;
  const n = normalized.slice(2);
  return n.length === 11 ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}` : `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false" className="mt-0.5 shrink-0">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
    </svg>
  );
}

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex gap-2 text-small font-bold text-erro">
      <ErrorIcon />
      <span>{message}</span>
    </p>
  );
}

const fieldBase =
  'mt-2 block h-14 w-full rounded-sm border-[1.5px] bg-papel px-4 text-body text-tinta ' +
  'focus:border-2 focus:border-azul-cemo focus:outline-none focus-visible:outline-none';

export function LeadForm({ interests, defaultInterest, formId, location, whatsappFallbackHref }: LeadFormProps) {
  const router = useRouter();
  const uid = useId();
  const [values, setValues] = useState({ name: '', whatsapp: '', interest: defaultInterest ?? '' });
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState<string | null>(null);
  const [summaryFocus, setSummaryFocus] = useState(0);
  const started = useRef(false);
  const inFlight = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (summaryFocus > 0) summary.current?.focus();
  }, [summaryFocus]);

  const id = (field: Field | 'summary' | 'website') => `${uid}-${field}`;
  const errorId = (field: Field) => `${uid}-${field}-erro`;
  const hasErrors = Object.keys(errors).length > 0;

  function onFirstFocus() {
    if (started.current) return;
    started.current = true;
    track('lead_form_start', { form_id: formId, location });
  }

  function showErrors(next: LeadFieldErrors) {
    setErrors(next);
    setSummaryFocus((n) => n + 1);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const payload = {
      ...values,
      website: honeypot.current?.value ?? '',
      attribution: getLeadAttribution({
        href: window.location.href,
        referrer: document.referrer,
        now: new Date(),
        storage: safeStorage(),
      }),
    };

    const check = validateLeadInput(payload);
    if (!check.ok) {
      setNotice(null);
      showErrors(check.errors);
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    setErrors({});
    setNotice(null);
    let succeeded = false;
    try {
      const res = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        succeeded = true;
        track('lead_form_submit', { form_id: formId, location });
        router.push('/obrigado/');
        return;
      }
      if (res.status === 400) {
        const body = (await res.json().catch(() => null)) as { errors?: LeadFieldErrors } | null;
        if (body?.errors && Object.keys(body.errors).length > 0) {
          setStatus('idle');
          showErrors(body.errors);
          return;
        }
      }
      if (res.status === 429) {
        setStatus('idle');
        setNotice(RATE_LIMIT_MESSAGE);
        return;
      }
      setStatus('failed');
    } catch {
      setStatus('failed');
    } finally {
      if (!succeeded) inFlight.current = false;
    }
  }

  const fieldClass = (field: Field) => cn(fieldBase, errors[field] ? 'border-erro' : 'border-borda-campo');

  const submitting = status === 'submitting';

  return (
    <form noValidate onSubmit={onSubmit} onFocusCapture={onFirstFocus} className="flex flex-col gap-6" aria-describedby={id('summary')}>
      {hasErrors ? (
        <div
          ref={summary}
          id={id('summary')}
          role="alert"
          tabIndex={-1}
          className="rounded-md border-2 border-erro bg-papel p-4 text-tinta"
        >
          <p className="flex gap-2 font-bold text-erro">
            <ErrorIcon />
            Confira os campos destacados:
          </p>
          <ul className="mt-2 list-disc pl-8">
            {(Object.keys(errors) as Field[]).map((field) => (
              <li key={field}>
                <a href={`#${id(field)}`} className="text-azul-700 underline underline-offset-[3px]">
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <label htmlFor={id('name')} className="block font-medium">
          Nome <span className="font-normal text-tinta-suave">(obrigatório)</span>
        </label>
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? errorId('name') : undefined}
          className={fieldClass('name')}
        />
        <FieldError id={errorId('name')} message={errors.name} />
      </div>

      <div>
        <label htmlFor={id('whatsapp')} className="block font-medium">
          WhatsApp <span className="font-normal text-tinta-suave">(obrigatório)</span>
        </label>
        <input
          id={id('whatsapp')}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.whatsapp}
          onChange={(e) => setValues((v) => ({ ...v, whatsapp: e.target.value }))}
          onBlur={(e) => setValues((v) => ({ ...v, whatsapp: formatWhatsapp(e.target.value) }))}
          aria-invalid={errors.whatsapp ? 'true' : undefined}
          aria-describedby={errors.whatsapp ? errorId('whatsapp') : `${uid}-whatsapp-ajuda`}
          className={fieldClass('whatsapp')}
        />
        {errors.whatsapp ? (
          <FieldError id={errorId('whatsapp')} message={errors.whatsapp} />
        ) : (
          <p id={`${uid}-whatsapp-ajuda`} className="mt-2 text-small text-tinta-suave">
            Com DDD. Vamos responder por WhatsApp.
          </p>
        )}
      </div>

      <div>
        <label htmlFor={id('interest')} className="block font-medium">
          O que você está buscando? <span className="font-normal text-tinta-suave">(obrigatório)</span>
        </label>
        <select
          id={id('interest')}
          name="interest"
          value={values.interest}
          onChange={(e) => setValues((v) => ({ ...v, interest: e.target.value }))}
          aria-invalid={errors.interest ? 'true' : undefined}
          aria-describedby={errors.interest ? errorId('interest') : undefined}
          className={fieldClass('interest')}
        >
          <option value="">Selecione uma opção</option>
          {interests.map((interest) => (
            <option key={interest.id} value={interest.id}>
              {interest.label}
            </option>
          ))}
        </select>
        <FieldError id={errorId('interest')} message={errors.interest} />
      </div>

      {/* Armadilha para robôs: fora do fluxo de leitura e do teclado. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id('website')}>Não preencha este campo</label>
        <input ref={honeypot} id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {notice ? (
        <div role="status" className="rounded-md bg-nevoa-2 p-4">
          <p className="font-bold text-tinta">{notice}</p>
          <p className="mt-2">Se preferir, fale agora com a nossa equipe:</p>
          <TrackedLink
            event="whatsapp_click"
            location={location}
            href={whatsappFallbackHref}
            className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
          >
            <WhatsappIcon />
            Falar no WhatsApp
          </TrackedLink>
        </div>
      ) : null}

      {status === 'failed' ? (
        <div role="alert" className="rounded-md border-2 border-erro bg-papel p-4">
          <p className="flex gap-2 font-bold text-erro">
            <ErrorIcon />
            Não conseguimos registrar o seu pedido agora.
          </p>
          <p className="mt-2">Fale com a nossa equipe pelo WhatsApp — é rápido:</p>
          <TrackedLink
            event="whatsapp_click"
            location={location}
            href={whatsappFallbackHref}
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-ui font-bold text-papel no-underline hover:bg-[#095A31]"
          >
            <WhatsappIcon />
            Falar no WhatsApp
          </TrackedLink>
        </div>
      ) : null}

      <div>
        <Button type="submit" aria-disabled={submitting ? 'true' : undefined} className="w-full sm:w-auto">
          {submitting ? 'Enviando…' : 'Solicitar contato'}
        </Button>
        <p className="mt-3 text-small text-tinta-suave">
          Usamos seus dados só para retornar o contato. Veja a{' '}
          <Link href="/privacidade/" className="text-azul-700 underline underline-offset-[3px]">
            política de privacidade
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
