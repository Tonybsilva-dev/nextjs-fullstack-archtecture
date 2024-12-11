'use client';

import AUTHOR_IMG from '@/assets/images/author.jpeg';
import { FallbackImage } from '@/shared/modules/components/custom/fallback-image';
import { Button } from '@/shared/modules/components/ui/button';
import {
  AUTHOR_NAME,
  EMAIL_CONTACT_APPLICATION,
} from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

export const ContactMeSection = ({ params }: PageProps) => {
  const { translations: t } = params;

  return (
    <div className="w-full bg-zinc-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="hidden items-center gap-4 md:flex">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-white">
              <FallbackImage
                src={AUTHOR_IMG}
                alt={t('contact-me-section.logo.alt')}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="mb-1 text-xl font-semibold text-white">
                {AUTHOR_NAME}
              </h1>
              <p className="text-sm text-white/90">
                {t('contact-me-section.description')}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="mx-auto bg-white text-gray-800 hover:bg-white/90"
            onClick={() =>
              (window.location.href = `mailto:${EMAIL_CONTACT_APPLICATION}`)
            }
          >
            {t('contact-me-section.button.text')}
          </Button>
        </div>
      </div>
    </div>
  );
};
