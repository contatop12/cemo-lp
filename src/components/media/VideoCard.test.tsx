import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { videos } from '@/content/fixtures/videos';
import { formatDuration, VideoCard } from './VideoCard';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

const withCaptions = videos.find((v) => v.captionsSrc !== null)!;
const openCaptions = videos.find((v) => v.captionsSrc === null)!;

describe('VideoCard', () => {
  beforeEach(() => {
    (window as DataLayerWindow).dataLayer = [];
  });

  it('antes do clique: só pôster e botão, nenhum <video> carregado', () => {
    const { container } = render(<VideoCard video={withCaptions} location="teste" />);
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getByRole('button', { name: `Assistir: ${withCaptions.title}` })).toBeInTheDocument();
    const poster = container.querySelector('img');
    expect(poster).toHaveAttribute('loading', 'lazy');
  });

  it('o clique carrega o player com controles, legenda em português e registra video_play sem dado de saúde', async () => {
    const { container } = render(<VideoCard video={withCaptions} location="pagina_hero" />);
    await userEvent.click(screen.getByRole('button', { name: `Assistir: ${withCaptions.title}` }));
    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    const sources = [...video!.querySelectorAll('source')];
    expect(sources.map((s) => s.getAttribute('src'))).toEqual([withCaptions.srcAv1, withCaptions.src]);
    expect(sources[0]?.getAttribute('type')).toContain('av01');
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    const track = container.querySelector('track');
    expect(track).toHaveAttribute('kind', 'captions');
    expect(track).toHaveAttribute('srclang', 'pt-BR');
    expect(track).toHaveAttribute('src', withCaptions.captionsSrc);
    expect((window as DataLayerWindow).dataLayer).toEqual([{ event: 'video_play', location: 'pagina_hero' }]);
    // O foco do teclado não se perde quando o botão vira player.
    expect(video).toHaveFocus();
    expect(video).toHaveAttribute('aria-label', withCaptions.title);
  });

  it('vídeo com legenda aberta não ganha <track>', async () => {
    const { container } = render(<VideoCard video={openCaptions} location="teste" />);
    await userEvent.click(screen.getByRole('button', { name: `Assistir: ${openCaptions.title}` }));
    expect(container.querySelector('track')).toBeNull();
  });

  it('transcrição no HTML, recolhida em <details>', () => {
    const { container } = render(<VideoCard video={withCaptions} location="teste" />);
    const details = container.querySelector('details');
    expect(details?.querySelector('summary')).toHaveTextContent('Ler a transcrição');
    expect(details).toHaveTextContent(withCaptions.transcript[0]!);
  });

  it('mostra quem fala e a duração', () => {
    render(<VideoCard video={withCaptions} location="teste" />);
    expect(screen.getByText(withCaptions.speakerName)).toBeInTheDocument();
    expect(screen.getByText(formatDuration(withCaptions.durationSeconds))).toBeInTheDocument();
  });

  it('formata duração em minutos e segundos', () => {
    expect(formatDuration(48)).toBe('48 s');
    expect(formatDuration(65)).toBe('1 min 05 s');
    expect(formatDuration(97)).toBe('1 min 37 s');
  });
});
