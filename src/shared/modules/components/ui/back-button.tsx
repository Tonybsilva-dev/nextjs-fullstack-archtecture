'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from './button';
import Iconify from './iconify';

export const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex w-full">
      <Button size={'icon'} onClick={router.back} aria-label="Voltar">
        <span className="sr-only">back button</span>
        <Iconify icon={ChevronLeftIcon} aria-hidden="true" />
      </Button>
    </div>
  );
};
