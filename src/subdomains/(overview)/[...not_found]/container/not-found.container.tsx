'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const NotFoundView = dynamic(() =>
  import('../interface/not-found.interface').then((mod) => mod.NotFoundCatchAll)
);

export const NotFoundContainer = () => {
  const t = useTranslations('not-found');
  return <NotFoundView params={{ translations: t }} />;
};
