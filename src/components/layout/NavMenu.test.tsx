import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { navigation } from '@/content/navigation';
import { NavMenu } from './NavMenu';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

function setup() {
  const user = userEvent.setup();
  render(
    <div>
      <NavMenu groups={navigation} />
      <p>fora do menu</p>
    </div>,
  );
  return user;
}

describe('NavMenu', () => {
  it('botão do mega menu começa fechado e controla um painel existente', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Especialidades' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    const panelId = button.getAttribute('aria-controls');
    expect(panelId && document.getElementById(panelId)).toBeTruthy();
  });

  it('clique abre e mostra os links, inclusive "Ver todas"', async () => {
    const user = setup();
    const button = screen.getByRole('button', { name: 'Especialidades' });
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('link', { name: 'Catarata' })).toHaveAttribute('href', '/especialidades/catarata/');
    expect(screen.getByRole('link', { name: 'Ver todas as especialidades' })).toHaveAttribute('href', '/especialidades/');
  });

  it('Enter abre; Escape fecha e devolve o foco ao botão', async () => {
    const user = setup();
    const button = screen.getByRole('button', { name: 'Exames' });
    button.focus();
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('ArrowDown no botão abre e foca o primeiro link', async () => {
    const user = setup();
    const button = screen.getByRole('button', { name: 'Exames' });
    button.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('link', { name: 'Mapeamento de Retina' })).toHaveFocus();
  });

  it('clicar fora fecha', async () => {
    const user = setup();
    const button = screen.getByRole('button', { name: 'Especialidades' });
    await user.click(button);
    await user.click(screen.getByText('fora do menu'));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('abrir outro grupo fecha o anterior', async () => {
    const user = setup();
    const a = screen.getByRole('button', { name: 'Especialidades' });
    const b = screen.getByRole('button', { name: 'Exames' });
    await user.click(a);
    await user.click(b);
    expect(a).toHaveAttribute('aria-expanded', 'false');
    expect(b).toHaveAttribute('aria-expanded', 'true');
  });

  it('procedimentos não publicados não aparecem', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Cirurgias e Tratamentos' }));
    expect(screen.queryByRole('link', { name: 'Crosslinking Corneano' })).toBeNull();
    expect(screen.getByRole('link', { name: 'Cirurgia de Catarata' })).toBeInTheDocument();
  });

  it('grupo do tipo link é um <a> simples', () => {
    setup();
    expect(screen.getByRole('link', { name: 'Corpo Clínico' })).toHaveAttribute('href', '/corpo-clinico/');
    expect(screen.queryByRole('button', { name: 'Corpo Clínico' })).toBeNull();
  });
});
