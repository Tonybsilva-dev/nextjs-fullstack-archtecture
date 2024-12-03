import Image from 'next/image';

import GOOGLE_ICON from '@/assets/icons/google.png';
import { Button } from '@/shared/modules/components/ui/button';
import { PageProps } from '@/shared/modules/types/page-props';

const SignInWithGoogle: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  return (
    <form>
      <Button
        type="submit"
        className="flex w-full items-center justify-center space-x-2"
        variant="outline"
      >
        <Image
          src={GOOGLE_ICON}
          alt={t('sign-in-google')}
          width={20}
          height={20}
        />
        <span>{t('sign-in-google')}</span>
      </Button>
    </form>
  );
};

export default SignInWithGoogle;
