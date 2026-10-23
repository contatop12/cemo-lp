import { render, screen } from '@testing-library/react';
import { content } from '@/content';
import { DoctorTemplate } from './DoctorTemplate';
import { ConditionTemplate, ExamTemplate, SpecialtyTemplate } from './EntityTemplates';
import { PostTemplate } from './PostTemplate';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/' }));

function graphTypes(container: HTMLElement): string[] {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => {
    const data = JSON.parse(s.textContent ?? '{}') as { '@graph'?: Array<{ '@type': string | string[] }>; '@type'?: string };
    return (data['@graph'] ?? [data]).flatMap((n) => n['@type'] ?? []);
  });
}

function expectSoundPage(container: HTMLElement) {
  expect(container.querySelectorAll('h1')).toHaveLength(1);
  const levels = [...container.querySelectorAll('h1, h2, h3, h4')].map((h) => Number(h.tagName[1]));
  levels.forEach((level, i) => {
    if (i > 0) expect(level - levels[i - 1]!).toBeLessThanOrEqual(1);
  });
  expect(container.textContent).not.toContain('TODO_CONTENT_VALIDATION');
  for (const img of container.querySelectorAll('img')) expect(img.hasAttribute('alt')).toBe(true);
  expect(container.querySelector('nav[aria-label="Você está aqui"]')).not.toBeNull();
}

describe('templates de página', () => {
  it('especialidade (Catarata): formulário com catarata marcada, FAQ, médicos, vídeo e dados estruturados', async () => {
    const s = (await content.getSpecialty('catarata'))!;
    const { container } = render(await SpecialtyTemplate({ specialty: s }));
    expectSoundPage(container);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(s.h1);
    const selects = container.querySelectorAll<HTMLSelectElement>('select');
    expect(selects.length).toBe(2); // topo e final
    for (const select of selects) expect(select.value).toBe('catarata');
    expect(screen.getByRole('heading', { level: 2, name: s.answer.question })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Quem atende' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Assistir:/ })).toBeInTheDocument();
    const types = graphTypes(container);
    for (const t of ['MedicalWebPage', 'FAQPage', 'VideoObject', 'BreadcrumbList', 'MedicalClinic']) expect(types).toContain(t);
    expect(JSON.stringify(types)).not.toMatch(/Review|AggregateRating/);
  });

  it('exame em slug de artigo: trilha de Exames e template do exame', async () => {
    const e = (await content.getExam('campo-visual'))!;
    const { container } = render(await ExamTemplate({ exam: e }));
    expectSoundPage(container);
    expect(screen.getByRole('link', { name: 'Exames' })).toHaveAttribute('href', '/exames/');
    for (const select of container.querySelectorAll<HTMLSelectElement>('select')) expect(select.value).toBe('exames');
    expect(screen.getByRole('heading', { level: 2, name: 'Para que serve' })).toBeInTheDocument();
    const ld = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent).join();
    expect(ld).toContain('"MedicalTest"');
  });

  it('condição: trilha de Condições oculares e aviso de sinais', async () => {
    const c = (await content.getCondition('ceratocone'))!;
    const { container } = render(await ConditionTemplate({ condition: c }));
    expectSoundPage(container);
    expect(screen.getByRole('link', { name: 'Condições oculares' })).toHaveAttribute('href', '/condicoes-oculares/');
    expect(screen.getAllByText(/precisam de avaliação oftalmológica/).length).toBeGreaterThan(0);
  });

  it('perfil do médico: CRM, formação, sem RQE inventado e JSON-LD de perfil', async () => {
    const d = (await content.getDoctorBySlug('david-ribeiro-de-mendonca-filho'))!;
    const { container } = render(await DoctorTemplate({ doctor: d }));
    expectSoundPage(container);
    expect(screen.getByText(new RegExp(d.crm))).toBeInTheDocument();
    expect(container.textContent).not.toContain('RQE');
    for (const c of d.credentials) expect(screen.getByText(c)).toBeInTheDocument();
    expect(graphTypes(container)).toEqual(expect.arrayContaining(['ProfilePage', 'Person']));
  });

  it('post migrado: datas originais, link contextual para a entidade e BlogPosting', async () => {
    const post = (await content.getPost('hipermetropia-como-e-a-visao'))!;
    const { container } = render(await PostTemplate({ post }));
    expectSoundPage(container);
    expect(container.querySelector(`time[datetime="${post.publishedAt}"]`)).not.toBeNull();
    expect(screen.getByRole('complementary', { name: 'Próximo passo' })).toBeInTheDocument();
    expect(graphTypes(container)).toContain('BlogPosting');
  });
});

