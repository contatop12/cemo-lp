import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { articles } from '@/content/fixtures/articles';
import { doctors } from '@/content/fixtures/doctors';
import { equipment } from '@/content/fixtures/equipment';
import { insurancePlans } from '@/content/fixtures/insurance-plans';
import { siteSettings } from '@/content/fixtures/site-settings';
import { siteStats } from '@/content/fixtures/stats';
import { videos } from '@/content/fixtures/videos';
import type { Testimonial } from '@/content/types';
import { directionsHref, formatAddress, mapsEmbedSrc } from '@/lib/contact';
import { LazyMap } from '@/components/media/LazyMap';
import { VideoFacade } from '@/components/media/VideoFacade';
import { ContentSection } from './ContentSection';
import { DoctorsSection } from './DoctorsSection';
import { FinalCta } from './FinalCta';
import { InsuranceSection } from './InsuranceSection';
import { LocationSection } from './LocationSection';
import { ReviewsSection } from './ReviewsSection';
import { TechStructure } from './TechStructure';
import { VideoSection } from './VideoSection';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/' }));

type DataLayerWindow = Window & { dataLayer?: unknown[] };
beforeEach(() => {
  (window as DataLayerWindow).dataLayer = [];
});

describe('ReviewsSection', () => {
  it('sem depoimentos: nota + link, nenhuma lista', async () => {
    render(<ReviewsSection stats={siteStats} testimonials={[]} reviewsHref="https://g.page/x" />);
    expect(screen.queryByRole('list', { name: /avaliações/i })).toBeNull();
    const link = screen.getByRole('link', { name: 'Ver avaliações no Google' });
    link.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(link);
    expect(JSON.stringify((window as DataLayerWindow).dataLayer)).toContain('reviews_click');
  });

  it('com depoimento real: autor, texto e origem Google', () => {
    const t: Testimonial = { id: '1', author: 'Paciente A.', text: 'Atendimento atencioso.', rating: 5, date: '2026-09-01', sourceUrl: 'https://g.page/x' };
    render(<ReviewsSection stats={siteStats} testimonials={[t]} reviewsHref="https://g.page/x" />);
    const list = screen.getByRole('list', { name: /avaliações/i });
    expect(within(list).getByText('Paciente A.')).toBeInTheDocument();
    expect(within(list).getByText(/Atendimento atencioso\./)).toBeInTheDocument();
    expect(within(list).getByText(/Google/)).toBeInTheDocument();
  });
});

describe('VideoSection / VideoFacade', () => {
  it('sem vídeo publicado a seção não existe', () => {
    const { container } = render(<VideoSection video={videos[0]!} />);
    expect(container.firstChild).toBeNull();
  });

  it('facade só carrega o player (youtube-nocookie) após o clique', async () => {
    const { container } = render(<VideoFacade title="Tudo em um lugar só" youtubeId="abc123" poster={null} />);
    expect(container.querySelector('iframe')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Assistir: Tudo em um lugar só' }));
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')?.startsWith('https://www.youtube-nocookie.com/embed/abc123')).toBe(true);
    expect(iframe).toHaveAttribute('title', 'Tudo em um lugar só');
  });
});

describe('LazyMap', () => {
  it('prévia estática sem iframe; mapa interativo só após o clique', async () => {
    const { container } = render(<LazyMap embedSrc={mapsEmbedSrc(siteSettings)} title="Mapa da CEMO" address={formatAddress(siteSettings)} />);
    expect(container.querySelector('iframe')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Carregar mapa interativo' }));
    const iframe = container.querySelector('iframe');
    expect(iframe).toHaveAttribute('loading', 'lazy');
    expect(iframe).toHaveAttribute('title', 'Mapa da CEMO');
  });
});

describe('TechStructure', () => {
  it('6 itens: 1 âncora + 5 recortes, com alt, dimensões e legendas sem TODO', () => {
    const { container } = render(<TechStructure items={equipment} />);
    expect(container.querySelectorAll('figure[data-anchor]')).toHaveLength(1);
    expect(container.querySelectorAll('figure[data-detail]')).toHaveLength(5);
    for (const img of container.querySelectorAll('img')) {
      expect(img.getAttribute('alt')?.length).toBeGreaterThan(10);
      expect(img).toHaveAttribute('width');
      expect(img).toHaveAttribute('height');
    }
    const captions = [...container.querySelectorAll('figcaption')].map((f) => f.textContent ?? '');
    expect(captions.length).toBe(6);
    for (const c of captions) expect(c).not.toContain('TODO');
  });

  it('funciona com 1 item', () => {
    const { container } = render(<TechStructure items={equipment.slice(0, 1)} />);
    expect(container.querySelectorAll('figure')).toHaveLength(1);
  });
});

describe('DoctorsSection', () => {
  it('8 médicos com CRM, sem RQE nem links de perfil', () => {
    render(<DoctorsSection doctors={doctors} />);
    for (const d of doctors) expect(screen.getByText(new RegExp(d.crm))).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('RQE');
    const links = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(links).toEqual(['/corpo-clinico/']);
    expect(screen.getAllByText(/^[A-ZÁÉÍÓÚ]{2}$/).length).toBe(doctors.filter((d) => !d.photo).length);
  });
});

describe('InsuranceSection', () => {
  it('16 nomes em texto e aviso de cobertura', () => {
    const { container } = render(<InsuranceSection plans={insurancePlans} settings={siteSettings} />);
    for (const p of insurancePlans) expect(screen.getByText(p.name)).toBeInTheDocument();
    expect(container.querySelector('img[alt=""]')).toBeNull();
    expect(screen.getByText(/Consulte a cobertura do seu plano/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver convênios' })).toHaveAttribute('href', '/convenios/');
  });
});

describe('LocationSection', () => {
  it('NAP, horários em <dl>, como chegar e regiões em prosa', async () => {
    const { container } = render(<LocationSection settings={siteSettings} />);
    // endereço no texto e na prévia do mapa
    expect(screen.getAllByText(formatAddress(siteSettings))).toHaveLength(2);
    expect(container.querySelector('dl')).not.toBeNull();
    const directions = screen.getByRole('link', { name: 'Como chegar' });
    expect(directions).toHaveAttribute('href', directionsHref(siteSettings));
    directions.addEventListener('click', (e) => e.preventDefault());
    await userEvent.click(directions);
    expect(JSON.stringify((window as DataLayerWindow).dataLayer)).toContain('directions_click');
    const prose = screen.getByText(/Embu das Artes/);
    expect(prose.tagName).toBe('P');
  });
});

describe('ContentSection', () => {
  it('3 artigos com URLs preservadas, um link por card', () => {
    render(<ContentSection articles={articles} />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
    cards.forEach((card, i) => {
      const links = within(card).getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveAttribute('href', articles[i]!.href);
    });
    expect(screen.getByRole('link', { name: 'Ver todos os conteúdos' })).toHaveAttribute('href', '/blog/');
  });
});

describe('FinalCta', () => {
  it('faixa escura com Agendar e WhatsApp', () => {
    const { container } = render(<FinalCta settings={siteSettings} />);
    expect(container.querySelector('section')).toHaveClass('on-dark');
    expect(screen.getByRole('link', { name: 'Agendar consulta' })).toHaveAttribute('href', '#agendar');
    expect(screen.getByRole('link', { name: /WhatsApp/ })).toBeInTheDocument();
  });
});
