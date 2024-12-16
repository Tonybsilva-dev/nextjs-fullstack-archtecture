'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SetupCompanyView = dynamic(() =>
  import('../interface/setup-company.interface').then(
    (mod) => mod.SetupCompanyView
  )
);

export const SetupCompanyContainer = () => {
  const t = useTranslations('setup-company');
  const router = useRouter();
  return <SetupCompanyView params={{ translations: t }} router={router} />;
};
