'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const HomeView = dynamic(() =>
  import('../interface/home.interface').then((mod) => mod.HomeView)
);

export const HomeContainer = () => {
  const t = useTranslations('home-page');
  return <HomeView params={{ translations: t }} />;
};
