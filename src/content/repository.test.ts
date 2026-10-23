// @vitest-environment node
import { content } from './index';
import { LEAD_INTEREST_IDS } from './types';

const TODO_PREFIX = 'TODO_CONTENT_VALIDATION:';

describe('content repository (fixtures)', () => {
  it('lista os 8 médicos publicados com Dr. David primeiro', async () => {
    const doctors = await content.listDoctors();
    expect(doctors).toHaveLength(8);
    const [first] = doctors;
    expect(first?.slug).toBe('david-ribeiro-de-mendonca-filho');
    expect(first?.role).toBe('Diretor Técnico');
    expect(first?.crm).toBe('CRM/SP 98339');
    expect(first?.featured).toBe(true);
    expect(new Set(doctors.map((d) => d.crm)).size).toBe(8);
    for (const d of doctors) {
      expect(d.rqe).toBeNull();
      expect(d.canonicalPath).toBe(`/corpo-clinico/${d.slug}/`);
      expect(d.published).toBe(true);
      expect(d.photo?.src).toBe(`/images/medicos/${d.slug}.webp`);
      expect(d.bio.length).toBeGreaterThan(0);
      expect(d.todos.length).toBeGreaterThan(0);
    }
  });

  it('encontra médico por slug e devolve null para slug desconhecido', async () => {
    expect((await content.getDoctorBySlug('adriana-bizzarri'))?.crm).toBe('CRM/SP 91030');
    expect(await content.getDoctorBySlug('nao-existe')).toBeNull();
  });

  it('lista os 8 serviços da Home na ordem e com as URLs canônicas', async () => {
    const services = await content.listServices();
    expect(services.map((s) => s.href)).toEqual([
      '/especialidades/catarata/',
      '/especialidades/refrativa/',
      '/consulta-oftalmologica/',
      '/especialidades/retina/',
      '/especialidades/glaucoma/',
      '/especialidades/cornea/',
      '/especialidades/oftalmopediatria/',
      '/exames/',
    ]);
    expect(services.map((s) => s.homeOrder)).toEqual([...services.map((s) => s.homeOrder)].sort((a, b) => a - b));
  });

  it('lista as 13 opções de interesse do formulário', async () => {
    const interests = await content.listLeadInterests();
    expect(interests.map((i) => i.id)).toEqual([...LEAD_INTEREST_IDS]);
    expect(interests.find((i) => i.id === 'cornea')?.label).toBe('Córnea / Ceratocone');
  });

  it('lista os 16 convênios identificados', async () => {
    const plans = await content.listInsurancePlans();
    expect(plans.map((p) => p.name)).toEqual([
      'Allianz',
      'Amil',
      'Bradesco Saúde',
      'CAASP',
      'Cassi',
      'CNEN',
      'Economus',
      'Mediservice',
      'Notre Dame Intermédica',
      'Porto Seguro',
      'Postal Saúde',
      'Saúde Caixa',
      'Saúde Itaú',
      'Unimed Seguros',
      'Vivest',
      'Dr. Consulta',
    ]);
  });

  it('não tem depoimentos inventados', async () => {
    expect(await content.listTestimonials()).toEqual([]);
  });

  it('números de prova social existem mas não estão validados', async () => {
    const stats = await content.getSiteStats();
    expect(stats.googleRating.validated).toBe(false);
    expect(stats.yearsOfActivity.validated).toBe(false);
    expect(stats.patientsServed.validated).toBe(false);
    expect(stats.todos.length).toBeGreaterThan(0);
  });

  it('NAP central com valores exatos', async () => {
    const s = await content.getSiteSettings();
    expect(s.phone.e164).toBe('+551147883536');
    expect(s.whatsapp.digits).toBe('5511947016162');
    expect(s.address.postalCode).toBe('06763-170');
    expect(s.hours).toEqual([
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '18:00' },
      { days: ['Friday'], opens: '08:00', closes: '17:00' },
      { days: ['Saturday'], opens: '08:00', closes: '12:00' },
    ]);
  });

  it('vídeos: versão web local, pôster, duração e transcrição; legenda WebVTT ou legenda aberta', async () => {
    const videos = await content.listVideos();
    expect(videos.length).toBe(9);
    for (const v of videos) {
      expect(v.src).toBe(`/v/${v.id}.mp4`); // rota com suporte a Range, lida do R2 (src/app/v/[file])
      expect(v.srcAv1).toBe(`/v/${v.id}.webm`);
      expect(v.poster.src).toMatch(/-poster\.jpg$/);
      expect(v.durationSeconds).toBeGreaterThan(0);
      expect(v.transcript.length).toBeGreaterThan(0);
      expect(v.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (v.captionsSrc) expect(v.captionsSrc).toBe(`/videos/${v.id}.vtt`);
    }
    await expect(content.getVideo('nao-existe')).rejects.toThrow();
  });

  it('editoriais de Catarata e Refrativa existem e pedem revisão médica', async () => {
    for (const id of ['catarata', 'refrativa'] as const) {
      const e = await content.getEditorial(id);
      expect(e.paragraphs.length).toBeGreaterThan(0);
      expect(e.todos).toContain('TODO_CONTENT_VALIDATION: revisão médica do texto');
    }
  });

  it('artigos em destaque com URLs preservadas (barra inicial e final)', async () => {
    const articles = await content.listFeaturedArticles(3);
    expect(articles).toHaveLength(3);
    for (const a of articles) expect(a.href).toMatch(/^\/.+\/$/);
  });

  it('todo TODO de todas as entidades usa o prefixo padrão', async () => {
    const todos = [
      ...(await content.getSiteSettings()).todos,
      ...(await content.getSiteStats()).todos,
      ...(await content.listDoctors()).flatMap((d) => d.todos),
      ...(await content.listInsurancePlans()).flatMap((p) => p.todos),
      ...(await content.listVideos()).flatMap((v) => v.todos),
      ...(await content.getEditorial('catarata')).todos,
      ...(await content.getEditorial('refrativa')).todos,
      ...(await content.listEquipment()).flatMap((e) => e.todos),
    ];
    expect(todos.length).toBeGreaterThan(0);
    for (const t of todos) expect(t.startsWith(TODO_PREFIX)).toBe(true);
  });
});
