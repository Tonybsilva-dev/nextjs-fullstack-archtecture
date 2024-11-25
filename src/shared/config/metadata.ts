import { Metadata } from 'next';

export const metadataConfig: Metadata = {
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
  twitter: {
    card: 'summary_large_image',
    site: '@tonybsilvadev',
    creator: '@antonio_silva',
    title: 'Fullstack Architecture',
    description: 'Antonio Silva Fullstack Architecture',
    images: ['https://i.imgur.com/DaTIIDq.png'],
  },
  openGraph: {
    type: 'website',
    siteName: 'Fullstack Archtecture',
    url: 'https://as-fullstack-archtecture.vercel.app/',
    title: 'Fullstack Architecture',
    description: 'Antonio S - Fullstack Archtecture with NextJS',
    images: [
      {
        url: 'https://i.imgur.com/DaTIIDq.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Architecture',
      },
    ],
  },
};
