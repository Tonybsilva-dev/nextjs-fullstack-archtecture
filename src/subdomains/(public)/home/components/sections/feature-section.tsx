'use client';

import {
  BlocksIcon,
  CalendarCheckIcon,
  ChartLineIcon,
  ListTodoIcon,
  MapIcon,
  MapPinnedIcon,
} from 'lucide-react';

import { Card, CardContent } from '@/shared/modules/components/ui/card';
import Iconify from '@/shared/modules/components/ui/iconify';
import { PageProps } from '@/shared/modules/types/page-props';

export const FeaturesSection = ({ params }: PageProps) => {
  const { translations: t } = params;

  const features = [
    {
      title: t('features-section.features.0.title'),
      description: t('features-section.features.0.description'),
      imageUrl: CalendarCheckIcon,
    },
    {
      title: t('features-section.features.1.title'),
      description: t('features-section.features.1.description'),
      imageUrl: ListTodoIcon,
    },
    {
      title: t('features-section.features.2.title'),
      description: t('features-section.features.2.description'),
      imageUrl: BlocksIcon,
    },
    {
      title: t('features-section.features.3.title'),
      description: t('features-section.features.3.description'),
      imageUrl: MapIcon,
    },
    {
      title: t('features-section.features.4.title'),
      description: t('features-section.features.4.description'),
      imageUrl: ChartLineIcon,
    },
    {
      title: t('features-section.features.5.title'),
      description: t('features-section.features.5.description'),
      imageUrl: MapPinnedIcon,
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            {t('features-section.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('features-section.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className="flex items-center space-x-4 pt-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border-y">
                  <Iconify icon={feature.imageUrl} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
