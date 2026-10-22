// Dados estruturados para clareza semântica (entidades conectadas por @id estáveis).
// Nunca: Review/AggregateRating autoatribuídos, preço, RQE, coordenadas aproximadas ou qualquer dado não validado.
import type { Doctor, SiteSettings } from '@/content/types';

export type JsonLdNode = Record<string, unknown>;

export function schemaIds(siteUrl: string): {
  organization: string;
  website: string;
  person: (slug: string) => string;
} {
  return {
    organization: `${siteUrl}/#organization`,
    website: `${siteUrl}/#website`,
    person: (slug) => `${siteUrl}/corpo-clinico/${slug}/#person`,
  };
}

export function buildClinicNode(s: SiteSettings): JsonLdNode {
  const ids = schemaIds(s.siteUrl);
  return {
    '@type': ['Organization', 'MedicalClinic'],
    '@id': ids.organization,
    name: s.name,
    alternateName: s.shortName,
    url: `${s.siteUrl}/`,
    logo: `${s.siteUrl}/brand/logo-cemo.png`,
    telephone: s.phone.e164,
    email: s.email,
    // Sem medicalSpecialty: o vocabulário do schema.org não tem oftalmologia, e "Optometric" seria outra profissão.
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address.streetAddress,
      addressLocality: s.address.city,
      addressRegion: s.address.region,
      postalCode: s.address.postalCode,
      addressCountry: s.address.country,
    },
    openingHoursSpecification: s.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [s.social.instagram, s.social.facebook],
  };
}

export function buildWebSiteNode(s: SiteSettings): JsonLdNode {
  const ids = schemaIds(s.siteUrl);
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${s.siteUrl}/`,
    name: s.shortName,
    inLanguage: 'pt-BR',
    publisher: { '@id': ids.organization },
  };
}

export function buildPersonNode(d: Doctor, s: SiteSettings): JsonLdNode {
  const ids = schemaIds(s.siteUrl);
  return {
    '@type': 'Person',
    '@id': ids.person(d.slug),
    name: `${d.honorific} ${d.name}`,
    ...(d.role ? { jobTitle: d.role } : {}),
    worksFor: { '@id': ids.organization },
    identifier: { '@type': 'PropertyValue', propertyID: 'CRM', value: d.crm },
    ...(d.published ? { url: `${s.siteUrl}${d.canonicalPath}` } : {}),
    ...(d.photo ? { image: `${s.siteUrl}${d.photo.src}` } : {}),
  };
}

export function buildBreadcrumbNode(items: Array<{ name: string; path: string }>, s: SiteSettings): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${s.siteUrl}${item.path}`,
    })),
  };
}

export function buildGraph(nodes: JsonLdNode[]): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] } {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
