import { render } from '@testing-library/react';
import { doctors } from '@/content/fixtures/doctors';
import { siteSettings } from '@/content/fixtures/site-settings';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbNode,
  buildClinicNode,
  buildGraph,
  buildMedicalWebPageNode,
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

  it('pessoa do Dr. David vinculada à clínica, sem RQE; url só quando o perfil está publicado', () => {
    const person = buildPersonNode(david, siteSettings);
    expect(person['@type']).toBe('Person');
    expect((person.worksFor as Record<string, unknown>)['@id']).toBe(schemaIds(SITE).organization);
    expect(person.jobTitle).toBe('Diretor Técnico');
    expect(person.url).toBe(`${SITE}${david.canonicalPath}`);
    expect(buildPersonNode({ ...david, published: false }, siteSettings).url).toBeUndefined();
  });

  it('o grafo nunca traz avaliação, preço ou geo aproximado; RQE só quando informado', () => {
    const graph = buildGraph([
      buildClinicNode(siteSettings),
      buildWebSiteNode(siteSettings),
      buildPersonNode({ ...david, rqe: null }, siteSettings),
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

describe('página médica e revisão', () => {
  const base = { path: '/x/', name: 'X', description: 'd', about: { '@type': 'MedicalEntity', name: 'X' }, s: siteSettings };
  const approved = { status: 'APPROVED' as const, author: 'Equipe editorial CEMO', medicalReviewerSlug: david.slug, reviewedAt: '2026-11-01', updatedAt: '2026-11-01', sources: [] };

  it('reviewedBy/lastReviewed só com revisão aprovada e revisor informado', () => {
    expect(buildMedicalWebPageNode({ ...base, review: approved, reviewer: david }).reviewedBy).toEqual({ '@id': schemaIds(SITE).person(david.slug) });
    expect(buildMedicalWebPageNode({ ...base, review: { ...approved, status: 'MEDICAL_REVIEW' }, reviewer: david }).reviewedBy).toBeUndefined();
    expect(buildMedicalWebPageNode({ ...base, review: approved, reviewer: null }).lastReviewed).toBeUndefined();
  });
});

describe('RQE informado pela CEMO', () => {
  it('entra como identificador da pessoa só quando existe', () => {
    const jose = doctors.find((d) => d.slug === 'jose-pereira-do-rego-neto')!;
    expect(buildPersonNode(jose, siteSettings).identifier).toEqual([
      { '@type': 'PropertyValue', propertyID: 'CRM', value: jose.crm },
      { '@type': 'PropertyValue', propertyID: 'RQE', value: '135836' },
    ]);
    expect(buildPersonNode({ ...david, rqe: null }, siteSettings).identifier).toEqual([{ '@type': 'PropertyValue', propertyID: 'CRM', value: david.crm }]);
  });
});
