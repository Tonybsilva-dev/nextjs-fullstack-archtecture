import z from 'zod';

export const signInZodSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: 'Passowrd must be at least 6 characters.',
    })
    .max(12),
});

export type SignIn = z.infer<typeof signInZodSchema>;
