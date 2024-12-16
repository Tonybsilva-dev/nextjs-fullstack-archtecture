'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@/shared/modules/components/ui/button';

export const SignOutButton = ({ label }: { label: string }) => {
  return (
    <Button
      variant="outline"
      onClick={() => signOut()}
      className="w-full justify-center"
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
};
