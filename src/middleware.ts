import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Token do next-auth (verifica autenticação)
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const role = token?.role || 'CUSTOMER';
  const company = token?.context?.company; // Inclui status da loja no contexto
  const tenant = token?.context.tenant;
  const locale = req.nextUrl.locale || 'pt';

  if (role === 'ADMIN' && isLoggedIn) {
    if (!company?.id && tenant?.status === 'PENDING') {
      const statusPath = `/${locale}/admin/store/status/pending`;
      if (!pathname.startsWith(statusPath)) {
        return NextResponse.redirect(new URL(statusPath, req.nextUrl.origin));
      }
    } else if (!company?.id && tenant?.status === 'APPROVED') {
      const setupPath = `/${locale}/setup`;
      if (!pathname.startsWith(setupPath)) {
        return NextResponse.redirect(new URL(setupPath, req.nextUrl.origin));
      }
    }
  }

  // Redirecionamento para ADMIN logado
  if (pathname === '/' && isLoggedIn && role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  if (pathname.startsWith('/dashboard') && isLoggedIn && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/catalog', req.url));
  }

  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  return NextResponse.next();
}

// Configuração do matcher
export const config = {
  matcher: [
    '/', // Página inicial
    '/(pt|en|es)/:path*',
    '/dashboard/:path*',
    '/catalog/:path*',
    '/setup/:path*',
    '/admin/store/status/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
