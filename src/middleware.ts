import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware({
  ...routing,
});

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = cookies();
  const localeFromCookies = cookieStore.get('NEXT_LOCALE');

  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const role = token?.role || 'CUSTOMER';
  const company = token?.context?.company;
  const tenant = token?.context.tenant;
  const locale = localeFromCookies?.value;

  console.log('Locale:', locale);
  console.log('Pathname:', pathname);
  console.log('Is Logged In:', isLoggedIn);
  console.log('Role:', role);
  console.log('Tenant Status:', tenant?.status);

  const protectedPaths = [
    `/${locale}/admin`,
    `/${locale}/customer`,
    `/${locale}/manager`,
  ];

  const loginPath = `/${locale}/sign-in`;

  const isProtectedPath = protectedPaths.some((protectedPath) =>
    pathname.startsWith(protectedPath)
  );

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL(loginPath, req.nextUrl.origin));
  }

  if (isLoggedIn && role === 'ADMIN') {
    const pendingPath = `/${locale}/admin/dashboard/company/status/pending`;
    const rejectedPath = `/${locale}/admin/dashboard/company/status/rejected`;
    const setupPath = `/${locale}/admin/dashboard/company/setup`;
    const dashboardPath = `/${locale}/admin/dashboard`;

    // Admin tenant status checks
    if (tenant?.status === 'PENDING' && pathname !== pendingPath) {
      return NextResponse.redirect(new URL(pendingPath, req.nextUrl.origin));
    }

    if (tenant?.status === 'REJECTED' && pathname !== rejectedPath) {
      return NextResponse.redirect(new URL(rejectedPath, req.nextUrl.origin));
    }

    if (
      !company?.id &&
      tenant?.status === 'APPROVED' &&
      pathname !== setupPath &&
      token
    ) {
      return NextResponse.redirect(new URL(setupPath, req.nextUrl.origin));
    }

    if (tenant?.status === 'APPROVED' && company?.id) {
      // Permita acesso a todas as rotas em /admin/*
      if (pathname.startsWith(`/${locale}/admin`)) {
        return NextResponse.next();
      }

      // Redirecione para o dashboard caso esteja acessando fora de /admin/*
      if (pathname !== dashboardPath) {
        return NextResponse.redirect(
          new URL(dashboardPath, req.nextUrl.origin)
        );
      }
    }
  }
  if (isLoggedIn && role === 'CUSTOMER') {
    const dashboardPath = `/${locale}/customer/dashboard`;
    // Permitir acesso a rotas de customer
    if (pathname.startsWith(`/${locale}/customer`)) {
      return NextResponse.next();
    }
    // Redirecionar para o dashboard caso esteja acessando fora de /customer/*
    if (pathname !== dashboardPath) {
      return NextResponse.redirect(new URL(dashboardPath, req.nextUrl.origin));
    }
  }
  // **4. Middleware para internacionalização**
  return intlMiddleware(req) || NextResponse.next();
}

// Configuração do matcher
export const config = {
  matcher: [
    '/', // Página inicial
    '/(pt|en|es)/:path*',
    '/dashboard/:path*',
    '/catalog/:path*',
    '/admin/dashboard/company/setup/:path*',
    '/admin/dashboard/company/status/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
