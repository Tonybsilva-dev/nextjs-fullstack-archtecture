import { NAME_APPLICATION } from '@/shared/modules/constants/application.constants';
import { PageProps } from '@/shared/modules/types/page-props';

import LoginForm from '../components/login-form';

export const SignInView: React.FC<PageProps> = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-zinc-200 via-yellow-200 to-zinc-200 p-4 sm:p-6 lg:p-8">
      <div className="bg-pattern pointer-events-none absolute inset-0 opacity-20" />
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-black/5">
          <div className="p-8">
            <div className="mb-8 flex flex-col items-center justify-center">
              <div className="h-[120px] w-[300px] bg-zinc-200" />
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800">
                {NAME_APPLICATION}
              </h1>
            </div>
            <h2 className="mb-6 text-center text-xl font-medium text-gray-600">
              Bem-vindo de volta! Acesse sua conta
            </h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};
