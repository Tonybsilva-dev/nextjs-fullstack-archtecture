import { z } from 'zod';

export const demoRequestZodSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(1, t('validations.name')),
    email: z.string().email(t('validations.email')),
    company: z.string().min(1, t('validations.company')),
    message: z.string().max(500, t('validations.message')).optional(),
  });
};

export type DemoRequestFormValues = z.infer<
  ReturnType<typeof demoRequestZodSchema>
>;
