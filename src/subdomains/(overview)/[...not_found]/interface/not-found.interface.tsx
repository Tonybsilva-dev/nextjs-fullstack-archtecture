'use client';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import NOT_FOUND_IMAGE from '@/assets/images/404.svg';
import { BackButton } from '@/shared/modules/components/ui/back-button';
import { Button } from '@/shared/modules/components/ui/button';
import { SplashScreen } from '@/shared/modules/components/ui/splash-screen';
import { Typography } from '@/shared/modules/components/ui/typography';
import { PageProps } from '@/shared/modules/types/page-props';

export const NotFoundCatchAll: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <SplashScreen />;
  }

  return (
    <div
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      role="alert"
      aria-live="assertive"
      aria-labelledby="not-found-title"
      aria-describedby="not-found-description"
    >
      <div className="relative mx-auto mb-6 block w-full max-w-md px-4 sm:px-6 md:hidden lg:px-8">
        <BackButton className="absolute -top-8 left-0 sm:-top-10 sm:left-0" />
      </div>
      <Image
        src={NOT_FOUND_IMAGE}
        width={300}
        height={300}
        alt={t('alt')}
        className="h-auto max-w-full"
      />
      <div className="mx-auto max-w-md text-center">
        <Typography variant={'h3'} className="text-center">
          {t('title')}
        </Typography>
        <Typography
          id="not-found-description"
          variant={'body2'}
          className="mt-4 text-center"
        >
          {t('description')}
        </Typography>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <div className="hidden md:block">
            <BackButton className="w-full sm:w-10" />
          </div>
          {session && (
            <Button
              className="w-full"
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: '/',
                })
              }
            >
              {t('logout-button')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
