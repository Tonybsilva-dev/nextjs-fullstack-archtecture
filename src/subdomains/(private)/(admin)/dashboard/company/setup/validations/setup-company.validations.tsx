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
    categories: z
      .array(z.string().min(1))
      .min(1, { message: t('form.validations.categories') })
      .max(3, { message: t('form.validations.categories') }),
    document: z.string().regex(regex.cnpj, {
      message: t('form.validations.document'),
    }),
    address: z.string().nonempty({ message: t('form.validations.address') }),
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

export const basicInfoZodSchema = z.object({
  name: z.string().min(3),
  description: z.string().max(150).optional(),
  category: z.string().nonempty(),
});

export const contactInfoZodSchema = z.object({
  address: z.string().nonempty(),
  phone: z.string().regex(/^\+?\d+$/),
  email: z.string().email(),
});

/* Types */
export type Store = z.infer<ReturnType<typeof storeZodSchema>>;
export type BasicInfoStore = z.infer<typeof basicInfoZodSchema>;
export type ContactInfoStore = z.infer<typeof contactInfoZodSchema>;
