import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import logo from '../../../../../public/web-app-manifest-512x512.png';
import { Typography } from './typography';

interface ISplashScreen {
  text?: string;
}

export const SplashScreen = ({ text }: ISplashScreen) => {
  const t = useTranslations('splash-screen');
  const TITLE = text ? text : t('title');

  return (
    <div className="flex h-screen w-full flex-1 flex-col items-center justify-center bg-transparent">
      <Image
        src={logo}
        alt="Loading"
        className="h-12 w-12 animate-ping rounded-full"
      />
      <Typography className="mt-10" variant={'overline'}>
        {TITLE}
      </Typography>
    </div>
  );
};
