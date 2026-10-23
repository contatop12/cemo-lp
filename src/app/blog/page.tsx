import { BlogIndex } from '@/components/templates/BlogIndex';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Blog: conteúdos sobre saúde ocular',
  description: 'Artigos da equipe do CEMO sobre catarata, glaucoma, miopia, ceratocone, exames e cuidados com a visão no dia a dia.',
  path: '/blog/',
});

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
