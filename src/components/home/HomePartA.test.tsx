import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doctors } from '@/content/fixtures/doctors';
import { editorial } from '@/content/fixtures/editorial';
import { leadInterests } from '@/content/fixtures/lead-interests';
import { services as fixtureServices } from '@/content/fixtures/services';
import { siteSettings } from '@/content/fixtures/site-settings';
import { videos } from '@/content/fixtures/videos';
import { telHref, whatsappHref } from '@/lib/contact';
import { ConversionBlock } from './ConversionBlock';
import { DoctorSpotlight } from './DoctorSpotlight';
import { EditorialBlock } from './EditorialBlock';
import { ServicesIndex } from './ServicesIndex';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/' }));

type DataLayerWindow = Window & { dataLayer?: unknown[] };
const services = [...fixtureServices].sort((a, b) => a.homeOrder - b.homeOrder);
const david = doctors.find((d) => d.slug === 'david-ribeiro-de-mendonca-filho')!;

describe('ConversionBlock', () => {
  it('seção #agendar com o formulário e os contatos diretos', () => {
    const { container } = render(<ConversionBlock interests={leadInterests} settings={siteSettings} />);
    expect(container.querySelector('section#agendar')).not.toBeNull();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(screen.getByLabelText(/^Nome/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^WhatsApp/)).toBeInTheDocument();
    expect(screen.getByLabelText(/O que você está buscando\?/)).toBeInTheDocument();
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(telHref(siteSettings));
    expect(hrefs).toContain(whatsappHref(siteSettings));
  });
});

describe('ServicesIndex (tabela de leitura)', () => {
  it('8 linhas na ordem, cada uma um único link de linha inteira com o título em h3', () => {
    const { container } = render(<ServicesIndex services={services} />);
    expect(container.querySelector('section#especialidades')).not.toBeNull();
    const rows = within(screen.getByRole('list', { name: 'Especialidades e serviços' })).getAllByRole('listitem');
    expect(rows).toHaveLength(8);
    rows.forEach((row, i) => {
      const links = within(row).getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', services[i]!.href);
      expect(within(row).getByRole('heading', { level: 3 })).toHaveTextContent(services[i]!.title);
      expect(row.querySelector('[data-emphasis]')?.getAttribute('data-emphasis')).toBe(String(services[i]!.emphasis));
    });
    expect(screen.getByRole('link', { name: 'Ver todas as especialidades' })).toHaveAttribute('href', '/especialidades/');
  });

  it('tamanho do título diminui com a ênfase, como numa tabela de leitura', () => {
    render(<ServicesIndex services={services} />);
    const first = screen.getByRole('heading', { level: 3, name: services[0]!.title });
    const last = screen.getByRole('heading', { level: 3, name: services[7]!.title });
    expect(first.className).not.toBe(last.className);
  });

  it('clique registra service_cta_click sem o nome do serviço', async () => {
    (window as DataLayerWindow).dataLayer = [];
    render(<ServicesIndex services={services} />);
    const link = screen.getByRole('link', { name: new RegExp(services[0]!.title) });
    link.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(link);
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'service_cta_click', location: 'home_services' }]);
    expect(JSON.stringify((window as DataLayerWindow).dataLayer)).not.toMatch(/catarata/i);
  });
});

describe('EditorialBlock', () => {
  it('título, parágrafos e CTA do conteúdo; TODOs nunca aparecem', () => {
    const content = editorial.catarata;
    const { container } = render(<EditorialBlock content={content} tone="nevoa" />);
    expect(screen.getByRole('heading', { level: 2, name: content.heading })).toBeInTheDocument();
    for (const p of content.paragraphs) expect(screen.getByText(p)).toBeInTheDocument();
    for (const b of content.bullets) expect(screen.getByText(b)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: content.ctaLabel })).toHaveAttribute('href', content.href);
    expect(container.textContent).not.toContain('TODO_CONTENT_VALIDATION');
    expect(container.querySelector('section')).toHaveClass('bg-nevoa');
  });

  it('alterna o tom', () => {
    const { container } = render(<EditorialBlock content={editorial.refrativa} tone="papel" />);
    expect(container.querySelector('section')).toHaveClass('bg-papel');
  });

  it('com vídeo: mostra o cartão de vídeo (sem player antes do clique)', () => {
    const video = videos.find((v) => v.id === 'dr-adriano-catarata')!;
    const { container } = render(<EditorialBlock content={editorial.catarata} tone="nevoa" video={video} />);
    expect(screen.getByRole('button', { name: `Assistir: ${video.title}` })).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();
  });
});

describe('DoctorSpotlight', () => {
  it('foto, CRM do repositório, credenciais e sem RQE inventado', () => {
    render(<DoctorSpotlight doctor={david} />);
    expect(screen.getByRole('img', { name: david.photo!.alt })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(david.crm))).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('RQE');
    for (const c of david.credentials) expect(screen.getByText(c)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todo o corpo clínico' })).toHaveAttribute('href', '/corpo-clinico/');
    const profile = screen.getByRole('link', { name: 'Ver o perfil do Dr. David' });
    expect(profile).toHaveAttribute('href', david.canonicalPath);
    expect(profile).not.toHaveAttribute('aria-label'); // nome acessível = texto visível (WCAG 2.5.3)
    for (const p of david.bio) expect(screen.getByText(p)).toBeInTheDocument();
  });

  it('sem foto renderiza monograma sem quebrar', () => {
    render(<DoctorSpotlight doctor={{ ...david, photo: null }} />);
    expect(screen.getByText('DR')).toBeInTheDocument();
  });
});
