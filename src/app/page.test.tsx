import { render } from '@testing-library/react';
import HomePage, { metadata } from './page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/' }));

describe('Home', () => {
  it('metadata com título único', () => {
    expect(metadata.title).toEqual({ absolute: 'Clínica de Oftalmologia em Taboão da Serra | CEMO' });
  });

  it('estrutura, ordem das seções, headings e dados estruturados', async () => {
    const { container } = render(<main>{await HomePage()}</main>);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.textContent).not.toContain('médicos no corpo clínico'); // ajustes 23/10, item 7
    expect(container.querySelector('#inicio')?.textContent).toContain('CRM/SP 98339, RQE 28385');
    expect([...container.querySelectorAll('section[id]')].map((s) => s.id)).toEqual([
      'inicio',
      'agendar',
      'especialidades',
      'catarata',
      'refrativa',
      'diretor-tecnico',
      'estrutura',
      'video',
      'corpo-clinico',
      'avaliacoes',
      'convenios',
      'localizacao',
      'conteudos',
      'agende',
    ]);

    // sem saltos de nível (h1 → h2 → h3)
    const levels = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]));
    levels.forEach((level, i) => {
      if (i > 0) expect(level - levels[i - 1]!).toBeLessThanOrEqual(1);
    });

    for (const img of container.querySelectorAll('img')) expect(img.hasAttribute('alt')).toBe(true);

    const ld = container.querySelector('script[type="application/ld+json"]');
    const graph = JSON.parse(ld?.textContent ?? '{}')['@graph'] as Array<{ '@type': string | string[] }>;
    const types = graph.flatMap((n) => n['@type']);
    expect(types).toEqual(expect.arrayContaining(['MedicalClinic', 'WebSite', 'Person']));
    expect(ld?.textContent).not.toMatch(/Review|AggregateRating|rqe/);

    expect(container.textContent).not.toContain('TODO_CONTENT_VALIDATION');
    expect(container.textContent?.toLowerCase()).not.toContain('lorem');
  });
});
