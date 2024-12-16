'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const TenantPendingView = dynamic(() =>
  import('../interface/tenant-approve.interface').then(
    (mod) => mod.TenantPendingView
  )
);

export const TenantPendingContainer = () => {
  const t = useTranslations('tenant-pending');
  return <TenantPendingView params={{ translations: t }} />;
};
