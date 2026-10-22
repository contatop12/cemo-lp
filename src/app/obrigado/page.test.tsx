import { render, screen } from '@testing-library/react';
import { siteSettings } from '@/content/fixtures/site-settings';
import { whatsappHref } from '@/lib/contact';
import ObrigadoPage, { metadata } from './page';

describe('/obrigado/', () => {
  it('não é indexável', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it('confirma o pedido e oferece o WhatsApp com mensagem genérica', async () => {
    render(await ObrigadoPage());
    expect(screen.getByRole('heading', { level: 1, name: 'Recebemos o seu pedido' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continuar atendimento pelo WhatsApp' })).toHaveAttribute(
      'href',
      whatsappHref(siteSettings),
    );
  });

  it('não recebe parâmetros de busca (nada do lead é exibido)', () => {
    expect(ObrigadoPage.length).toBe(0);
  });
});
