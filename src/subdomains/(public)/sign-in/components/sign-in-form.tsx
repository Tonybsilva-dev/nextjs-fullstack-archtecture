import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
import { PageProps } from '@/shared/modules/types/page-props';
import { AppError } from '@/shared/modules/utils/errors';
import { formatDate } from '@/shared/modules/utils/format-date';

import {
  SignInFormValues,
  signInZodSchema,
} from '../validations/sign-in.validation';

const SignInForm: React.FC<PageProps> = ({ params, router }) => {
  const { translations: t } = params;

  const schema = signInZodSchema(t);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error, {
          description: formatDate(new Date()),
        });
      } else if (router) {
        router.push('/dashboard');
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email-label')}</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.email?.message &&
                  t(form.formState.errors.email.message)}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>{t('password-label')}</FormLabel>
                <CustomLink
                  href="/dashboard/signin/forgot-password"
                  className="text-sm text-primary"
                >
                  {t('forgot-password')}
                </CustomLink>
              </div>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message &&
                  t(form.formState.errors.password.message)}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          isLoading={form.formState.isLoading}
          disabled={form.formState.isSubmitting}
        >
          {t('sign-in-button')}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
