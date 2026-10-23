import { HubPage } from '@/components/templates/HubPage';
import { content } from '@/content';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Condições oculares: sinais, causas e tratamentos',
  description: 'Ceratocone, miopia, astigmatismo, hipermetropia, degeneração macular, descolamento de retina e outras condições explicadas com clareza.',
  path: '/condicoes-oculares/',
});

export default async function CondicoesPage() {
  const [conditions, links] = await Promise.all([content.listConditions(), content.listConditionLinks()]);
  return (
    <HubPage
      path="/condicoes-oculares/"
      breadcrumbs={[{ name: 'Início', path: '/' }, { name: 'Condições oculares', path: '/condicoes-oculares/' }]}
      title="Condições oculares"
      lead="O que é cada condição, que sinais merecem atenção e como costuma ser o tratamento. Informação para conversar melhor com o oftalmologista, nunca para substituir a consulta."
      groups={[
        {
          id: 'condicoes',
          items: [
            ...conditions.map((c) => ({ name: c.name, summary: c.summary, href: c.canonicalPath })),
            ...links.map((c) => ({ name: c.name, summary: c.summary, href: c.href })),
          ],
        },
      ]}
      ctaTitle="Agende uma avaliação com o oftalmologista"
      formId="hub_condicoes"
    />
  );
}
