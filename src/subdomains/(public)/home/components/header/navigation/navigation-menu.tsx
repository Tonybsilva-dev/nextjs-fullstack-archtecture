'use client';

import { MapPinHouseIcon } from 'lucide-react';
import * as React from 'react';

import { CustomLink } from '@/shared/modules/components/custom/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/shared/modules/components/ui/navigation-menu';
import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { cn } from '@/shared/modules/utils/shadcn';

export interface NavSectionItem {
  title: string;
  href: string;
  description: string;
}

export interface NavSection {
  label: string;
  items: NavSectionItem[];
}

export interface NavigationMenuProps {
  sections: NavSection[];
}

export const NavigationMenuHeader = ({ sections }: NavigationMenuProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {sections.map((section) => (
          <>
            <NavigationMenuItem key={section.label}>
              {section.items && section.items.length > 0 ? (
                <>
                  <NavigationMenuTrigger>{section.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <CustomLink
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-t from-yellow-100 to-yellow-50 p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <MapPinHouseIcon className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {NAME_APPLICATION}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Effortless restaurant management and customer
                              engagement in one platform.
                            </p>
                          </CustomLink>
                        </NavigationMenuLink>
                      </li>
                      {section.items.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                // Se não houver submenu, apenas um link direto
                <CustomLink href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {section.label}
                  </NavigationMenuLink>
                </CustomLink>
              )}
            </NavigationMenuItem>
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
