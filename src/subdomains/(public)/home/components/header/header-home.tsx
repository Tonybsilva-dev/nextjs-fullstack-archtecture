import dynamic from 'next/dynamic';

const LanguageSwitcher = dynamic(() =>
  import('@/shared/modules/components/custom/language-switcher').then(
    (mod) => mod.LanguageSwitcher
  )
);

const SignInButton = dynamic(
  () => import('./sign-in-button').then((mod) => mod.SignInButton),
  { ssr: false }
);

import Image from 'next/image';

import { CustomLink } from '@/shared/modules/components/custom/link';
import { PageProps } from '@/shared/modules/types/page-props';

import {
  NavigationMenuHeader,
  NavigationMenuProps,
} from './navigation/navigation-menu';

interface HeaderHomeProps extends PageProps {
  navigation: NavigationMenuProps['sections'];
}

import HORIZONTAL_LOGO from '@/assets/logo/horizontal-logo.png';

import { HeaderHomeMobile } from './header-mobile';

export const HeaderHome = ({ params, navigation }: HeaderHomeProps) => {
  const { translations: t } = params;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <CustomLink href="/" className="flex items-center space-x-2">
          <Image
            src={HORIZONTAL_LOGO}
            width={200}
            height={200}
            alt=""
            role="img"
            aria-label="logo"
            className="p-4"
          />
        </CustomLink>

        <nav className="hidden items-center space-x-6 md:flex">
          <NavigationMenuHeader sections={navigation} />
        </nav>

        <div className="flex-2 hidden gap-2 md:flex">
          <div className="w-[100px]">
            <LanguageSwitcher compact />
          </div>
          <SignInButton />
        </div>

        <div className="right-0 md:hidden">
          <HeaderHomeMobile
            params={{ translations: t }}
            navigation={navigation}
          />
        </div>
      </div>
    </header>
  );
};
