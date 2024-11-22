'use client'

import dynamic from 'next/dynamic';

const TermsAndConditionsView = dynamic(() => import('../interface/terms-and-conditions.interface').then(mod => mod.TermsAndConditionsView), {
  ssr: false,
});

export const TermsAndConditionsContainer = () => {
  return <TermsAndConditionsView />;
};