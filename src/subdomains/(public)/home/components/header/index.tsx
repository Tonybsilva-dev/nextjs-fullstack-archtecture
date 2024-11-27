import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { useBreakpoint } from '@/shared/modules/hooks/use-breakpoint';

import logoIcon from '../../../../../../public/favicon-96x96.png';
import { HeaderHome } from './header-home';
import { HeaderHomeMobile } from './header-mobile';

export default function HeaderHomePage() {
  const isMobile = useBreakpoint('small-tablet');
  const t = useTranslations('components.header-home');

  const navLinks = [
    { href: '#features', label: t('links.features') },
    { href: '#benefits', label: t('links.benefits') },
    { href: '#contact', label: t('links.contact') },
  ];

  const COMP = isMobile ? (
    <HeaderHomeMobile links={navLinks} params={{ translations: t }} />
  ) : (
    <HeaderHome links={navLinks} params={{ translations: t }} />
  );

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
      <Link className="flex items-center justify-center space-x-2" href="#">
        <Image
          src={logoIcon}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-bold"> {NAME_APPLICATION} </span>
      </Link>
      {COMP}
    </header>
  );
}
