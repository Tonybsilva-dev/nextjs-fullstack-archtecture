'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const RequestDemoView = dynamic(() =>
  import('../interface/request-demo.interface').then(
    (mod) => mod.RequestDemoView
  )
);

export const RequestDemoContainer = () => {
  const t = useTranslations('request-demo');
  return <RequestDemoView params={{ translations: t }} />;
};
