import { render, screen, within } from '@testing-library/react';
import { doctors } from '@/content/fixtures/doctors';
import { siteSettings } from '@/content/fixtures/site-settings';
import { navigation } from '@/content/navigation';
import { formatHoursLines, telHref, whatsappHref } from '@/lib/contact';
import { Footer } from './Footer';

const david = doctors.find((d) => d.slug === siteSettings.technicalResponsibleSlug) ?? null;

function renderFooter() {
  return render(<Footer settings={siteSettings} navigation={navigation} technicalResponsible={david} />);
}

describe('Footer', () => {
  it('NAP vindo das configurações', () => {
    renderFooter();
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(new RegExp(siteSettings.address.streetAddress))).toBeInTheDocument();
    expect(within(footer).getAllByRole('link').some((a) => a.getAttribute('href') === telHref(siteSettings))).toBe(true);
    expect(within(footer).getAllByRole('link').some((a) => a.getAttribute('href') === whatsappHref(siteSettings))).toBe(true);
    expect(within(footer).getByRole('link', { name: siteSettings.email })).toHaveAttribute('href', `mailto:${siteSettings.email}`);
    for (const line of formatHoursLines(siteSettings)) expect(within(footer).getByText(line)).toBeInTheDocument();
  });

  it('colunas de navegação', () => {
    renderFooter();
    for (const heading of ['CEMO', 'Especialidades', 'Exames', 'Condições e conteúdos']) {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    }
    const especialidades = screen.getByRole('heading', { name: 'Especialidades' }).parentElement!;
    expect(within(especialidades).getAllByRole('link')).toHaveLength(9);
    expect(screen.getByRole('link', { name: 'Todos os exames' })).toHaveAttribute('href', '/exames/');
  });

  it('responsável técnico vem do repositório', () => {
    renderFooter();
    expect(screen.getByText(`Responsável técnico: ${david!.honorific} ${david!.name} — ${david!.crm}`)).toBeInTheDocument();
  });

  it('links legais, crédito e externos seguros', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: 'Política de privacidade' })).toHaveAttribute('href', '/privacidade/');
    expect(screen.getByRole('link', { name: 'Política de cookies' })).toHaveAttribute('href', '/cookies/');
    expect(screen.getByText('Desenvolvido por P12 Digital')).toBeInTheDocument();
    for (const a of screen.getAllByRole('link').filter((l) => l.getAttribute('href')?.startsWith('https://'))) {
      expect(a.getAttribute('rel')).toContain('noopener');
    }
  });

  it('nenhum texto menor que 16px (sem text-xs/text-sm)', () => {
    const { container } = renderFooter();
    expect(container.innerHTML).not.toMatch(/\btext-(xs|sm)\b/);
  });
});
