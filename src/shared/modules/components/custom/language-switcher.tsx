'use client';

import Cookies from 'js-cookie';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

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
    <div role="group" aria-labelledby="language-switcher-label">
      <span id="language-switcher-label" className="sr-only">
        {t('sr-only.aria-label.select')}
      </span>
      <Select
        value={currentLocale}
        onValueChange={(value: string) => changeLanguage(value as Locale)}
        aria-label={t('sr-only.aria-label.select')}
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
      <div role="status" aria-live="polite" className="sr-only">
        {t(`sr-only.announcements.changed-to`, { locale: currentLocale })}
      </div>
    </div>
  );
}
