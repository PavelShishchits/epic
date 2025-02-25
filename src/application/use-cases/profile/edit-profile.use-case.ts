import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { EditUserProfileSchema } from '@/schema/user';

export async function editProfileUseCase(
  userId: string,
  data: EditUserProfileSchema
) {
  const { username, name, image, email } = data;

  const userRepository = new UserRepository();

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
