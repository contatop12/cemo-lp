import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doctors } from '@/content/fixtures/doctors';
import { editorial } from '@/content/fixtures/editorial';
import { leadInterests } from '@/content/fixtures/lead-interests';
import { services } from '@/content/fixtures/services';
import { siteSettings } from '@/content/fixtures/site-settings';
import { assets } from '@/content/assets';
import { telHref, whatsappHref } from '@/lib/contact';
import { ConversionBlock } from './ConversionBlock';
import { DoctorSpotlight } from './DoctorSpotlight';
import { EditorialBlock } from './EditorialBlock';
import { ServicesGrid } from './ServicesGrid';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/' }));

type DataLayerWindow = Window & { dataLayer?: unknown[] };
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

describe('ServicesGrid', () => {
  it('8 cards na ordem, um link por card com texto específico', () => {
    const { container } = render(<ServicesGrid services={services} />);
    expect(container.querySelector('section#especialidades')).not.toBeNull();
    const cards = screen.getAllByRole('heading', { level: 3 }).map((h) => h.closest('li')!);
    expect(cards).toHaveLength(8);
    cards.forEach((card, i) => {
      const links = within(card).getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', services[i]!.href);
      expect(links[0]).toHaveTextContent(services[i]!.ctaLabel);
      expect(card.querySelector('a a')).toBeNull();
    });
    expect(screen.getByRole('link', { name: 'Ver todas as especialidades' })).toHaveAttribute('href', '/especialidades/');
  });

  it('clique registra service_cta_click sem o nome do serviço', async () => {
    (window as DataLayerWindow).dataLayer = [];
    render(<ServicesGrid services={services} />);
    const link = screen.getByRole('link', { name: services[1]!.ctaLabel });
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
});

describe('DoctorSpotlight', () => {
  it('foto, CRM do repositório, credenciais e sem RQE inventado', () => {
    render(<DoctorSpotlight doctor={david} />);
    expect(screen.getByRole('img', { name: assets.drDavid.alt })).toBeInTheDocument();
    expect(screen.getByText(new RegExp(david.crm))).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('RQE');
    for (const c of david.credentials) expect(screen.getByText(c)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver todo o corpo clínico' })).toHaveAttribute('href', '/corpo-clinico/');
  });

  it('sem foto renderiza monograma sem quebrar', () => {
    render(<DoctorSpotlight doctor={{ ...david, photo: null }} />);
    expect(screen.getByText('DR')).toBeInTheDocument();
  });
});
