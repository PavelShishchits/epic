import { AuthenticationError } from '@/entities/errors';
import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { EditUserProfileSchema } from '@/schema/user';

export async function editProfileUseCase(
  userId: string,
  data: EditUserProfileSchema
) {
  const { username, name, image, email } = data;
  const userRepository = new UserRepository();

  const existingUser = await userRepository.getUser(userId);

  if (!existingUser) {
    throw new AuthenticationError('User not found');
  }

  if (username !== existingUser.username) {
    const usernameExists = await userRepository.getUserByName(username);

    if (usernameExists) {
      throw new AuthenticationError('Username already exists');
    }
  }

  if (email !== existingUser.email) {
    const emailExists = await userRepository.getUserByEmail(email);

    if (emailExists) {
      throw new AuthenticationError('Email already exists');
    }
  }

  const newImage =
    image && image.size > 0
      ? {
          altText: image.name,
          contentType: image.type,
          blob: Buffer.from(await image.arrayBuffer()),
        }
      : null;

  return await userRepository.updateUser(userId, {
    username,
    name,
    email,
    image: newImage,
  });
}
