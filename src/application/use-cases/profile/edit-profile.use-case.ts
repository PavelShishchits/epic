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

  const [existingUsername, existingEmail] = await Promise.all([
    username !== existingUser.username
      ? userRepository.getUserByName(username)
      : undefined,
    email !== existingUser.email
      ? userRepository.getUserByEmail(email)
      : undefined,
  ]);

  if (existingUsername) {
    throw new AuthenticationError('Username already exists');
  }

  if (existingEmail) {
    throw new AuthenticationError('Email already exists');
  }

  let newImage = null;
  try {
    newImage =
      image && image.size > 0
        ? {
            altText: username,
            contentType: image.type,
            blob: Buffer.from(await image.arrayBuffer()),
          }
        : null;
  } catch (e) {
    //
  }

  return await userRepository.updateUser(userId, {
    username,
    name,
    email,
    image: newImage,
  });
}
