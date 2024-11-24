import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';

export const metadata: Metadata = {
  title: {
    template: '%s | Fullstack Archtecture',
    default: 'Fullstack Archtecture',
  },
  description: 'Antonio Silva Fullstack Archtecture',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon-96x96.png',
        sizes: '96x96',
        url: '#',
      },
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', url: '#' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Antonio S',
  },
};

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as 'pt' | 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${ubuntu.className} antialiased`}>
        <main>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
