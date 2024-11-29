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
  const storeId = token?.context?.storeId;

  // Caso seja OWNER e não tenha uma loja, redirecionar para a página de Setup
  if (role === 'OWNER' && !storeId && !pathname.startsWith('/setup')) {
    return NextResponse.redirect(new URL('/setup', req.url));
  }

  // Redirecionamento para OWNER logado
  if (pathname === '/' && isLoggedIn && role === 'OWNER') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (pathname.startsWith('/dashboard') && isLoggedIn && role !== 'OWNER') {
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(pt|en|es)/:path*'],
// };
