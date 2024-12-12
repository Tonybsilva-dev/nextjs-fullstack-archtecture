import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/shared/modules/components/ui/button';
import { PageProps } from '@/shared/modules/types/page-props';

export const DemoSection = ({ params }: PageProps) => {
  const { translations: t } = params;
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/request-demo');
  };

  return (
    <section className="w-full border-t py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold">
          {t('request-demo-section.title')}
        </h2>
        <p className="mb-8 text-center text-gray-600">
          {t('request-demo-section.subtitle')}
        </p>
        <div className="flex justify-center">
          <Button onClick={handleRedirect} className="flex items-center">
            {t('request-demo-section.button')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
