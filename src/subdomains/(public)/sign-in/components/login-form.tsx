'use client';

import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { CustomLink } from '@/shared/modules/components/custom/link';
import { BackButton } from '@/shared/modules/components/ui/back-button';
import { Button } from '@/shared/modules/components/ui/button';
import { Checkbox } from '@/shared/modules/components/ui/checkbox';
import { Input } from '@/shared/modules/components/ui/input';
import { Label } from '@/shared/modules/components/ui/label';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const t = useTranslations('components.login-form');

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 3000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">{t('email.label')}</Label>
        <div className="relative">
          <Input
            id="email"
            placeholder={t('email.placeholder')}
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            className="pl-10"
          />
          <MailIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">{t('password.label')}</Label>
        <div className="relative">
          <Input
            id="password"
            placeholder={t('password.placeholder')}
            type={showPassword ? 'text' : 'password'}
            autoCapitalize="none"
            autoComplete="current-password"
            disabled={isLoading}
            required
            className="pl-10"
          />
          <LockIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
            aria-hidden="true"
          />
          <Button
            type="button"
            size={'icon'}
            variant={'link'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? t('password.hide') : t('password.show')}
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox id="remember-me" name="remember-me" disabled={isLoading} />
          <Label htmlFor="remember-me" className="ml-2 cursor-pointer text-sm">
            {t('remember-me')}
          </Label>
        </div>
        <CustomLink href="#" className="text-sm font-medium text-primary">
          {t('forgot-password')}
        </CustomLink>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <div className="hidden md:block">
          <BackButton className="w-full sm:w-10" />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full"
        >
          {t('submit')}
        </Button>
      </div>
    </form>
  );
}
