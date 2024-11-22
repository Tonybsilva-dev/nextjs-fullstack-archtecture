'use client'

import dynamic from 'next/dynamic';

const HomeView = dynamic(() => import('../interface/home.interface').then(mod => mod.HomeView), {
  ssr: false,
});

export const HomeContainer = () => {
  return <HomeView />;
};