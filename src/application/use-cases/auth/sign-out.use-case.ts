import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function signOutUseCase(sessionId: string) {
  const authenticationService = new AuthentificationService();

  return await authenticationService.invalidateSession(sessionId);
}
