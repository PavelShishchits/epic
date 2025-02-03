import { IAuthenticationService } from '@/application/services/authentication.service.interface';
import { UnauthenticatedError } from '@/entities/errors';
import { Session } from '@/entities/models/session';
import env from '@/lib/env';
import { SESSION_NAME, decrypt, encrypt } from '@/lib/session-management';

class AuthentificationService implements IAuthenticationService {
  async createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7d
    const session = await encrypt({ userId, expiresAt });

    const cookie = {
      name: SESSION_NAME,
      value: session,
      attributes: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax' as 'lax',
        path: '/',
      },
    };

    return {
      cookie,
    };
  }

  async validateSession(
    sessionId: string
  ): Promise<{ userId: string; session: Session }> {
    const session = (await decrypt(sessionId)) as Session;

    if (!session?.userId) {
      throw new UnauthenticatedError('Unauthenticated');
    }

    return {
      userId: session.userId,
      session: session,
    };
  }

  async invalidateSession(sessionId: string): Promise<void> {
    console.log(`Session with ID ${sessionId} invalidated.`);
  }
}

export { AuthentificationService };
