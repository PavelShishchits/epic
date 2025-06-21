import { NotFoundError } from '@/entities/errors';
import { UserRepository } from '@/infrastructure/repositories/users.repository';

export async function getUserUseCase(username: string) {
  // toDo DI
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByUsername(username);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  return user;
}
