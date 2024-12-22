import { PageProps } from '@/shared/modules/types/page-props';

export const DashboardView = ({ params }: PageProps) => {
  const { translations: t } = params;

  return <h1>{t('title')}</h1>;
};
