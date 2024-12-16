import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
};

export { HomeContainer as default } from '@/subdomains/(public)/home/container/home.container';
