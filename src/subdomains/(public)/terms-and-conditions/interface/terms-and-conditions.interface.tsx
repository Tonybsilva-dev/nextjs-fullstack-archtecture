import { useTranslations } from 'next-intl';

import { LanguageSwitcher } from '@/shared/modules/components/custom/language-switcher';
import { BackButton } from '@/shared/modules/components/ui/back-button';
import { Typography } from '@/shared/modules/components/ui/typography';
import {
  EMAIL_CONTACT_APPLICATION,
  LAST_UPDATED_APPLICATION,
  NAME_APPLICATION,
} from '@/shared/modules/constants/application.constants';

export const TermsAndConditionsView = () => {
  const t = useTranslations('terms-and-conditions');
  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:px-8 md:py-24"
      aria-labelledby="terms-heading"
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <BackButton />
        <LanguageSwitcher />
      </div>
      <div className="space-y-8">
        <header>
          <Typography
            id="terms-heading"
            className="text-center sm:text-4xl md:text-5xl"
            variant={'h1'}
          >
            {t('title')}
          </Typography>
          <Typography className="mt-2 text-center" variant={'caption'}>
            {t('last-updated')}: {LAST_UPDATED_APPLICATION}
          </Typography>
        </header>
        <div className="space-y-6">
          <section aria-labelledby="user-responsibilities">
            <Typography variant={'h4'} id="user-responsibilities">
              {t('sections.user-responsibilities.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.user-responsibilities.content', {
                NAME_APPLICATION,
              })}
            </Typography>
          </section>
          <section aria-labelledby="data-privacy">
            <Typography variant={'h4'} id="data-privacy">
              {t('sections.data-privacy.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.data-privacy.content')}
            </Typography>
          </section>
          <section aria-labelledby="intellectual-property">
            <Typography variant={'h4'} id="intellectual-property">
              {t('sections.intellectual-property.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.intellectual-property.content', {
                NAME_APPLICATION,
              })}
            </Typography>
          </section>
          <section aria-labelledby="liability-limitations">
            <Typography id="liability-limitations" variant={'h4'}>
              {t('sections.liability-limitations.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.liability-limitations.content', {
                NAME_APPLICATION,
              })}
            </Typography>
          </section>
          <section aria-labelledby="terms-changes">
            <Typography id="terms-changes" variant={'h4'}>
              {t('sections.terms-changes.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.terms-changes.content')}
            </Typography>
          </section>
          <section aria-labelledby="contact-us">
            <Typography id="contact-us" variant={'h4'}>
              {t('sections.contact-us.heading')}
            </Typography>
            <Typography variant={'body3'} color={'description'}>
              {t('sections.contact-us.content', { EMAIL_CONTACT_APPLICATION })}
            </Typography>
          </section>
        </div>
      </div>
    </main>
  );
};
