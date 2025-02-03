import { getAuthenticatedUserUseCase } from '@/application/use-cases/user/get-authenticated-user.use-case';
import { UnauthenticatedError } from '@/entities/errors';
import { User } from '@/entities/models/user';
import { AuthentificationService } from '@/infrastructure/services/authentication.service';

function presenter(user: User) {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    image: user.image,
    notes: user.notes,
    createdAt: user.createdAt,
  };
}

export async function getAuthenticatedUserController({
  sessionId,
}: {
  sessionId: string;
}) {
  if (!sessionId) {
    throw new UnauthenticatedError('Unauthenticated');
  }

  const authenticationService = new AuthentificationService();
  const { userId } = await authenticationService.validateSession(sessionId);

  const user = await getAuthenticatedUserUseCase({ userId });

  return presenter(user);
}
