import { useFormContext } from 'react-hook-form';

import { MultiSelect } from '@/shared/modules/components/custom/multi-select';
import { PhotoUpload } from '@/shared/modules/components/custom/photo-upload';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/modules/components/ui/form';
import { Input } from '@/shared/modules/components/ui/input';
import { Textarea } from '@/shared/modules/components/ui/textarea';
import { PageProps } from '@/shared/modules/types/page-props';

import { restaurantCategories } from '../../utils/categories';

export const FormBasicInfo: React.FC<PageProps> = ({ params }) => {
  const { translations: t } = params;
  const { control } = useFormContext();

  return (
    <div>
      <h2 className="mb-6 text-2xl font-light">{t('steps.1.title')}</h2>
      <div className="space-y-4">
        <PhotoUpload onPhotoSelect={() => null} />
        <FormField
          control={control}
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
          control={control}
          name="document"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.document')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('form.placeholders.document')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('form.placeholders.description')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('form.labels.categories')}</FormLabel>
              <FormControl>
                <MultiSelect
                  options={restaurantCategories}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select options"
                  variant="inverted"
                  animation={2}
                  maxCount={3}
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
