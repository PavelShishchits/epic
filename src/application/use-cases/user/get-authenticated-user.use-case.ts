import { NotFoundError } from '@/entities/errors';
import { UserRepository } from '@/infrastructure/repositories/users.repository';

export async function getAuthenticatedUserUseCase({
  userId,
}: {
  userId: string;
}) {
  // toDo DI
  const userRepository = new UserRepository();
  const user = await userRepository.getUser(userId);

  if (!user) {
    throw new NotFoundError('User doesn not exits');
  }

  return user;
}
