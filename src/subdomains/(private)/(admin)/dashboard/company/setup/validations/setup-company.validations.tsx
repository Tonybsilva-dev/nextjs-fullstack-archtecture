import { z } from 'zod';

import { regex } from '@/shared/modules/utils/regex';

/* Zod Schemas */
export const storeZodSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(3, { message: t('form.validations.name') }),
    description: z
      .string()
      .max(150, { message: t('form.validations.description') })
      .optional(),
    logoUrl: z.instanceof(File).optional(),
    categories: z
      .array(z.string().min(1))
      .min(1, { message: t('form.validations.categories') })
      .max(3, { message: t('form.validations.categories') }),
    document: z.string().regex(regex.cnpj, {
      message: t('form.validations.document'),
    }),
    address: z.string().min(1, { message: t('form.validations.address') }),
    phone: z.string().regex(/^\+?\d+$/, {
      message: t('form.validations.phone'),
    }),
    email: z.string().email({ message: t('form.validations.email') }),

    latitude: z
      .number()
      .min(-90)
      .max(90)
      .refine((val) => val !== 0, {
        message: t('form.validations.latitude'),
      }),
    longitude: z
      .number()
      .min(-180)
      .max(180)
      .refine((val) => val !== 0, {
        message: t('form.validations.longitude'),
      }),
  });
};

/* Types */
export type Store = z.infer<ReturnType<typeof storeZodSchema>>;
