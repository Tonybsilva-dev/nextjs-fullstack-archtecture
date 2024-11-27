import Image from 'next/image';

import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

import LOGO_IMAGE from '../../../../../public/web-app-manifest-512x512.png';
import LoginForm from '../components/login-form';

export const SignInView: React.FC<PageProps> = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-pattern absolute inset-0 opacity-10" />
      <div className="w-full max-w-md">
        <div className="overflow-hidden bg-white shadow-2xl">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-center">
              <Image
                src={LOGO_IMAGE}
                alt=""
                width={60}
                height={60}
                className="rounded-full"
              />
              <h1 className="ml-3 text-3xl font-bold text-gray-800">
                {NAME_APPLICATION}
              </h1>
            </div>
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-700">
              Bem-vindo de volta!
            </h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
