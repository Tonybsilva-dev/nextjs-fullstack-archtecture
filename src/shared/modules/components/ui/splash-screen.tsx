import { useTranslations } from 'next-intl';
import React from 'react';

import { SquareLoading } from '../custom/square-loading';
import { Typography } from './typography';

interface ISplashScreen {
  text?: string;
}

export const SplashScreen = ({ text }: ISplashScreen) => {
  const t = useTranslations('splash-screen');
  const TITLE = text ? text : t('title');

  return (
    <div className="flex h-screen w-full flex-1 flex-col items-center justify-center bg-transparent">
      <SquareLoading />
      <Typography className="mt-8" variant={'lead'}>
        {TITLE}
      </Typography>
    </div>
  );
};
