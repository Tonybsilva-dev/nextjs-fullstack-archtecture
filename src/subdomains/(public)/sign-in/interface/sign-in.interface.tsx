import HONRIZONTAL_LOGO from '@/assets/logo/horizontal-logo-white.png';
import { FallbackImage } from '@/shared/modules/components/custom/fallback-image';
import { BackButton } from '@/shared/modules/components/ui/back-button';
import { Separator } from '@/shared/modules/components/ui/separator';
import { PageProps } from '@/shared/modules/types/page-props';

import SignInForm from '../components/sign-in-form';
import SignInWithGoogle from '../components/sign-in-with-google';

export const SignInView: React.FC<PageProps> = ({ params, router }) => {
  const { translations: t } = params;

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-full max-w-[450px] px-5 lg:px-6">
        <div className="mx-auto my-auto mb-auto flex w-[350px] max-w-[450px] flex-col md:max-w-[450px] lg:max-w-[450px]">
          <div className="mb-6">
            <BackButton />
          </div>
          <FallbackImage
            src={HONRIZONTAL_LOGO}
            width={400}
            height={200}
            alt="logo"
          />
          <h1 className="mt-6 text-2xl font-bold text-zinc-950 dark:text-white">
            {t('title')}
          </h1>
          <p className="mb-4 mt-2 text-sm text-zinc-950 dark:text-zinc-400">
            {t('subtitle')}
          </p>
          <SignInWithGoogle params={{ translations: t }} />
          <Separator className="my-4" />
          <SignInForm params={{ translations: t }} router={router} />
        </div>
      </div>
    </div>
  );
};
