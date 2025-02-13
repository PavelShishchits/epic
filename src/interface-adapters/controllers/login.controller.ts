import { parseWithZod } from '@conform-to/zod';

import { loginUseCase } from '@/application/use-cases/auth/login.use-case';
import { InputParseError } from '@/entities/errors';
import { userLoginSchema } from '@/schema/user';

export async function loginController(input: any) {
  const parsedResult = parseWithZod(input, {
    schema: userLoginSchema,
  });

  if (parsedResult.status !== 'success') {
    throw new InputParseError('Invalid user data', {
      cause: parsedResult.error,
    });
  }

  const { username, password, rememberMe } = parsedResult.value;

  const { cookie } = await loginUseCase({ username, password, rememberMe });

  return { cookie };
}
