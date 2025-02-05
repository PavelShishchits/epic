import { AuthentificationService } from '@/infrastructure/services/authentication.service';

export async function signOutUseCase(sessionId: string) {
  const authenticationService = new AuthentificationService();

  await authenticationService.invalidateSession(sessionId);
}
