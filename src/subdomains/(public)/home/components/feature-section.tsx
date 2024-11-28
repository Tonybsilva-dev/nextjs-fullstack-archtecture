import { ShieldIcon, UsersIcon, ZapIcon } from 'lucide-react';

import { PageProps } from '@/shared/modules/types/page-props';

export const FeatureSectionHome: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  const feature = {
    clientManagement: {
      icon: <UsersIcon />,
      title: t('features-section.features.client-management.title'),
      description: t('features-section.features.client-management.description'),
    },
    dataSecurity: {
      icon: <ShieldIcon />,
      title: t('features-section.features.data-security.title'),
      description: t('features-section.features.data-security.description'),
    },
    analytics: {
      icon: <ZapIcon />,
      title: t('features-section.features.analytics.title'),
      description: t('features-section.features.analytics.description'),
    },
  };

  return (
    <section className="flex w-full justify-center bg-white py-20 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
          {t('features-section.title')}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(feature).map((feat, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                {feat.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                {feat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
