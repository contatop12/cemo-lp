import { render, screen, within } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('lista ordenada com o item atual marcado', () => {
    render(
      <Breadcrumbs
        items={[
          { name: 'Início', path: '/' },
          { name: 'Especialidades', path: '/especialidades/' },
          { name: 'Catarata', path: '/especialidades/catarata/' },
        ]}
      />,
    );
    const nav = screen.getByRole('navigation', { name: 'Você está aqui' });
    const items = within(nav).getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(within(items[2]!).getByText('Catarata')).toHaveAttribute('aria-current', 'page');
    expect(within(items[0]!).getByRole('link', { name: 'Início' })).toHaveAttribute('href', '/');
  });

  it('emite BreadcrumbList com posições e URLs absolutas', () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { name: 'Início', path: '/' },
          { name: 'Contato', path: '/contato/' },
        ]}
      />,
    );
    const ld = JSON.parse(container.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}');
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement.map((i: { position: number }) => i.position)).toEqual([1, 2]);
    expect(ld.itemListElement[1].item).toBe('https://oftalmologiacemo.com.br/contato/');
  });
});
