import { render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ReactDOM from 'react-dom';
import { assets } from '@/content/assets';
import { Hero, type HeroProps } from './Hero';

vi.mock('react-dom', async (importOriginal) => ({ ...(await importOriginal<typeof import('react-dom')>()), preload: vi.fn() }));

const props: HeroProps = {
  eyebrow: 'CEMO • Centro de Microcirurgia Ocular',
  headline: 'Clínica de Oftalmologia em Taboão da Serra',
  lead: 'Consulta, exames, tratamentos e cirurgias oftalmológicas, com equipe médica e estrutura reunidas em um só lugar, em Taboão da Serra.',
  primaryCta: { label: 'Agendar consulta', href: '#agendar' },
  secondaryCta: { label: 'Conhecer especialidades', href: '#especialidades' },
  proof: [
    { id: 'google', text: 'nota no Google' },
    { id: 'anos', text: 'anos de atividade' },
  ],
  doctor: {
    name: 'Dr. David Ribeiro de Mendonça Filho',
    role: 'Diretor Técnico',
    crm: 'CRM/SP 00000',
    image: assets.drDavid,
    mobileImage: assets.drDavidMobile,
  },
};

describe('Hero', () => {
  it('tem um único h1 com o texto exato', () => {
    render(<Hero {...props} />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Clínica de Oftalmologia em Taboão da Serra');
    expect(h1s[0]).toHaveAttribute('id', 'hero-title');
  });

  it('foto é LCP: prioridade alta, sem lazy, dimensões e alt', () => {
    render(<Hero {...props} />);
    const img = screen.getByRole('img', { name: assets.drDavid.alt });
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).not.toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
  });

  it('<picture> com fonte desktop (original) e img padrão no recorte mobile', () => {
    const { container } = render(<Hero {...props} />);
    const source = container.querySelector('picture source[media="(min-width: 1024px)"]');
    expect(source?.getAttribute('srcset')).toContain(encodeURIComponent('/images/dr-david.jpg'));
    const img = container.querySelector('picture img');
    expect(img?.getAttribute('src')).toContain(encodeURIComponent('/images/dr-david-mobile.jpg'));
  });

  it('pré-carrega as duas fontes com prioridade alta', () => {
    vi.mocked(ReactDOM.preload).mockClear();
    render(<Hero {...props} />);
    const calls = vi.mocked(ReactDOM.preload).mock.calls;
    expect(calls).toHaveLength(2);
    for (const [, options] of calls) expect(options).toMatchObject({ as: 'image', fetchPriority: 'high' });
    expect(calls.map(([, o]) => o?.media)).toEqual(['(min-width: 1024px)', '(max-width: 1023.98px)']);
  });

  it('CTA primário marcado para a barra fixa e com altura mínima', () => {
    render(<Hero {...props} />);
    const cta = screen.getByRole('link', { name: 'Agendar consulta' });
    expect(cta).toHaveAttribute('data-hero-cta');
    expect(cta).toHaveAttribute('href', '#agendar');
    expect(cta.className).toContain('min-h-[3.25rem]');
    expect(screen.getByRole('link', { name: 'Conhecer especialidades' })).toHaveAttribute('href', '#especialidades');
  });

  it('mira é decorativa e só aparece no desktop', () => {
    const { container } = render(<Hero {...props} />);
    const reticle = container.querySelector('[data-reticle]');
    expect(reticle).toHaveAttribute('aria-hidden', 'true');
    expect(reticle?.getAttribute('class')).toMatch(/\bhidden\b.*\blg:block\b/);
  });

  it('cartão-nome e provas vindos das props', () => {
    render(<Hero {...props} />);
    expect(screen.getAllByText('Dr. David Ribeiro de Mendonça Filho').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Diretor Técnico · CRM\/SP 00000/).length).toBeGreaterThan(0);
    expect(screen.getByText('nota no Google')).toBeInTheDocument();
  });

  it('texto não depende de JS e a foto não anima opacidade', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/home/Hero.tsx'), 'utf8');
    expect(source).not.toContain("'use client'");
    const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');
    const heroRise = css.indexOf('@keyframes hero-rise');
    const guard = css.lastIndexOf('prefers-reduced-motion: no-preference', heroRise);
    expect(heroRise).toBeGreaterThan(-1);
    expect(guard).toBeGreaterThan(-1);
    expect(css.slice(heroRise, css.indexOf('}', css.indexOf('to', heroRise)))).not.toContain('opacity');
  });
});
