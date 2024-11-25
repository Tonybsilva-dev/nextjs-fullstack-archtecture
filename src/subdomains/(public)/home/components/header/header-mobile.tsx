'use client';

import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LanguageSwitcher } from '@/shared/modules/components/custom/language-switcher';
import { CustomLink } from '@/shared/modules/components/custom/link';
import { Button } from '@/shared/modules/components/ui/button';
import { Separator } from '@/shared/modules/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/modules/components/ui/sheet';
import { Typography } from '@/shared/modules/components/ui/typography';

interface HeaderHomeMobileProps {
  links: Array<{ href: string; label: string }>;
}

export const HeaderHomeMobile = ({ links }: HeaderHomeMobileProps) => {
  const t = useTranslations('components.header-home');

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="mt-8 flex items-center justify-between">
          <Typography variant={'h4'}>MENU</Typography>
          <LanguageSwitcher compact />
        </div>
        <Separator className="my-4" />
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <CustomLink
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              <Typography
                variant={'body1'}
                className="underline-offset-4 hover:underline"
              >
                {link.label}
              </Typography>
            </CustomLink>
          ))}
        </nav>
        <div className="mt-auto">
          <Separator className="my-4" />
          <Button className="w-full">{t('login')}</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
