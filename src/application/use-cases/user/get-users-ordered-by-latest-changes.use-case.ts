import { UserRepository } from '@/infrastructure/repositories/users.repository';

export async function getUsersOrderedByLatestChangesUseCase(query?: string) {
  const userRepository = new UserRepository();
  const users = await userRepository.getUsersOrderedByLatestChanges(query);

  return users;
}
