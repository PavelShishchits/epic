import { AuthenticationError } from '@/entities/errors';
import { UserRepository } from '@/infrastructure/repositories/users.repository';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function signUpUseCase(input: {
  username: string;
  email: string;
  name?: string;
  password: string;
}) {
  const userRepository = new UserRepository();
  const authenticationService = new AuthentificationService();

  const [existingUsername, existingEmail] = await Promise.all([
    userRepository.getUserByName(input.username),
    userRepository.getUserByEmail(input.email),
  ]);

  if (existingUsername) {
    throw new AuthenticationError('Username already exists');
  }

  if (existingEmail) {
    throw new AuthenticationError('Email already exists');
  }

  const newUser = await userRepository.createUser({
    username: input.username,
    email: input.email,
    name: input.name || undefined,
    password: input.password,
  });

  const { cookie } = await authenticationService.createSession({
    userId: newUser.id,
    rememberMe: true,
  });

  return {
    user: newUser,
    cookie: cookie,
  };
}
