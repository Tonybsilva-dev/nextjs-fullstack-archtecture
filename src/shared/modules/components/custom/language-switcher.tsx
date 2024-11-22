'use client';

import Cookies from 'js-cookie';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect,useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const supportedLocales = ['en', 'pt', 'es'] as const;
type Locale = (typeof supportedLocales)[number];

export function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('components.language-switcher');

  useEffect(() => {
    const savedLocale = Cookies.get('NEXT_LOCALE') as Locale;
    if (savedLocale && supportedLocales.includes(savedLocale)) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (locale: Locale) => {
    setCurrentLocale(locale);
    Cookies.set('NEXT_LOCALE', locale, { expires: 365 });

    const pathWithoutLocale = pathname
      .split('/')
      .filter((segment) => !supportedLocales.includes(segment as Locale))
      .join('/');

    const params = new URLSearchParams(searchParams as ReadonlyURLSearchParams);
    router.push(
      `/${locale}${pathWithoutLocale}${params.toString() ? `?${params.toString()}` : ''}`
    );
  };

  return (
    <Select
      value={currentLocale}
      onValueChange={(value: string) => changeLanguage(value as Locale)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('label')}</SelectLabel>
          {supportedLocales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {t(`options.${locale}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
