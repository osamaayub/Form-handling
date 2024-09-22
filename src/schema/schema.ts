import { z, ZodType } from 'zod';

export type FormData = {
  username: string;
  email: string;
  password: string;
  ConfirmPassword: string;
};

export const schema: ZodType<FormData> = z
  .object({
    username: z
      .string({
        required_error: 'Username is shorter than 5 characters.',
      })
      .min(5)
      .max(30),
    email: z
      .string({
        required_error: 'Email format is invalid.',
      })
      .email({ message: 'Invalid Email format' }),
    password: z
      .string({
        required_error: 'Password is shorter than 8 characters.',
      })
      .min(8),
    ConfirmPassword: z
      .string({
        required_error: 'Password is shorter than 8 characters.',
      })
      .min(8),
  })
  .refine((data) => data.password === data.ConfirmPassword, {
    message: 'password donot match',
    path: ['ConfirmPassword'],
  });
