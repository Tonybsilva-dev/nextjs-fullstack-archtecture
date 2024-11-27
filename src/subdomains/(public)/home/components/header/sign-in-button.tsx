'use client';

import { CrownIcon } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import GOOGLE_ICON from '@/assets/icons/google.png';
import { CustomLink } from '@/shared/modules/components/custom/link';
import { Button } from '@/shared/modules/components/ui/button';
import Iconify from '@/shared/modules/components/ui/iconify';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/modules/components/ui/popover';
import { Separator } from '@/shared/modules/components/ui/separator';
import { Typography } from '@/shared/modules/components/ui/typography';

export const SignInButton: React.FC = () => {
  const t = useTranslations('components.header-home');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="w-full"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="sign-in-popover"
        >
          {t('login')}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id="sign-in-popover"
        className="w-80"
        role="dialog"
        aria-labelledby="sign-in-title"
        aria-describedby="sign-in-subtitle"
      >
        <div className="grid gap-4">
          <div className="space-y-1">
            <Typography id="sign-in-title" variant={'h6'}>
              {t('sign-in.title')}
            </Typography>
            <Typography id="sign-in-subtitle" variant={'body3'}>
              {t('sign-in.subtitle')}
            </Typography>
          </div>
          <Separator />
          <div className="grid gap-2">
            <CustomLink href={'/sign-in'} className="w-full">
              <Button
                variant="outline"
                className="relative flex w-full items-center rounded-md border border-gray-300 px-4 py-2"
                aria-label={t('sign-in.buttons.admin')}
              >
                <div className="absolute left-4">
                  <Iconify
                    icon={CrownIcon}
                    className="text-primary"
                    aria-hidden="true"
                  />
                </div>
                <span className="flex-grow">
                  <Typography className="text-center" variant={'body3'}>
                    {t('sign-in.buttons.admin')}
                  </Typography>
                </span>
              </Button>
            </CustomLink>
            <Button
              variant="outline"
              className="relative flex w-full items-center rounded-md border border-gray-300 px-4 py-2"
              aria-label={t('sign-in.buttons.customer')}
            >
              <div className="absolute left-4">
                <Image
                  src={GOOGLE_ICON}
                  alt={t('sign-in.buttons.customer')}
                  width={20}
                  height={20}
                />
              </div>
              <span className="flex-grow">
                <Typography className="text-center" variant={'body3'}>
                  {t('sign-in.buttons.customer')}
                </Typography>
              </span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
