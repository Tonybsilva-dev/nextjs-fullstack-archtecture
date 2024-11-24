'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Button } from './button';
import Iconify from './iconify';
import { Typography } from './typography';

interface BackButtonProps {
  className?: string;
  text?: string;
}

export const BackButton = ({ className, text }: BackButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Button
        size={'icon'}
        onClick={router.back}
        aria-label="Voltar"
        className={twMerge('min-w-[40px]', className)}
      >
        <span className="sr-only">back button</span>
        <Iconify icon={ChevronLeftIcon} aria-hidden="true" />
        {text && <Typography className="hidden md:block">{text}</Typography>}
      </Button>
    </div>
  );
};
