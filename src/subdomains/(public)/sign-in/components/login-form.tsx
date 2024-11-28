'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from '@radix-ui/react-checkbox';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CustomLink } from '@/shared/modules/components/custom/link';
import { Button } from '@/shared/modules/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/modules/components/ui/form';
import { Input } from '@/shared/modules/components/ui/input';

const formSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const t = useTranslations('components.login-form');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log(values);
    router.push('/dashboard');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo de Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pl-10"
                    placeholder={t('email.placeholder')}
                    {...field}
                  />
                  <MailIcon
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de Senha */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('password.label')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pl-10"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('password.placeholder')}
                    {...field}
                  />
                  <LockIcon
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400"
                    aria-hidden="true"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    aria-label={
                      showPassword ? t('password.hide') : t('password.show')
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lembre-me e Esqueci a Senha */}
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <div className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="ml-2 text-sm">
                  {t('remember-me')}
                </FormLabel>
              </div>
            )}
          />
          <CustomLink href="#" className="text-sm font-medium text-primary">
            {t('forgot-password')}
          </CustomLink>
        </div>

        {/* Botão de Submissão */}
        <Button type="submit" className="w-full">
          {t('submit')}
        </Button>
      </form>
    </Form>
  );
}
