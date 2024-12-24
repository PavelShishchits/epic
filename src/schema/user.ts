import { z } from 'zod';

const userRegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Invalid email address'),
});

const searchUsersSchema = z.object({
  username: z.string().optional(),
});

export { userRegisterSchema, searchUsersSchema };
