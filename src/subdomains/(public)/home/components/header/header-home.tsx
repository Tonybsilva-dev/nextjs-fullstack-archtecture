import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/shared/modules/components/custom/language-switcher';
import { Button } from '@/shared/modules/components/ui/button';

interface HeaderHomeProps {
  links: Array<{ href: string; label: string }>;
}

export const HeaderHome = ({ links }: HeaderHomeProps) => {
  const t = useTranslations('components.header-home');

  return (
    <nav className="hidden gap-4 sm:gap-6 md:flex">
      {links.map((link) => (
        <Link
          key={link.href}
          className="self-center text-sm font-medium underline-offset-4 hover:underline"
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
      <LanguageSwitcher />
      <Button className="-ml-4">{t('login')}</Button>
    </nav>
  );
};
