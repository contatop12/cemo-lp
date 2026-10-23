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
