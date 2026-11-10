import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { LeadInterest } from '@/content/types';
import { LeadForm } from './LeadForm';

// /obrigado/ com carregamento completo de página: o gatilho de conversão do Google Ads no GTM é de page view.
const push = vi.fn();
vi.mock('@/lib/navigation', () => ({ hardNavigate: (path: string) => push(path) }));

type DataLayerWindow = Window & { dataLayer?: unknown[] };

const interests: LeadInterest[] = [
  { id: 'consulta', label: 'Consulta oftalmológica' },
  { id: 'catarata', label: 'Catarata' },
  { id: 'outro', label: 'Outro assunto' },
];

const WHATSAPP = 'https://wa.me/5500000000000?text=Ol%C3%A1';

function renderForm(defaultInterest?: 'catarata') {
  return render(
    <LeadForm
      interests={interests}
      defaultInterest={defaultInterest}
      formId="home-conversao"
      location="home-conversao"
      whatsappFallbackHref={WHATSAPP}
    />,
  );
}

function mockFetch(response: Response | Error) {
  const fn = vi.fn(async () => {
    if (response instanceof Error) throw response;
    return response.clone();
  });
  vi.stubGlobal('fetch', fn);
  return fn;
}

const ok = () => new Response(JSON.stringify({ ok: true }), { status: 200 });

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Nome/), 'Maria da Silva');
  await user.type(screen.getByLabelText(/^WhatsApp/), '11947016162');
  await user.selectOptions(screen.getByLabelText(/O que você está buscando\?/), 'catarata');
}

beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
  push.mockReset();
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('LeadForm', () => {
  it('tem os três campos com rótulo visível e as opções das props', () => {
    renderForm();
    expect(screen.getByLabelText(/^Nome/)).toHaveAttribute('autocomplete', 'name');
    expect(screen.getByLabelText(/^WhatsApp/)).toHaveAttribute('autocomplete', 'tel');
    const select = screen.getByLabelText(/O que você está buscando\?/);
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(
      expect.arrayContaining(['Consulta oftalmológica', 'Catarata', 'Outro assunto']),
    );
    expect(select).toBeInTheDocument();
  });

  it('pré-seleciona o interesse contextual', () => {
    renderForm('catarata');
    expect(screen.getByLabelText(/O que você está buscando\?/)).toHaveValue('catarata');
  });

  it('envio vazio mostra resumo de erros com foco e marca os campos', async () => {
    const fetchFn = mockFetch(ok());
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    const summary = await screen.findByRole('alert');
    expect(summary).toHaveFocus();
    const name = screen.getByLabelText(/^Nome/);
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name.getAttribute('aria-describedby')).toBeTruthy();
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('WhatsApp inválido mostra a mensagem com exemplo', async () => {
    mockFetch(ok());
    const user = userEvent.setup();
    renderForm('catarata');
    await user.type(screen.getByLabelText(/^Nome/), 'Maria');
    await user.type(screen.getByLabelText(/^WhatsApp/), '1234');
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    expect((await screen.findAllByText('Informe um telefone com DDD, por exemplo (11) 91234-5678')).length).toBeGreaterThan(0);
  });

  it('primeiro foco dispara lead_form_start uma única vez', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByLabelText(/^Nome/));
    await user.click(screen.getByLabelText(/^WhatsApp/));
    const starts = ((window as DataLayerWindow).dataLayer ?? []).filter(
      (e) => (e as { event?: string }).event === 'lead_form_start',
    );
    expect(starts).toEqual([{ event: 'lead_form_start', form_id: 'home-conversao', location: 'home-conversao' }]);
  });

  it('envio válido → POST com atribuição, evento sem dados pessoais e /obrigado/', async () => {
    const fetchFn = mockFetch(ok());
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/obrigado/'));
    const [url, init] = fetchFn.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toMatch(/^\/api\/lead\/?$/);
    expect(init.method).toBe('POST');
    const sent = JSON.parse(String(init.body));
    expect(sent).toMatchObject({ name: 'Maria da Silva', interest: 'catarata', website: '' });
    expect(sent.attribution.conversionPage).toBe('/');
    const dataLayer = JSON.stringify((window as DataLayerWindow).dataLayer);
    expect(dataLayer).toContain('lead_form_submit');
    expect(dataLayer).not.toMatch(/Maria|947016162|catarata/);
  });

  it('RF-4: duplo clique gera um único envio e mostra "Enviando…"', async () => {
    let resolve: (r: Response) => void = () => {};
    const fetchFn = vi.fn(() => new Promise<Response>((r) => (resolve = r)));
    vi.stubGlobal('fetch', fetchFn);
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    const button = screen.getByRole('button', { name: 'Solicitar contato' });
    await user.dblClick(button);
    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(button).toHaveTextContent('Enviando…');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    await act(async () => resolve(ok()));
  });

  it.each([
    ['503', () => new Response(JSON.stringify({ ok: false, error: 'provider_unavailable' }), { status: 503 })],
    ['rede', () => new TypeError('Failed to fetch')],
  ])('falha (%s) → alternativa pelo WhatsApp e nenhum lead_form_submit', async (_label, make) => {
    mockFetch(make());
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    const link = await screen.findByRole('link', { name: 'Falar no WhatsApp' });
    expect(link).toHaveAttribute('href', WHATSAPP);
    expect(JSON.stringify((window as DataLayerWindow).dataLayer)).not.toContain('lead_form_submit');
    expect(push).not.toHaveBeenCalled();
  });

  it('429 → mensagem de muitas tentativas', async () => {
    mockFetch(new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 }));
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    expect(await screen.findByText('Muitas tentativas. Tente novamente em alguns minutos.')).toBeInTheDocument();
  });

  it('400 com erros do servidor → exibe por campo', async () => {
    mockFetch(
      new Response(JSON.stringify({ ok: false, error: 'invalid', errors: { whatsapp: 'Telefone recusado pelo servidor' } }), {
        status: 400,
      }),
    );
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    expect((await screen.findAllByText('Telefone recusado pelo servidor')).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/^WhatsApp/)).toHaveAttribute('aria-invalid', 'true');
  });

  it('honeypot fica fora do fluxo de leitura e do teclado', () => {
    const { container } = renderForm();
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toHaveAttribute('tabindex', '-1');
    expect(honeypot).toHaveAttribute('autocomplete', 'off');
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('RF-2: localStorage bloqueado não impede o envio', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    mockFetch(ok());
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/obrigado/'));
  });

  it('mostra o aviso de privacidade com link', () => {
    renderForm();
    expect(screen.getByRole('link', { name: /privacidade/i })).toHaveAttribute('href', '/privacidade/');
  });
});

describe('fix: 429 também oferece o WhatsApp', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('mostra a alternativa pelo WhatsApp junto do aviso', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 })));
    const user = userEvent.setup();
    renderForm();
    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Solicitar contato' }));
    expect(await screen.findByText('Muitas tentativas. Tente novamente em alguns minutos.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toHaveAttribute('href', WHATSAPP);
  });
});
