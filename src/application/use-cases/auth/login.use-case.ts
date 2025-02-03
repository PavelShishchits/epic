import { AuthenticationError } from '@/entities/errors/index';
import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function loginUseCase(input: {
  username: string;
  password: string;
}) {
  const userRepository = new UserRepository();
  const authenticationService = new AuthentificationService();
  const existingUser = await userRepository.getUserByName(input.username);

  if (!existingUser) {
    throw new AuthenticationError('User not found');
  }

  // toDo check if password is equal

  const userId = existingUser.id;

  // create session
  const { cookie } = await authenticationService.createSession(userId);

  return {
    user: existingUser,
    cookie: cookie,
  };
}
