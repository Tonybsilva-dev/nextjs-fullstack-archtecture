import './globals.css';

import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

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
  display: 'swap', // Controla o comportamento de carregamento da fonte
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.className} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
