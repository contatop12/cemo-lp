import { NextResponse, type NextRequest } from 'next/server';
import { getSiteEnv, getSiteUrl } from '@/lib/env';
import { resolveRedirect } from '@/lib/redirects/resolve';

// Next 16: "proxy" substitui o antigo middleware. Aplica o mapa de migração (301/410) e, em produção,
// a canonicalização de host/protocolo — tudo num único salto.
export function proxy(request: NextRequest): NextResponse {
  const { pathname, search } = request.nextUrl;
  const decision = resolveRedirect({ pathname, search });

  if (decision.kind === 'gone') {
    return new NextResponse('<!doctype html><html lang="pt-BR"><title>Página removida | CEMO</title><p>Esta página foi removida.</p></html>', {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  if (getSiteEnv() === 'production') {
    // Só redireciona quando o destino é de fato outro: www.<host do site> → apex, ou http → https quando o
    // site configurado é https. Nunca para a mesma URL (evita loop com proxies que enviam x-forwarded-proto=http).
    const site = new URL(getSiteUrl());
    const host = request.headers.get('host') ?? '';
    const proto = request.headers.get('x-forwarded-proto');
    const wrongHost = host === `www.${site.host}`;
    const wrongProto = site.protocol === 'https:' && proto === 'http';
    if (wrongHost || wrongProto) {
      const location = decision.kind === 'redirect' ? decision.location : `${pathname}${search}`;
      return NextResponse.redirect(new URL(location, getSiteUrl()), 301);
    }
  }

  if (decision.kind === 'redirect') {
    return NextResponse.redirect(new URL(decision.location, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
