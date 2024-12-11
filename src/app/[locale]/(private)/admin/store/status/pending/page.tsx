import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pending approval',
};

export { TenantPendingContainer as default } from '@/subdomains/(private)/(admin)/store/status/pending/container/tenant-approve.container';
