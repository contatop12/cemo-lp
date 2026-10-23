// @vitest-environment node
// Gate de lançamento (docs/launch-checklist.md). Só roda com LAUNCH_CHECK=1 (`npm run launch:check`): em staging o
// conteúdo ainda está em revisão e o teste falharia por definição. Cada falha diz o que falta para ir ao ar.
import { content } from './index';

const enabled = process.env.LAUNCH_CHECK === '1';

describe.runIf(enabled)('gate de lançamento', () => {
  it('todo conteúdo médico publicado foi aprovado pelo médico revisor', async () => {
    const pending = [
      ...(await content.listSpecialties()),
      ...(await content.listExams()),
      ...(await content.listConditions()),
    ]
      .filter((e) => e.review.status !== 'APPROVED' && e.review.status !== 'PUBLISHED')
      .map((e) => `${e.id} (${e.review.status})`);
    expect(pending).toEqual([]);
  });

  it('números de prova social validados pela CEMO', async () => {
    const stats = await content.getSiteStats();
    expect({
      google: stats.googleRating.validated,
      anos: stats.yearsOfActivity.validated,
      atendimentos: stats.patientsServed.validated,
    }).toEqual({ google: true, anos: true, atendimentos: true });
  });

  it('link do perfil do Google configurado', async () => {
    const settings = await content.getSiteSettings();
    expect(settings.googleBusiness.reviewsUrl).toBeTruthy();
  });

  it('vídeos com falas revisadas pelo compliance (nenhum TODO pendente)', async () => {
    const pending = (await content.listVideos()).filter((v) => v.todos.length > 0).map((v) => v.id);
    expect(pending).toEqual([]);
  });

  it('build de produção com SITE_ENV=production e URL canônica', () => {
    expect(process.env.SITE_ENV).toBe('production');
    expect(process.env.NEXT_PUBLIC_SITE_URL).toBe('https://oftalmologiacemo.com.br');
  });
});

describe.runIf(!enabled)('gate de lançamento (desligado)', () => {
  it('roda só com LAUNCH_CHECK=1', () => {
    expect(enabled).toBe(false);
  });
});
