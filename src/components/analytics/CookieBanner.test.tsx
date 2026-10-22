import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CONSENT_STORAGE_KEY } from '@/lib/analytics/consent';
import { CookieBanner } from './CookieBanner';

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.consent;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CookieBanner', () => {
  it('sem escolha mostra a região com Aceitar e Recusar', async () => {
    render(<CookieBanner />);
    const region = await screen.findByRole('region', { name: 'Aviso de cookies' });
    expect(region).toBeVisible();
    expect(screen.getByRole('button', { name: 'Aceitar' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Recusar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /política de cookies/i })).toHaveAttribute('href', '/cookies/');
    expect(document.documentElement.dataset.consent).toBe('pending');
  });

  it('Aceitar e Recusar têm o mesmo peso visual', async () => {
    render(<CookieBanner />);
    const accept = await screen.findByRole('button', { name: 'Aceitar' });
    const reject = screen.getByRole('button', { name: 'Recusar' });
    expect(accept.className).toBe(reject.className);
  });

  it('Recusar fecha o banner e registra a escolha', async () => {
    render(<CookieBanner />);
    await userEvent.click(await screen.findByRole('button', { name: 'Recusar' }));
    expect(screen.queryByRole('region', { name: 'Aviso de cookies' })).toBeNull();
    expect(document.documentElement.dataset.consent).toBe('denied');
    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('denied');
  });

  it('com escolha salva não aparece', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    render(<CookieBanner />);
    expect(screen.queryByRole('region', { name: 'Aviso de cookies' })).toBeNull();
  });

  it('RF-2: storage bloqueado → mostra o banner sem quebrar', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });
    render(<CookieBanner />);
    expect(await screen.findByRole('region', { name: 'Aviso de cookies' })).toBeInTheDocument();
  });
});
