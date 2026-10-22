import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { siteSettings } from '@/content/fixtures/site-settings';
import { navigation } from '@/content/navigation';
import { whatsappHref } from '@/lib/contact';
import { MobileNav } from './MobileNav';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

function setup() {
  const user = userEvent.setup();
  render(
    <div id="app-root">
      <MobileNav groups={navigation} settings={siteSettings} />
      <a href="/x/">conteúdo da página</a>
    </div>,
  );
  return user;
}

afterEach(() => {
  document.documentElement.style.overflow = '';
});

describe('MobileNav', () => {
  it('botão "Menu" com rótulo visível começa fechado', () => {
    setup();
    const button = screen.getByRole('button', { name: 'Menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button.className).toContain('min-h-12');
  });

  it('abrir leva o foco ao diálogo, aplica inert e trava a rolagem', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.getElementById('app-root')).toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.getElementById('app-root')?.contains(dialog)).toBe(false);
  });

  it('Tab e Shift+Tab ficam presos dentro do diálogo', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    for (let i = 0; i < 25; i++) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    for (let i = 0; i < 5; i++) {
      await user.tab({ shift: true });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it('Escape fecha, desfaz inert/trava e devolve o foco ao botão', async () => {
    const user = setup();
    const button = screen.getByRole('button', { name: 'Menu' });
    await user.click(button);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.getElementById('app-root')).not.toHaveAttribute('inert');
    expect(document.documentElement.style.overflow).toBe('');
    expect(button).toHaveFocus();
  });

  it('grupos em acordeão com "Ver todas", WhatsApp no topo e itens não publicados ocultos', async () => {
    const user = setup();
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(within(dialog).getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', whatsappHref(siteSettings));
    const especialidades = within(dialog).getByRole('button', { name: 'Especialidades' });
    expect(especialidades).toHaveAttribute('aria-expanded', 'false');
    await user.click(especialidades);
    expect(especialidades).toHaveAttribute('aria-expanded', 'true');
    expect(within(dialog).getByRole('link', { name: 'Ver todas as especialidades' })).toHaveAttribute('href', '/especialidades/');
    await user.click(within(dialog).getByRole('button', { name: 'Cirurgias e Tratamentos' }));
    expect(within(dialog).queryByRole('link', { name: 'Crosslinking Corneano' })).toBeNull();
  });
});
