import { RESERVED_ROOT_SLUGS } from '@/content/routes';

// /[slug]/ serve posts e exames em slug de artigo: se dois disputam a mesma URL (ou um colide com rota estática),
// o build falha em vez de um deles sumir em silêncio.
export function assertRootSlugs(slugs: string[]): string[] {
  const reserved = new Set<string>(RESERVED_ROOT_SLUGS);
  const seen = new Set<string>();
  for (const slug of slugs) {
    if (reserved.has(slug)) throw new Error(`Slug na raiz colide com rota estática: /${slug}/`);
    if (seen.has(slug)) throw new Error(`Dois conteúdos disputam a URL /${slug}/`);
    seen.add(slug);
  }
  return slugs;
}
