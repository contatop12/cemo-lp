import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrackedLink } from './TrackedLink';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
});

describe('TrackedLink', () => {
  it('empurra o evento no clique e mantém o href', async () => {
    render(
      <TrackedLink event="whatsapp_click" location="hero" href="https://wa.me/5500000000000">
        Falar no WhatsApp
      </TrackedLink>,
    );
    const link = screen.getByRole('link', { name: 'Falar no WhatsApp' });
    link.addEventListener('click', (e) => e.preventDefault()); // jsdom não navega
    await userEvent.click(link);
    expect(link).toHaveAttribute('href', 'https://wa.me/5500000000000');
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'whatsapp_click', location: 'hero' }]);
  });

  it('rotas internas usam next/link com o mesmo href', () => {
    render(
      <TrackedLink event="service_cta_click" location="services" href="/especialidades/catarata/">
        Catarata
      </TrackedLink>,
    );
    expect(screen.getByRole('link', { name: 'Catarata' })).toHaveAttribute('href', '/especialidades/catarata/');
  });
});
