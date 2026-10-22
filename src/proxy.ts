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
    // Só www.<host do site> → apex. HTTP → HTTPS fica com a hospedagem + HSTS: decidir por
    // x-forwarded-proto geraria loop atrás de proxies TLS que não enviam o header (next start assume http).
    const site = new URL(getSiteUrl());
    const host = request.headers.get('host') ?? '';
    if (host === `www.${site.host}`) {
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
