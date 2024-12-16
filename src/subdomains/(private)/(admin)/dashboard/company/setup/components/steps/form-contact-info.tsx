import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/modules/components/ui/form';
import { Input } from '@/shared/modules/components/ui/input';
import { PageProps } from '@/shared/modules/types/page-props';

export const FormContactInfo: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { control } = useFormContext();

  return (
    <div>
      <h2 className="mb-6 text-2xl font-light">{t('steps.2.title')}</h2>
      <div className="space-y-4">
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.address')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.placeholders.address')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.phone')}</FormLabel>
              <FormControl>
                <Input placeholder={t('form.placeholders.phone')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
      </div>
    </div>
  );
};
