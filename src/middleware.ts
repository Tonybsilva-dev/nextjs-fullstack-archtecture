import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = req.nextUrl.locale || 'pt';

  // Token do next-auth (verifica autenticação)
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const role = token?.role;
  const tenantStatus = token?.context?.tenant?.status;
  const companyId = token?.context?.company?.id;

  if (isLoggedIn) {
    if (role === 'ADMIN') {
      if (tenantStatus === 'PENDING') {
        // Redireciona caso o caminho atual não seja o pending status
        const pendingPath = `/${locale}/admin/store/status/pending`;
        if (!pathname.startsWith(pendingPath)) {
          return NextResponse.redirect(
            new URL(pendingPath, req.nextUrl.origin)
          );
        }
      } else if (tenantStatus === 'APPROVED') {
        if (!companyId) {
          const setupPath = `/${locale}/setup`;
          if (!pathname.startsWith(setupPath)) {
            return NextResponse.redirect(
              new URL(setupPath, req.nextUrl.origin)
            );
          }
        } else {
          // Se já existe companyId, garante que o admin vá pro dashboard
          const adminDashboardPath = `/${locale}/admin/dashboard`;
          if (!pathname.startsWith(adminDashboardPath)) {
            return NextResponse.redirect(
              new URL(adminDashboardPath, req.nextUrl.origin)
            );
          }
        }
      }
    } else if (role === 'CUSTOMER') {
      const customerDashboardPath = `/${locale}/customer/dashboard`;
      if (!pathname.startsWith(customerDashboardPath)) {
        return NextResponse.redirect(
          new URL(customerDashboardPath, req.nextUrl.origin)
        );
      }
    } else {
      // Caso logado mas sem role definida
      return NextResponse.redirect(new URL(`/${locale}/`, req.nextUrl.origin));
    }
  } else {
    // Não logado
    return NextResponse.redirect(new URL(`/${locale}/`, req.nextUrl.origin));
  }

  // Se nenhuma regra de redirecionamento acima foi acionada,
  // tenta a lógica do middleware de internacionalização
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
