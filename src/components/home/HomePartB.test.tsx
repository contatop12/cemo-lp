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
import { InsuranceSearch } from '@/components/page/InsuranceSearch';
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

describe('VideoSection', () => {
  it('sem vídeos a seção não existe', () => {
    const { container } = render(<VideoSection videos={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('um cartão por vídeo, nenhum player antes do clique e transcrição no HTML', () => {
    const list = videos.slice(0, 3);
    const { container } = render(<VideoSection videos={list} />);
    for (const v of list) expect(screen.getByRole('button', { name: `Assistir: ${v.title}` })).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelectorAll('details')).toHaveLength(3);
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
  it('6 fotos do mesmo tamanho, alinhadas (pedido do cliente, 26/10), com alt, dimensões e legendas sem TODO', () => {
    const { container } = render(<TechStructure items={equipment} />);
    const figures = [...container.querySelectorAll('figure')];
    expect(figures).toHaveLength(6);
    expect(new Set(figures.map((f) => f.className)).size).toBe(1);
    expect(new Set([...container.querySelectorAll('img')].map((i) => i.className)).size).toBe(1);
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
  const published = doctors.filter((d) => d.published);

  it('médicos publicados com CRM e link de perfil; sem RQE', () => {
    render(<DoctorsSection doctors={published} />);
    for (const d of published) {
      expect(screen.getByText(new RegExp(d.crm.replace('/', '\/')))).toBeInTheDocument();
      expect(screen.getByRole('link', { name: `${d.honorific} ${d.name}` })).toHaveAttribute('href', d.canonicalPath);
    }
    // RQE só para quem a CEMO informou (nunca inventado).
    for (const d of published) {
      if (d.rqe) expect(screen.getByText(new RegExp(`RQE ${d.rqe}`))).toBeInTheDocument();
    }
    expect(document.body.textContent?.match(/RQE/g)?.length ?? 0).toBe(published.filter((d) => d.rqe).length);
    expect(screen.getByRole('link', { name: 'Conhecer o corpo clínico' })).toHaveAttribute('href', '/corpo-clinico/');
  });

  it('sem foto: silhueta cinza no lugar do retrato (sem monograma)', () => {
    const [d] = published;
    const { container } = render(<DoctorsSection doctors={[{ ...d!, photo: null }]} />);
    const avatar = container.querySelector('[data-avatar-placeholder]');
    expect(avatar).not.toBeNull();
    expect(avatar).toHaveAttribute('aria-hidden', 'true');
    expect(container.textContent).not.toMatch(/[A-Z]{2}/);
  });

  it('áreas sem separador "·" e retrato com alt', () => {
    const { container } = render(<DoctorsSection doctors={published} />);
    expect(container.textContent).not.toContain('·');
    for (const img of container.querySelectorAll('img')) expect(img.getAttribute('alt')?.length).toBeGreaterThan(10);
  });
});

describe('InsuranceSection', () => {
  it('16 nomes em texto e aviso de cobertura', () => {
    render(<InsuranceSection plans={insurancePlans} settings={siteSettings} />);
    for (const p of insurancePlans) expect(screen.getByText(p.name)).toBeInTheDocument();
    expect(screen.getByText(/Consulte a cobertura do seu plano/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver convênios' })).toHaveAttribute('href', '/convenios/');
  });

  it('logo de cada convênio que tem logo; o nome continua em texto (logo decorativa)', () => {
    const { container } = render(<InsuranceSection plans={insurancePlans} settings={siteSettings} />);
    const withLogo = insurancePlans.filter((p) => p.logo);
    const imgs = [...container.querySelectorAll('img')];
    expect(imgs).toHaveLength(withLogo.length);
    for (const p of withLogo) {
      const img = imgs.find((i) => decodeURIComponent(i.getAttribute('src') ?? '').includes(`/images/convenios/${p.id}.webp`));
      expect(img, p.name).toBeDefined();
      expect(img).toHaveAttribute('alt', '');
    }
  });
});

describe('InsuranceSearch', () => {
  it('mostra as logos e filtra pelo nome, sem acento', async () => {
    const user = userEvent.setup();
    const { container } = render(<InsuranceSearch plans={insurancePlans.map(({ id, name, logo }) => ({ id, name, logo }))} />);
    expect(container.querySelectorAll('img')).toHaveLength(insurancePlans.filter((p) => p.logo).length);
    await user.type(screen.getByRole('searchbox', { name: 'Procure o seu convênio' }), 'itau');
    expect(screen.getByText('Saúde Itaú')).toBeInTheDocument();
    expect(screen.queryByText('Amil')).toBeNull();
    expect(container.querySelectorAll('img')).toHaveLength(1);
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
