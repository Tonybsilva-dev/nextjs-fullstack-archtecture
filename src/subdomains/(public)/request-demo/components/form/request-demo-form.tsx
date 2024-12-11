'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import { Textarea } from '@/shared/modules/components/ui/textarea';
import { PageProps } from '@/shared/modules/types/page-props';

import {
  DemoRequestFormValues,
  demoRequestZodSchema,
} from '../../validations/request-demo.validations';

type DemoRequestFormUIProps = {
  onSubmit: (values: DemoRequestFormValues) => void;
} & PageProps;

export const DemoRequestForm = ({
  onSubmit,
  params,
}: DemoRequestFormUIProps) => {
  const { translations: t } = params;

  const schema = demoRequestZodSchema(t);

  const form = useForm<DemoRequestFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.placeholders.name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.email')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('form.placeholders.email')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.company')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.placeholders.company')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.message')}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={t('form.placeholders.message')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? t('form.buttons.submitting')
            : t('form.buttons.submit')}
        </Button>
      </form>
    </Form>
  );
};
