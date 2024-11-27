'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const SignInView = dynamic(() =>
  import('../interface/sign-in.interface').then((mod) => mod.SignInView)
);

export const SignInContainer = () => {
  const t = useTranslations('sign-in');
  return <SignInView params={{ translations: t }} />;
};