describe('correções da revisão final', () => {
  type DataLayerWindow = Window & { dataLayer?: unknown[] };
  beforeEach(() => {
    (window as DataLayerWindow).dataLayer = [];
  });

  it('condição: formulário marca a área da própria condição (ceratocone → córnea)', async () => {
    const c = (await content.getCondition('ceratocone'))!;
    const { container } = render(await ConditionTemplate({ condition: c }));
    for (const select of container.querySelectorAll<HTMLSelectElement>('select')) expect(select.value).toBe('cornea');
  });

  it('perfil: interesse e áreas na ordem do próprio médico (Dra. Roberta → glaucoma)', async () => {
    const d = (await content.getDoctorBySlug('roberta-andrade-e-nascimento'))!;
    const { container } = render(await DoctorTemplate({ doctor: d }));
    for (const select of container.querySelectorAll<HTMLSelectElement>('select')) expect(select.value).toBe('glaucoma');
    const chips = [...container.querySelectorAll('ul[aria-label="Áreas de atuação no CEMO"] a')].map((a) => a.textContent);
    expect(chips[0]).toBe('Glaucoma');
  });

  it('perfil: registra doctor_view sem dado do médico', async () => {
    const d = (await content.getDoctorBySlug('adriana-bizzarri'))!;
    render(await DoctorTemplate({ doctor: d }));
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'doctor_view', location: 'perfil_medico' }]);
  });

  it('índice "Nesta página": toda âncora tem alvo e não há ids duplicados', async () => {
    for (const s of await content.listSpecialties()) {
      const { container, unmount } = render(await SpecialtyTemplate({ specialty: s }));
      for (const a of container.querySelectorAll('nav[aria-label="Nesta página"] a')) {
        const id = a.getAttribute('href')!.slice(1);
        expect(container.querySelector(`[id="${id}"]`), `${s.id} → #${id}`).not.toBeNull();
      }
      const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
      expect(ids.filter((id, i) => ids.indexOf(id) !== i), s.id).toEqual([]);
      unmount();
    }
  });

  it('cliques na página de especialidade não levam o assunto para o analytics', async () => {
    const s = (await content.getSpecialty('catarata'))!;
    render(await SpecialtyTemplate({ specialty: s }));
    const link = screen.getAllByRole('link', { name: 'Falar no WhatsApp' })[0]!;
    link.addEventListener('click', (e) => e.preventDefault());
    link.click();
    const layer = JSON.stringify((window as DataLayerWindow).dataLayer);
    expect(layer).toContain('whatsapp_click');
    expect(layer).not.toMatch(/catarata/i);
  });

  it('post: CTA final com frase íntegra para a Home e para especialidades', async () => {
    const posts = await content.listPosts();
    const home = posts.find((p) => p.entity?.kind === 'home')!;
    const { unmount } = render(await PostTemplate({ post: (await content.getPost(home.slug))! }));
    expect(screen.getByRole('link', { name: 'Conheça o CEMO' })).toHaveAttribute('href', '/');
    unmount();
    const post = (await content.getPost('hipermetropia-como-e-a-visao'))!;
    render(await PostTemplate({ post }));
    expect(screen.getByRole('link', { name: /^Conheça a página de / })).toBeInTheDocument();
  });

  it('post: data de atualização nunca anterior à de publicação', async () => {
    for (const p of await content.listPosts()) {
      expect(p.publishedAt, p.slug).toMatch(/Z$/);
      expect(p.modifiedAt >= p.publishedAt, p.slug).toBe(true);
    }
  });
});
