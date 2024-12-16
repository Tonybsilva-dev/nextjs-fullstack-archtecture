'use client';

import { toast } from 'sonner';

import LOGO_IMG from '@/assets/logo/horizontal-logo.png';
import { FallbackImage } from '@/shared/modules/components/custom/fallback-image';
import { LanguageSwitcher } from '@/shared/modules/components/custom/language-switcher';
import { BackButton } from '@/shared/modules/components/ui/back-button';
import { Typography } from '@/shared/modules/components/ui/typography';
import { useBreakpoint } from '@/shared/modules/hooks/use-breakpoint';
import { PageProps } from '@/shared/modules/types/page-props';
import { AppError } from '@/shared/modules/utils/errors';
import { formatDate } from '@/shared/modules/utils/format-date';

import { CountTenantApproved } from '../components/form/count-tenant-approved';
import { DemoRequestForm } from '../components/form/request-demo-form';
import { DemoRequestFormValues } from '../validations/request-demo.validations';

export const RequestDemoView = ({ params, router }: PageProps) => {
  const isMobile = useBreakpoint();
  const { translations: t } = params;

  const onSubmit = async (data: DemoRequestFormValues) => {
    try {
      const response = await fetch('/api/request-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantName: data.company,
          adminName: data.name,
          adminEmail: data.email,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(t('form.status.success.message'), {
          description: formatDate(new Date()),
          action: {
            label: t('form.labels.sign-in'),
            onClick: () => router?.push('/sign-in'),
          },
        });
      } else {
        toast.error(responseData.error || t('form.status.error.message'), {
          description: formatDate(new Date()),
        });
      }
    } catch (error) {
      const appError = AppError.from(error);
      appError.logError();

      toast.error(appError.message, {
        description: formatDate(new Date()),
      });
    }
  };

  return (
    <main
      className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 md:px-8 md:py-24"
      aria-labelledby="request-demo"
    >
      <div className="mb-6 flex w-full items-center justify-between">
        <BackButton />
        <div className={`${!isMobile ? 'w-[180px]' : ''}`}>
          <LanguageSwitcher compact={isMobile} />
        </div>
      </div>
      <header className="mx-auto flex w-full flex-col items-center">
        <Typography
          id="request-demo-heading"
          className="text-left sm:text-4xl md:text-5xl"
          variant={'h1'}
        >
          {t('page.title')}
        </Typography>
        <Typography
          className="mt-2 text-left text-zinc-500"
          variant={'caption'}
        >
          {t('page.description')}
        </Typography>
      </header>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="my-auto hidden h-full items-center justify-center space-y-6 border-r p-4 md:flex">
          <div>
            <FallbackImage src={LOGO_IMG} alt="" width={1000} height={1000} />
            <CountTenantApproved />
          </div>
        </div>
        <div className="block w-full">
          <DemoRequestForm onSubmit={onSubmit} params={{ translations: t }} />
        </div>
      </div>
    </main>
  );
};
