import { render } from '@testing-library/react';
import { doctors } from '@/content/fixtures/doctors';
import { siteSettings } from '@/content/fixtures/site-settings';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildClinicNode,
  buildGraph,
  buildPersonNode,
  buildWebSiteNode,
  schemaIds,
} from './jsonld';

const SITE = siteSettings.siteUrl;
const david = doctors.find((d) => d.slug === 'david-ribeiro-de-mendonca-filho')!;

describe('JSON-LD', () => {
  it('ids estáveis', () => {
    const ids = schemaIds(SITE);
    expect(ids).toMatchObject({ organization: `${SITE}/#organization`, website: `${SITE}/#website` });
    expect(ids.person('x')).toBe(`${SITE}/corpo-clinico/x/#person`);
    expect(schemaIds(SITE).organization).toBe(ids.organization);
  });

  it('clínica com NAP e horários schema.org', () => {
    const clinic = buildClinicNode(siteSettings);
    expect(clinic['@id']).toBe(`${SITE}/#organization`);
    expect(clinic['@type']).toEqual(['Organization', 'MedicalClinic']);
    expect(clinic.telephone).toBe('+551147883536');
    expect((clinic.address as Record<string, unknown>).postalCode).toBe('06763-170');
    const hours = clinic.openingHoursSpecification as Array<Record<string, unknown>>;
    expect(hours).toHaveLength(3);
    expect(hours[0]?.dayOfWeek).toEqual([
      'https://schema.org/Monday',
      'https://schema.org/Tuesday',
      'https://schema.org/Wednesday',
      'https://schema.org/Thursday',
    ]);
    expect(hours[0]).toMatchObject({ opens: '08:00', closes: '18:00' });
  });

  it('pessoa do Dr. David vinculada à clínica, sem RQE e sem url enquanto o perfil não existe', () => {
    const person = buildPersonNode(david, siteSettings);
    expect(person['@type']).toBe('Person');
    expect((person.worksFor as Record<string, unknown>)['@id']).toBe(schemaIds(SITE).organization);
    expect(person.jobTitle).toBe('Diretor Técnico');
    expect(person.url).toBeUndefined();
  });

  it('o grafo nunca traz avaliação, preço, geo aproximado ou RQE', () => {
    const graph = buildGraph([
      buildClinicNode(siteSettings),
      buildWebSiteNode(siteSettings),
      buildPersonNode(david, siteSettings),
      buildBreadcrumbNode([{ name: 'Início', path: '/' }], siteSettings),
    ]);
    expect(graph['@context']).toBe('https://schema.org');
    const json = JSON.stringify(graph);
    for (const forbidden of ['Review', 'AggregateRating', 'rqe', 'RQE', 'priceRange', 'geo', 'Optometric']) {
      expect(json).not.toContain(forbidden);
    }
  });

  it('breadcrumb com posições e URLs absolutas', () => {
    const node = buildBreadcrumbNode(
      [
        { name: 'Início', path: '/' },
        { name: 'Contato', path: '/contato/' },
      ],
      siteSettings,
    );
    expect(node.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Contato', item: `${SITE}/contato/` },
    ]);
  });

  it('JsonLd escapa "<" para não fechar a tag script', () => {
    const { container } = render(<JsonLd data={{ name: '</script><script>alert(1)</script>' }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.innerHTML).not.toContain('</script>');
    expect(script?.innerHTML).toContain('\\u003c/script>');
  });
});
