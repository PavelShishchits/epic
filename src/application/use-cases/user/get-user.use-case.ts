import { UserRepository } from '@/infrastructure/repositories/users.repository';

export async function getUserUseCase(username: string) {
  // toDo DI
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByName(username);

  return user;
}
