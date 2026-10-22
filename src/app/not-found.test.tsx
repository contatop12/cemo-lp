import { render, screen } from '@testing-library/react';
import { siteSettings } from '@/content/fixtures/site-settings';
import { whatsappHref } from '@/lib/contact';
import NotFound, { metadata } from './not-found';

describe('404', () => {
  it('não é indexável', () => {
    expect(metadata.robots).toEqual({ index: false, follow: true });
  });

  it('título humano, links úteis e WhatsApp', async () => {
    render(await NotFound());
    expect(screen.getByRole('heading', { level: 1, name: 'Não encontramos esta página' })).toBeInTheDocument();
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    for (const href of ['/', '/especialidades/', '/exames/', '/corpo-clinico/', '/contato/']) expect(hrefs).toContain(href);
    expect(hrefs).toContain(whatsappHref(siteSettings));
  });
});
