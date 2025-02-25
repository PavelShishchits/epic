import { parseWithZod } from '@conform-to/zod';

import { editProfileUseCase } from '@/application/use-cases/profile/edit-profile.use-case';
import { InputParseError } from '@/entities/errors';
import { User } from '@/entities/models/user';
import { editUserProfileSchema } from '@/schema/user';

function presenter(user: User) {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email,
    image: user.image,
  };
}

export async function editProfileController(userId: string, input: any) {
  const parsedResult = parseWithZod(input, {
    schema: editUserProfileSchema,
  });

  if (parsedResult.status !== 'success') {
    throw new InputParseError('Invalid data', { cause: parsedResult.error });
  }

  const user = await editProfileUseCase(userId, parsedResult.value);

  return presenter(user);
}
