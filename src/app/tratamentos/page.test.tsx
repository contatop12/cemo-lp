import { render, screen, within } from '@testing-library/react';
import type { ComponentProps, ReactElement } from 'react';
import { HubPage } from '@/components/templates/HubPage';
import TratamentosPage from './page';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => '/tratamentos/' }));

describe('/tratamentos/', () => {
  it('separa cirurgias dos procedimentos a laser não cirúrgicos (ajustes 23/10)', async () => {
    // HubPage é Server Component assíncrono: resolve antes de renderizar.
    const page = (await TratamentosPage()) as ReactElement<ComponentProps<typeof HubPage>>;
    render(<main>{await HubPage(page.props)}</main>);
    const hrefs = (title: string) =>
      within(screen.getByRole('region', { name: title }))
        .getAllByRole('link')
        .map((a) => a.getAttribute('href'));
    expect(hrefs('Cirurgias')).toEqual([
      '/especialidades/catarata/',
      '/especialidades/refrativa/',
      '/tratamentos/pterigio/',
      '/tratamentos/calazio/',
      '/especialidades/plastica-ocular/',
    ]);
    expect(hrefs('Procedimentos a laser, sem corte')).toEqual(['/tratamentos/yag-laser/', '/tratamentos/fotocoagulacao-a-laser/']);
    expect(hrefs('Acompanhamento e tratamento')).toEqual(['/especialidades/glaucoma/', '/especialidades/retina/']);
  });
});
