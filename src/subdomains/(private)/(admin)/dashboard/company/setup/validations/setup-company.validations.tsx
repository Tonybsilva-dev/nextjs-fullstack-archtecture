import { z } from 'zod';

import { regex } from '@/shared/modules/utils/regex';

/* Zod Schemas */

export const storeZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Store name must be at least 3 characters long.' }),
  description: z
    .string()
    .max(150, { message: 'Description can have a maximum of 150 characters.' })
    .optional(),
  categories: z
    .array(z.string().min(1))
    .min(1, { message: 'Please select at least one category.' })
    .max(3, { message: 'You can select a maximum of 3 categories.' }),
  document: z
    .string()
    .regex(regex.cnpj, {
      message: 'CNPJ must be in the format XX.XXX.XXX/XXXX-XX.',
    }),
  address: z.string().nonempty({ message: 'Address is required.' }),
  phone: z.string().regex(/^\+?\d+$/, {
    message: 'Phone must be a valid number (e.g., +5511999999999).',
  }),
  email: z.string().email({ message: 'Email must be a valid email address.' }),

  latitude: z
    .number()
    .min(-90)
    .max(90)
    .refine((val) => val !== 0, {
      message: 'Please select a location on the map.',
    }),
  longitude: z
    .number()
    .min(-180)
    .max(180)
    .refine((val) => val !== 0, {
      message: 'Please select a location on the map.',
    }),
});

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
export type Store = z.infer<typeof storeZodSchema>;
export type BasicInfoStore = z.infer<typeof basicInfoZodSchema>;
export type ContactInfoStore = z.infer<typeof contactInfoZodSchema>;
