import { z } from 'zod';

export const userRegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Invalid email address'),
});
