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

  const validPassord = await authenticationService.validatePassword(
    input.password,
    existingUser.password
  );

  if (!validPassord) {
    throw new AuthenticationError('Invalid username or password');
  }

  const userId = existingUser.id;

  // create session
  const { cookie } = await authenticationService.createSession(userId);

  return {
    user: existingUser,
    cookie: cookie,
  };
}
