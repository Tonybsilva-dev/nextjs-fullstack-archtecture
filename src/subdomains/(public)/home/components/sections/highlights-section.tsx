'use client';

import EXAMPLE_ONE from '@/assets/images/example-1.jpg';
import EXAMPLE_TWO from '@/assets/images/example-2.jpg';
import EXAMPLE_THREE from '@/assets/images/example-3.jpg';
import { FallbackImage } from '@/shared/modules/components/custom/fallback-image';
import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

export const HighlightsSection = ({ params }: PageProps) => {
  const { translations: t } = params;

  const highlights = [
    {
      title: t('highlights-section.highlights.0.title'),
      description: t('highlights-section.highlights.0.description'),
      imageUrl: EXAMPLE_ONE,
    },
    {
      title: t('highlights-section.highlights.1.title'),
      description: t('highlights-section.highlights.1.description'),
      imageUrl: EXAMPLE_TWO,
    },
    {
      title: t('highlights-section.highlights.2.title'),
      description: t('highlights-section.highlights.2.description'),
      imageUrl: EXAMPLE_THREE,
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            {t('highlights-section.title', { appName: NAME_APPLICATION })}
          </h2>
          <p className="text-muted-foreground">
            {t('highlights-section.description')}
          </p>
        </div>

        <div className="space-y-24">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full rounded-lg md:w-1/2">
                <FallbackImage
                  src={highlight.imageUrl}
                  alt={t(`highlights.${index}.alt`)}
                  width={1080}
                  height={720}
                  className="w-full rounded-lg"
                  loading="eager"
                />
              </div>
              <div className="w-full space-y-4 md:w-1/2">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
