import { parseWithZod } from '@conform-to/zod';

import { signUpUseCase } from '@/application/use-cases/auth/sign-up.use.case';
import { InputParseError } from '@/entities/errors';
import { userRegisterSchema } from '@/schema/user';

export async function signUpController(input: any) {
  const parsedResult = parseWithZod(input, {
    schema: userRegisterSchema,
  });

  if (parsedResult.status !== 'success') {
    throw new InputParseError('Invalid user data', {
      cause: parsedResult.error,
    });
  }

  const { username, name, email, password } = parsedResult.value;

  const { cookie } = await signUpUseCase({ username, name, email, password });

  return { cookie };
}
