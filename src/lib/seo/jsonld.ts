// Dados estruturados para clareza semântica (entidades conectadas por @id estáveis).
// Nunca: Review/AggregateRating autoatribuídos, preço, RQE, coordenadas aproximadas ou qualquer dado não validado.
import type { Doctor, FaqItem, MedicalReview, PostSummary, SiteSettings, VideoItem } from '@/content/types';

export type JsonLdNode = Record<string, unknown>;

export function schemaIds(siteUrl: string): {
  organization: string;
  website: string;
  person: (slug: string) => string;
  page: (path: string) => string;
} {
  return {
    organization: `${siteUrl}/#organization`,
    website: `${siteUrl}/#website`,
    person: (slug) => `${siteUrl}/corpo-clinico/${slug}/#person`,
    page: (path) => `${siteUrl}${path}#webpage`,
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

/** Página de conteúdo médico. Revisor e data de revisão só entram quando a revisão médica existe de fato. */
export function buildMedicalWebPageNode(input: {
  path: string;
  name: string;
  description: string;
  about: JsonLdNode;
  review: MedicalReview;
  reviewer: Doctor | null;
  s: SiteSettings;
}): JsonLdNode {
  const { path, name, description, about, review, reviewer, s } = input;
  const ids = schemaIds(s.siteUrl);
  const reviewed = (review.status === 'APPROVED' || review.status === 'PUBLISHED') && reviewer && review.reviewedAt;
  return {
    '@type': 'MedicalWebPage',
    '@id': ids.page(path),
    url: `${s.siteUrl}${path}`,
    name,
    description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': ids.website },
    publisher: { '@id': ids.organization },
    about,
    dateModified: review.updatedAt,
    ...(reviewed ? { lastReviewed: review.reviewedAt, reviewedBy: { '@id': ids.person(reviewer.slug) } } : {}),
  };
}

export function buildFaqNode(path: string, faq: FaqItem[], s: SiteSettings): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${s.siteUrl}${path}#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer.join(' ') },
    })),
  };
}

export function isoDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `PT${m ? `${m}M` : ''}${sec ? `${sec}S` : m ? '' : '0S'}`;
}

export function buildVideoNode(v: VideoItem, s: SiteSettings): JsonLdNode {
  return {
    '@type': 'VideoObject',
    '@id': `${s.siteUrl}${v.src}#video`,
    name: v.title,
    description: v.description,
    thumbnailUrl: `${s.siteUrl}${v.poster.src}`,
    uploadDate: v.uploadDate,
    duration: isoDuration(v.durationSeconds),
    contentUrl: `${s.siteUrl}${v.src}`,
    inLanguage: 'pt-BR',
    transcript: v.transcript.join(' '),
    publisher: { '@id': schemaIds(s.siteUrl).organization },
  };
}

/** Posts migrados: autoria institucional (CEMO), datas originais preservadas. */
export function buildBlogPostingNode(p: PostSummary, s: SiteSettings): JsonLdNode {
  const ids = schemaIds(s.siteUrl);
  const path = `/${p.slug}/`;
  return {
    '@type': 'BlogPosting',
    '@id': `${s.siteUrl}${path}#article`,
    mainEntityOfPage: `${s.siteUrl}${path}`,
    headline: p.title,
    description: p.description,
    datePublished: p.publishedAt,
    dateModified: p.modifiedAt,
    inLanguage: 'pt-BR',
    author: { '@id': ids.organization },
    publisher: { '@id': ids.organization },
    ...(p.image ? { image: `${s.siteUrl}${p.image.src}` } : {}),
  };
}

export function buildProfilePageNode(d: Doctor, s: SiteSettings): JsonLdNode {
  return {
    '@type': 'ProfilePage',
    '@id': schemaIds(s.siteUrl).page(d.canonicalPath),
    url: `${s.siteUrl}${d.canonicalPath}`,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': schemaIds(s.siteUrl).website },
    mainEntity: { '@id': schemaIds(s.siteUrl).person(d.slug) },
  };
}

export function buildGraph(nodes: JsonLdNode[]): { '@context': 'https://schema.org'; '@graph': JsonLdNode[] } {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
