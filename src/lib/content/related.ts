import type { RelatedLink } from '@/components/page/RelatedBlocks';
import { content } from '@/content';
import type { ArticleLink, Doctor, Related } from '@/content/types';

export interface ResolvedRelated {
  doctors: Doctor[];
  specialties: RelatedLink[];
  exams: RelatedLink[];
  conditions: RelatedLink[];
  articles: ArticleLink[];
}

// Transforma os ids de `related` em links prontos, só com entidades publicadas (o teste de integridade garante que
// todo id existe; aqui o filtro é a segunda barreira).
export async function resolveRelated(related: Related): Promise<ResolvedRelated> {
  const [doctors, specialties, exams, conditions, conditionLinks, articles] = await Promise.all([
    content.listDoctors(),
    content.listSpecialties(),
    content.listExams(),
    content.listConditions(),
    content.listConditionLinks(),
    content.listArticles(related.articles),
  ]);
  const pick = <T, R>(ids: string[], list: T[], key: (t: T) => string, map: (t: T) => R): R[] =>
    ids.flatMap((id) => {
      const found = list.find((t) => key(t) === id);
      return found ? [map(found)] : [];
    });
  return {
    doctors: pick(related.doctors, doctors, (d) => d.slug, (d) => d),
    specialties: pick(related.specialties, specialties, (s) => s.id, (s) => ({ name: s.name, summary: s.summary, href: s.canonicalPath })),
    exams: pick(related.exams, exams, (e) => e.id, (e) => ({ name: e.name, summary: e.summary, href: e.canonicalPath })),
    conditions: [
      ...pick(related.conditions, conditions, (c) => c.id, (c) => ({ name: c.name, summary: c.summary, href: c.canonicalPath })),
      ...pick(related.conditions, conditionLinks, (c) => c.id, (c) => ({ name: c.name, summary: c.summary, href: c.href })),
    ],
    articles,
  };
}
