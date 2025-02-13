import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, { message: 'Be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Contain at least one special character.',
  })
  .trim();

const userRegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email('Invalid email address'),
    username: z.string().min(1, { message: 'Username is required' }),
    name: z.string().optional(),
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.boolean({ message: 'Terms shoul be accepted' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const userLoginSchema = z.object({
  username: z.string().min(1),
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

const searchUsersSchema = z.object({
  username: z.string().optional(),
});

export { userRegisterSchema, searchUsersSchema, userLoginSchema };
