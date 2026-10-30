import { render, screen, within } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ReactDOM from 'react-dom';
import { assets } from '@/content/assets';
import { Hero, type HeroProps } from './Hero';

vi.mock('react-dom', async (importOriginal) => ({ ...(await importOriginal<typeof import('react-dom')>()), preload: vi.fn() }));

const props: HeroProps = {
  kicker: 'Centro de Microcirurgia Ocular',
  headline: 'Clínica de Oftalmologia em Taboão da Serra',
  lead: 'Consulta, exames, tratamentos e cirurgias oftalmológicas, com equipe médica e estrutura reunidas em um só lugar.',
  primaryCta: { label: 'Agendar consulta', href: '#agendar' },
  secondaryCta: { label: 'Conhecer especialidades', href: '#especialidades' },
  proof: [
    { id: 'google', value: '4,9', label: 'nota no Google' },
    { id: 'anos', value: '+20', label: 'anos de atividade' },
  ],
  doctor: {
    name: 'Dr. David Ribeiro de Mendonça Filho',
    role: 'Diretor Técnico',
    registry: 'CRM/SP 00000',
    image: assets.drDavidCutout,
  },
};

describe('Hero (lente de prova)', () => {
  it('tem um único h1 com o texto exato', () => {
    render(<Hero {...props} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Clínica de Oftalmologia em Taboão da Serra');
    expect(h1s[0]).toHaveAttribute('id', 'hero-title');
  });

  it('retrato recortado é o LCP: prioridade alta, sem lazy, dimensões e alt', () => {
    render(<Hero {...props} />);
    const img = screen.getByRole('img', { name: assets.drDavidCutout.alt });
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).not.toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width', '853');
    expect(img).toHaveAttribute('height', '1280');
    expect(img.getAttribute('src')).toContain(encodeURIComponent('/images/dr-david-recorte.webp'));
  });

  it('pré-carrega uma única fonte de imagem com prioridade alta', () => {
    vi.mocked(ReactDOM.preload).mockClear();
    render(<Hero {...props} />);
    const calls = vi.mocked(ReactDOM.preload).mock.calls;
    expect(calls).toHaveLength(1);
    expect(calls[0]?.[1]).toMatchObject({ as: 'image', fetchPriority: 'high' });
  });

  it('CTA primário marcado para a barra fixa e com altura mínima', () => {
    render(<Hero {...props} />);
    const cta = screen.getByRole('link', { name: 'Agendar consulta' });
    expect(cta).toHaveAttribute('data-hero-cta');
    expect(cta).toHaveAttribute('href', '#agendar');
    expect(cta.className).toContain('min-h-12');
    expect(screen.getByRole('link', { name: 'Conhecer especialidades' })).toHaveAttribute('href', '#especialidades');
  });

  it('anéis e escala da lente são decorativos', () => {
    const { container } = render(<Hero {...props} />);
    const lens = container.querySelector('[data-lens]');
    expect(lens).not.toBeNull();
    expect(lens).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('[data-lens] circle[data-ring]').length).toBeGreaterThanOrEqual(6);
  });

  it('cartão do médico: nome, cargo e CRM em linhas próprias (sem meta com ponto)', () => {
    render(<Hero {...props} />);
    const card = screen.getByTestId('hero-doctor-card');
    expect(within(card).getByText('Dr. David Ribeiro de Mendonça Filho')).toBeInTheDocument();
    expect(within(card).getByText('Diretor Técnico')).toBeInTheDocument();
    expect(within(card).getByText('CRM/SP 00000')).toBeInTheDocument();
    expect(card.textContent).not.toContain('·');
  });

  it('provas vêm das props, em lista, com o número em destaque', () => {
    render(<Hero {...props} />);
    const list = screen.getByRole('list', { name: 'Números do CEMO' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(within(list).getByText('4,9').className).toContain('font-display');
    expect(within(list).getByText('nota no Google')).toBeInTheDocument();
  });

  it('sem eyebrow em caixa-alta', () => {
    render(<Hero {...props} />);
    expect(screen.getByText('Centro de Microcirurgia Ocular').className).not.toMatch(/uppercase/);
  });

  it('texto não depende de JS; o desenho dos anéis respeita movimento reduzido e não mexe na foto', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/home/Hero.tsx'), 'utf8');
    expect(source).not.toContain("'use client'");
    const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');
    const draw = css.indexOf('@keyframes lens-ring-draw');
    expect(draw).toBeGreaterThan(-1);
    expect(css.lastIndexOf('prefers-reduced-motion: no-preference', draw)).toBeGreaterThan(-1);
    const block = css.slice(draw, css.indexOf('}', css.indexOf('to', draw)) + 1);
    expect(block).toContain('stroke-dashoffset');
    expect(block).not.toContain('opacity');
  });
});
