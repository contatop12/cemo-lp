import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CONSENT_STORAGE_KEY } from '@/lib/analytics/consent';
import CookiesPage, { metadata as cookiesMeta } from './cookies/page';
import PrivacidadePage, { metadata as privacidadeMeta } from './privacidade/page';

describe('/privacidade/', () => {
  it('indexável, um h1 e aviso de versão preliminar', async () => {
    expect(privacidadeMeta.robots).toBeUndefined();
    render(await PrivacidadePage());
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('note')).toHaveTextContent(/Versão preliminar, em revisão jurídica/);
  });

  it('descreve só o que o site coleta, sem inventar dados', async () => {
    const { container } = render(await PrivacidadePage());
    const text = container.textContent ?? '';
    for (const term of ['nome', 'WhatsApp', 'O que você está buscando', 'parâmetros de campanha', 'retornar o contato', 'sac@oftalmologiacemo.com.br']) {
      expect(text).toContain(term);
    }
    expect(text).not.toMatch(/CNPJ|\d{2}\.\d{3}\.\d{3}\/\d{4}/);
    const source = readFileSync(join(process.cwd(), 'src/app/privacidade/page.tsx'), 'utf8');
    expect(source).toContain('TODO_CONTENT_VALIDATION');
  });
});

describe('/cookies/', () => {
  it('indexável, categorias e como alterar a escolha', async () => {
    expect(cookiesMeta.robots).toBeUndefined();
    render(await CookiesPage());
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/necessários/i)).toBeInTheDocument();
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('o botão de preferências limpa a escolha salva', async () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    render(await CookiesPage());
    await userEvent.click(screen.getByRole('button', { name: 'Alterar minhas preferências de cookies' }));
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    expect(document.documentElement.dataset.consent).toBe('pending');
  });
});
