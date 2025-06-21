import { AuthenticationError } from '@/entities/errors';
import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function loginUseCase(input: {
  username: string;
  password: string;
  rememberMe?: boolean;
}) {
  const userRepository = new UserRepository();
  const authenticationService = new AuthentificationService();
  const existingUser = await userRepository.getUserByUsername(input.username);

  if (!existingUser) {
    throw new AuthenticationError('User not found');
  }

  const validPassword = await authenticationService.validatePassword(
    input.password,
    existingUser.password
  );

  if (!validPassword) {
    throw new AuthenticationError('Invalid username or password');
  }

  const userId = existingUser.id;

  const { cookie } = await authenticationService.createSession({
    userId,
    rememberMe: input.rememberMe,
  });

  return {
    user: existingUser,
    cookie: cookie,
  };
}
