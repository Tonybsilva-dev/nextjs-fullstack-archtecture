import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request demonstration',
};

export { RequestDemoContainer as default } from '@/subdomains/(public)/request-demo/container/request-demo.container';
