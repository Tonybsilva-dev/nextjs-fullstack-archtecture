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

import { CustomLink } from '@/shared/modules/components/custom/link';
import { PageProps } from '@/shared/modules/types/page-props';

interface HeaderHomeProps extends PageProps {
  links: Array<{ href: string; label: string }>;
}

export const HeaderHome = ({ links }: HeaderHomeProps) => {
  return (
    <nav className="hidden gap-4 sm:gap-6 md:flex">
      {links.map((link) => (
        <CustomLink
          key={link.href}
          className="self-center text-sm font-medium underline-offset-4 hover:underline"
          href={link.href}
        >
          {link.label}
        </CustomLink>
      ))}
      <LanguageSwitcher />
      <div className="-ml-4">
        <SignInButton />
      </div>
    </nav>
  );
};
