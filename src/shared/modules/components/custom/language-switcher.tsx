'use client';

import Cookies from 'js-cookie';
import Image from 'next/image';
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
import { Typography } from '../ui/typography';

const supportedLocales = ['en', 'pt', 'es'] as const;
type Locale = (typeof supportedLocales)[number];

type LanguageSwitcherProps = {
  compact?: boolean;
};

export function LanguageSwitcher({ compact }: LanguageSwitcherProps) {
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

  const renderFlag = (locale: Locale) => {
    const flagMap: Record<Locale, string> = {
      en: '/locales/en.png',
      pt: '/locales/pt.png',
      es: '/locales/es.png',
    };

    return (
      <Image
        src={flagMap[locale]}
        alt={locale}
        width={24}
        height={24}
        className="rounded-full"
        loading="eager"
      />
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
        <SelectTrigger className="items-center justify-between">
          <SelectValue>
            {compact ? (
              renderFlag(currentLocale)
            ) : (
              <div className="flex items-center gap-2">
                {renderFlag(currentLocale)}
                {t(`options.${currentLocale}`)}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {!compact && (
              <SelectLabel className="self-center">{t('label')}</SelectLabel>
            )}
            {supportedLocales.map((locale) => (
              <SelectItem key={locale} value={locale}>
                {compact ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-shrink-0">{renderFlag(locale)}</div>
                    <Typography variant={'body2'}>
                      {locale.toUpperCase()}
                    </Typography>
                  </div>
                ) : (
                  <div className="flex gap-2 px-4">
                    <div className="flex-shrink-0">{renderFlag(locale)}</div>
                    <Typography variant={'body2'}>
                      {t(`options.${locale}`)}
                    </Typography>
                  </div>
                )}
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
