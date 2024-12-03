import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';

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

import {
  SignInFormValues,
  signInZodSchema,
} from '../validations/sign-in.validation';

const SignInForm: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;

  const schema = signInZodSchema(t);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log('Form Submitted:', data);
    // Coloque aqui a lógica para enviar os dados ao servidor
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
        <Button type="submit" className="w-full">
          {t('sign-in-button')}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
