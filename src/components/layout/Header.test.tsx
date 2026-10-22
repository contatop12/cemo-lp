import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { siteSettings } from '@/content/fixtures/site-settings';
import { navigation } from '@/content/navigation';
import { whatsappHref } from '@/lib/contact';
import { Header } from './Header';
import { UtilityBar } from './UtilityBar';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

type DataLayerWindow = Window & { dataLayer?: unknown[] };

beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
});

describe('Header', () => {
  it('tem a navegação principal nomeada', () => {
    render(<Header settings={siteSettings} navigation={navigation} />);
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
  });

  it('logo leva à Home', () => {
    render(<Header settings={siteSettings} navigation={navigation} />);
    const logo = screen.getByRole('img', { name: 'CEMO – Centro de Microcirurgia Ocular' });
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('"Agendar consulta" leva ao formulário e registra schedule_click', async () => {
    render(<Header settings={siteSettings} navigation={navigation} />);
    const cta = screen.getByRole('link', { name: 'Agendar consulta' });
    expect(cta).toHaveAttribute('href', '/#agendar');
    cta.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(cta);
    expect((window as DataLayerWindow).dataLayer).toContainEqual({ event: 'schedule_click', location: 'header' });
  });
});

describe('UtilityBar', () => {
  it('telefone e WhatsApp com alvos de toque grandes', () => {
    render(<UtilityBar settings={siteSettings} />);
    const tel = screen.getByRole('link', { name: new RegExp(siteSettings.phone.display.replace(/[()]/g, '\\$&')) });
    expect(tel).toHaveAttribute('href', 'tel:+551147883536');
    expect(tel.className).toContain('min-target');
    const whatsapp = screen.getByRole('link', { name: /WhatsApp/ });
    expect(whatsapp).toHaveAttribute('href', whatsappHref(siteSettings));
    expect(whatsapp.className).toContain('min-target');
  });
});
