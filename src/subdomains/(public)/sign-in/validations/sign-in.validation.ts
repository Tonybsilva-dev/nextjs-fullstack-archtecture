import z from 'zod';

export const signInZodSchema = (t: (key: string) => string) => {
  return z.object({
    email: z.string().email({ message: t('validation.email') }),
    password: z.string().min(6, { message: t('validation.password') }),
    rememberMe: z.boolean().optional(),
  });
};

export type SignInFormValues = z.infer<ReturnType<typeof signInZodSchema>>;
