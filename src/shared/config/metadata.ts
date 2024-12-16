import { Metadata } from 'next';

export const metadataConfig: Metadata = {
  title: {
    template: '%s | Tempero Tech',
    default: 'Tempero Tech',
  },
  description: 'Antonio Silva Tempero Tech',
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
  twitter: {
    card: 'summary_large_image',
    site: '@tonybsilvadev',
    creator: '@antonio_silva',
    title: 'Tempero Tech',
    description: 'Antonio Silva Tempero Tech',
    images: ['https://i.imgur.com/DaTIIDq.png'],
  },
  openGraph: {
    type: 'website',
    siteName: 'Tempero Tech',
    url: 'https://as-fullstack-archtecture.vercel.app/',
    title: 'Tempero Tech',
    description: 'Tempero Tech',
    images: [
      {
        url: 'https://i.imgur.com/DaTIIDq.png',
        width: 1200,
        height: 630,
        alt: 'Tempero Tech',
      },
    ],
  },
};
