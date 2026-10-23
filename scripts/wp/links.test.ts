// @vitest-environment node
import { classifyHref } from './links.mjs';

const tables = { redirects: { '/tudo-sobre-glaucoma/': '/especialidades/glaucoma/' }, gone: new Set(['/tag/x/']) };

describe('classifyHref (links do HTML migrado)', () => {
  it.each(['javascript:alert(1)', 'JaVaScRiPt:alert(1)', ' javascript:alert(1)', 'data:text/html,<script>1</script>', 'vbscript:msgbox(1)'])(
    'protocolo perigoso vira texto: %s',
    (href) => {
      expect(classifyHref(href, tables)).toEqual({ kind: 'unlink' });
    },
  );

  it('sem href ou só "#": texto', () => {
    expect(classifyHref(null, tables)).toEqual({ kind: 'unlink' });
    expect(classifyHref('', tables)).toEqual({ kind: 'unlink' });
    expect(classifyHref('#', tables)).toEqual({ kind: 'unlink' });
  });

  it('âncora na própria página continua âncora (não vira link para a Home)', () => {
    expect(classifyHref('#sintomas', tables)).toEqual({ kind: 'anchor', href: '#sintomas' });
  });

  it('interno: destino final do mapa, permalink por data e 410 viram o que devem', () => {
    expect(classifyHref('https://oftalmologiacemo.com.br/tudo-sobre-glaucoma', tables)).toEqual({ kind: 'internal', href: '/especialidades/glaucoma/' });
    expect(classifyHref('/2022/11/28/prazo-para-descartar-lente-de-contato/', tables)).toEqual({ kind: 'internal', href: '/prazo-para-descartar-lente-de-contato/' });
    expect(classifyHref('https://oftalmologiacemo.com.br/tag/x/', tables)).toEqual({ kind: 'unlink' });
  });

  it('externo http(s), e-mail e telefone continuam links', () => {
    expect(classifyHref('https://www.cbo.net.br/', tables)).toEqual({ kind: 'external', href: 'https://www.cbo.net.br/' });
    expect(classifyHref('mailto:sac@exemplo.com', tables)).toEqual({ kind: 'contact', href: 'mailto:sac@exemplo.com' });
    expect(classifyHref('tel:+5511000000000', tables)).toEqual({ kind: 'contact', href: 'tel:+5511000000000' });
  });
});
