import { z } from 'zod';

const userRegisterSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Invalid email address'),
});

const userLoginSchema = z.object({
  username: z.string().min(1),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

const searchUsersSchema = z.object({
  username: z.string().optional(),
});

export { userRegisterSchema, searchUsersSchema, userLoginSchema };
