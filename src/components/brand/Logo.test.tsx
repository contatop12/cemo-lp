import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

const ALT = 'CEMO – Centro de Microcirurgia Ocular';

describe('Logo', () => {
  it('renderiza o SVG colorido com alt exato e dimensões explícitas', () => {
    render(<Logo height={56} />);
    const img = screen.getByRole('img', { name: ALT });
    expect(img).toHaveAttribute('src', '/brand/logo-cemo.svg');
    expect(img).toHaveAttribute('height', '56');
    expect(Number(img.getAttribute('width'))).toBe(Math.round((56 * 648) / 508));
  });

  it('variante branca aponta para o SVG branco', () => {
    render(<Logo variant="white" />);
    expect(screen.getByRole('img', { name: ALT })).toHaveAttribute('src', '/brand/logo-cemo-white.svg');
  });

  it('priority troca o carregamento para eager com prioridade alta', () => {
    render(<Logo priority />);
    const img = screen.getByRole('img', { name: ALT });
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });
});
