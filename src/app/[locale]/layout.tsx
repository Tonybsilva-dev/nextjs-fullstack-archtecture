import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { metadataConfig } from '@/shared/config/metadata';
import { FeedbackWidget } from '@/shared/modules/components/custom/Feedback';
import { Toaster } from '@/shared/modules/components/ui/sonner';
import AuthProvider from '@/shared/modules/providers/auth-provider';

export const metadata: Metadata = metadataConfig;

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
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <main>
              {children}
              <FeedbackWidget />
            </main>
          </AuthProvider>
          <Toaster richColors position="top-right" />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
