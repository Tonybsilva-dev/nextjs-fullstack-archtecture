'use client';

import { LogsIcon, MapPinHouseIcon, MonitorCogIcon, Star } from 'lucide-react';

import MAN_WAITER_IMG from '@/assets/images/man-waiter.png';
import { FallbackImage } from '@/shared/modules/components/custom/fallback-image';
import { Button } from '@/shared/modules/components/ui/button';
import { PageProps } from '@/shared/modules/types/page-props';

export const CTASection = ({ params }: PageProps) => {
  const { translations: t } = params;

  const services = [
    {
      name: t('cta-section.services.find-restaurants'),
      icon: <MapPinHouseIcon />,
    },
    {
      name: t('cta-section.services.track-orders'),
      icon: <LogsIcon />,
    },
    {
      name: t('cta-section.services.manage-menus'),
      icon: <MonitorCogIcon />,
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black md:text-5xl">
            {t('cta-section.title')}
          </h2>
          <h3 className="mb-6 text-3xl font-bold text-primary md:text-4xl">
            {t('cta-section.subtitle')}
          </h3>
          <p className="mx-auto max-w-2xl text-gray-600">
            {t('cta-section.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="flex flex-wrap items-center justify-center gap-4 md:col-span-4 md:flex-col md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex w-16 flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                  {service.icon}
                </div>
                <span className="hidden font-medium md:block">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative md:col-span-4">
            <div className="relative">
              <div className="rounded-blob absolute inset-0 -z-10 bg-primary" />
              <FallbackImage
                src={MAN_WAITER_IMG}
                alt={t('cta-section.alt-image')}
                width={300}
                height={300}
                className="relative left-20 z-10"
              />
            </div>
          </div>

          <div className="space-y-6 md:col-span-3">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <FallbackImage
                src="/placeholder.svg?height=200&width=200"
                alt={t('cta-section.product.title')}
                width={200}
                height={200}
                className="mx-auto mb-4"
              />
              <h4 className="mb-1 font-bold">
                {t('cta-section.product.title')}
              </h4>
              <p className="mb-4 text-sm text-gray-600">
                {t('cta-section.product.description')}
              </p>
              <Button className="w-full">
                {t('cta-section.product.button')}
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? 'fill-yellow-500' : 'fill-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {t('cta-section.review.rating')}
                </span>
              </div>
              <div className="rounded-lg bg-white p-4">
                <p className="mb-2 text-sm italic text-gray-600">
                  {t('cta-section.review.quote')}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    <FallbackImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={t('cta-section.review.reviewer.name')}
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {t('cta-section.review.reviewer.name')}
                    </p>
                    <p className="text-xs text-gray-600">
                      {t('cta-section.review.reviewer.location')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
