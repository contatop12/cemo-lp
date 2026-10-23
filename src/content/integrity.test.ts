// @vitest-environment node
// Integridade do grafo de conteúdo: todo vínculo aponta para algo publicado, nenhuma URL é servida por duas
// entidades e o conteúdo médico novo nunca está fora do workflow de revisão.
import { content } from './index';
import { RESERVED_ROOT_SLUGS } from './routes';

const all = async () => ({
  specialties: await content.listSpecialties({ includeUnpublished: true }),
  exams: await content.listExams(),
  conditions: await content.listConditions(),
  conditionLinks: await content.listConditionLinks(),
  doctors: await content.listDoctors(),
  posts: await content.listPosts(),
  videos: await content.listVideos(),
});

describe('integridade do conteúdo', () => {
  it('posts migrados: 113, mais novos primeiro, nenhum consolidado ou exame em slug de artigo', async () => {
    const { posts, exams } = await all();
    expect(posts).toHaveLength(113);
    expect(posts.map((p) => p.publishedAt)).toEqual([...posts.map((p) => p.publishedAt)].sort().reverse());
    const examRoots = exams.map((e) => e.canonicalPath).filter((p) => !p.startsWith('/exames/'));
    for (const p of posts) expect(examRoots).not.toContain(`/${p.slug}/`);
    expect(posts.find((p) => p.slug === 'tudo-sobre-glaucoma')).toBeUndefined();
  });

  it('getPost devolve HTML limpo e null para slug desconhecido', async () => {
    const post = await content.getPost('hipermetropia-como-e-a-visao');
    expect(post?.html).toBeTruthy();
    expect(post?.html).not.toMatch(/\[et_|style=|class=|<span|<div|&nbsp;/);
    expect(await content.getPost('nao-existe')).toBeNull();
  });

  it('nenhuma URL canônica é servida por duas entidades, nem colide com slug reservado', async () => {
    const { specialties, exams, conditions, doctors, posts } = await all();
    const paths = [
      ...specialties.filter((s) => s.published).map((s) => s.canonicalPath),
      ...exams.map((e) => e.canonicalPath),
      ...conditions.map((c) => c.canonicalPath),
      ...doctors.map((d) => d.canonicalPath),
      ...posts.map((p) => `/${p.slug}/`),
    ];
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of posts) expect(RESERVED_ROOT_SLUGS).not.toContain(p.slug);
  });

  it('todo vínculo em related aponta para entidade publicada existente', async () => {
    const { specialties, exams, conditions, conditionLinks, doctors, posts, videos } = await all();
    const ids = {
      doctors: new Set(doctors.map((d) => d.slug)),
      specialties: new Set(specialties.filter((s) => s.published).map((s) => s.id)),
      exams: new Set(exams.map((e) => e.id)),
      conditions: new Set([...conditions.map((c) => c.id), ...conditionLinks.map((c) => c.id)]),
      articles: new Set(posts.map((p) => p.slug)),
    };
    const videoIds = new Set(videos.map((v) => v.id));
    for (const entity of [...specialties, ...exams, ...conditions]) {
      for (const [kind, list] of Object.entries(entity.related) as Array<[keyof typeof ids, string[]]>) {
        for (const id of list) expect(ids[kind].has(id), `${entity.id} → ${kind}:${id}`).toBe(true);
      }
      for (const v of 'videoIds' in entity ? entity.videoIds : []) expect(videoIds.has(v), `${entity.id} → vídeo ${v}`).toBe(true);
    }
  });

  it('conteúdo médico novo está no workflow (nunca DRAFT) e tem TODO de revisão enquanto não aprovado', async () => {
    const { specialties, exams, conditions } = await all();
    for (const e of [...specialties, ...exams, ...conditions]) {
      expect(e.review.status, e.id).not.toBe('DRAFT');
      if (e.review.status === 'MEDICAL_REVIEW') expect(e.todos).toContain('TODO_CONTENT_VALIDATION: revisão médica do texto');
      expect(e.answer.text.split(/\s+/).length, `${e.id} resposta direta`).toBeLessThanOrEqual(110);
      expect(e.seo.title.length, `${e.id} title`).toBeLessThanOrEqual(56);
    }
  });

  it('tratamentos não confirmados não aparecem em nenhuma lista pública', async () => {
    const published = await content.listSpecialties();
    for (const id of ['crosslinking-corneano', 'anel-intraestromal', 'transplante-de-cornea']) {
      expect(published.find((s) => s.id === id)).toBeUndefined();
    }
  });

  it('listArticles devolve os posts pedidos, na ordem, com href na raiz', async () => {
    const articles = await content.listArticles(['hipermetropia-como-e-a-visao', 'nao-existe', 'tudo-sobre-capsulotomia-com-yag-laser']);
    expect(articles.map((a) => a.href)).toEqual(['/hipermetropia-como-e-a-visao/', '/tudo-sobre-capsulotomia-com-yag-laser/']);
  });
});
