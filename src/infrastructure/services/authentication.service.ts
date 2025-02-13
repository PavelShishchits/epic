import { compare } from 'bcrypt-ts';

import { IAuthenticationService } from '@/application/services/authentication.service.interface';
import { UnauthenticatedError } from '@/entities/errors';
import { Session } from '@/entities/models/session';
import { SESSION_NAME, getSessionExpiratationDate } from '@/lib/auth.server';
import env from '@/lib/env';
import { decrypt, encrypt } from '@/lib/session-management';

class AuthentificationService implements IAuthenticationService {
  async createSession({
    userId,
    rememberMe,
  }: {
    userId: string;
    rememberMe?: boolean;
  }) {
    const expiresAt = getSessionExpiratationDate();
    const session = await encrypt({ userId, expiresAt });

    const cookie = {
      name: SESSION_NAME,
      value: session,
      attributes: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        expires: rememberMe ? expiresAt : undefined,
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

  async validatePassword(inputPassword: string, userPasswordHash: string) {
    return compare(inputPassword, userPasswordHash);
  }
}

export { AuthentificationService };
