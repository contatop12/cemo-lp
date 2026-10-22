// @vitest-environment node
import { absoluteUrl, buildMetadata } from './metadata';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://oftalmologiacemo.com.br');
});
afterEach(() => vi.unstubAllEnvs());

const base = {
  title: 'Clínica de Oftalmologia em Taboão da Serra',
  description: 'Consulta, exames, tratamentos e cirurgias.',
  path: '/',
};

describe('buildMetadata', () => {
  it('título único com sufixo " | CEMO"', () => {
    expect(buildMetadata(base).title).toEqual({ absolute: 'Clínica de Oftalmologia em Taboão da Serra | CEMO' });
  });

  it('não duplica o sufixo', () => {
    expect(buildMetadata({ ...base, title: 'Contato | CEMO' }).title).toEqual({ absolute: 'Contato | CEMO' });
  });

  it('canonical absoluto com barra final', () => {
    const meta = buildMetadata({ ...base, path: '/especialidades/catarata/' });
    expect(meta.alternates?.canonical).toBe('https://oftalmologiacemo.com.br/especialidades/catarata/');
  });

  it('OpenGraph em pt_BR com siteName CEMO', () => {
    const og = buildMetadata(base).openGraph as Record<string, unknown>;
    expect(og).toMatchObject({ type: 'website', locale: 'pt_BR', siteName: 'CEMO', url: 'https://oftalmologiacemo.com.br/' });
  });

  it('noindex mantém follow', () => {
    expect(buildMetadata({ ...base, noindex: true }).robots).toEqual({ index: false, follow: true });
  });

  it('absoluteUrl junta a URL do site e o caminho', () => {
    expect(absoluteUrl('/obrigado/')).toBe('https://oftalmologiacemo.com.br/obrigado/');
  });
});
