'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { CustomLink } from '@/shared/modules/components/custom/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/modules/components/ui/accordion';
import { Button } from '@/shared/modules/components/ui/button';
import { Separator } from '@/shared/modules/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/shared/modules/components/ui/sheet';
import { Typography } from '@/shared/modules/components/ui/typography';
import { PageProps } from '@/shared/modules/types/page-props';

import { NavigationMenuProps } from './navigation/navigation-menu';
import { SignInButton } from './sign-in-button';

interface HeaderHomeMobileProps extends PageProps {
  navigation: NavigationMenuProps['sections'];
}

export const HeaderHomeMobile = ({
  navigation,
  params,
}: HeaderHomeMobileProps) => {
  const { translations: t } = params;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">{t('sheet.sr-only.title')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="mt-8 flex items-center justify-between">
          <Typography variant="h4">{t('sheet.title')}</Typography>
        </div>
        <Separator className="my-4" />

        <Accordion type="single" collapsible className="w-full">
          {navigation.map((section, index) => (
            <AccordionItem key={index} value={`section-${index}`}>
              <AccordionTrigger>{section.label}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2 pl-4">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <CustomLink
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="underline-offset-4 hover:underline"
                      >
                        <Typography variant="body1">{item.title}</Typography>
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-auto w-full">
          <Separator className="my-4" />
          <SignInButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};
