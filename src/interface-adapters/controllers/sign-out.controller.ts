import { signOutUseCase } from '@/application/use-cases/auth/sign-out.use-case';
import { InputParseError } from '@/entities/errors';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function signOutController(sessionId?: string) {
  if (!sessionId) {
    throw new InputParseError('Session id must be provided');
  }

  const authenticationService = new AuthentificationService();
  await authenticationService.validateSession(sessionId);

  return await signOutUseCase(sessionId);
}
