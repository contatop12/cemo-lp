import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { Section } from './Section';
import { SkipLink } from './SkipLink';
import { Container } from './Container';
import { Reticle, StarIcon, WhatsappIcon } from './icons';

describe('Button', () => {
  it('com href renderiza um link', () => {
    render(<Button href="/consulta-oftalmologica/">Agendar</Button>);
    const link = screen.getByRole('link', { name: 'Agendar' });
    expect(link).toHaveAttribute('href', '/consulta-oftalmologica/');
  });

  it('sem href renderiza button type="button" por padrão', () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'button');
  });

  it('respeita type="submit"', () => {
    render(<Button type="submit">Enviar</Button>);
    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit');
  });

  it('tem altura mínima de 52px', () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole('button').className).toContain('min-h-[3.25rem]');
  });

  it('variante whatsapp usa a cor acessível do WhatsApp', () => {
    render(<Button variant="whatsapp" href="https://wa.me/5511947016162">Falar no WhatsApp</Button>);
    expect(screen.getByRole('link').className).toContain('bg-whatsapp');
  });
});

describe('SkipLink', () => {
  it('aponta para #conteudo', () => {
    render(<SkipLink />);
    expect(screen.getByRole('link', { name: 'Ir para o conteúdo' })).toHaveAttribute('href', '#conteudo');
  });
});

describe('Section', () => {
  it('tom escuro aplica on-dark e associa o título', () => {
    const { container } = render(
      <Section tone="escuro" labelledBy="t">
        <h2 id="t">Título</h2>
      </Section>,
    );
    const section = container.querySelector('section');
    expect(section).toHaveClass('on-dark');
    expect(section).toHaveAttribute('aria-labelledby', 't');
  });
});

describe('Container', () => {
  it('renderiza com o tamanho padrão do site', () => {
    const { container } = render(<Container>conteúdo</Container>);
    expect(container.firstElementChild?.className).toContain('max-w-site');
  });
});

describe('ícones', () => {
  it('são decorativos (aria-hidden)', () => {
    const { container } = render(
      <>
        <WhatsappIcon />
        <StarIcon filled />
        <Reticle />
      </>,
    );
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(3);
    svgs.forEach((svg) => expect(svg).toHaveAttribute('aria-hidden', 'true'));
  });
});
