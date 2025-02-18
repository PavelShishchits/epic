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
    const expiresAt = rememberMe ? getSessionExpiratationDate() : undefined;
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

  async updateSession(sessionId: string) {
    const session = (await decrypt(sessionId)) as Session;

    if (!session?.userId) {
      throw new UnauthenticatedError('Unauthenticated');
    }

    const expiresAt = session.expiresAt
      ? getSessionExpiratationDate()
      : undefined;

    const newSession = await encrypt({ userId: session.userId, expiresAt });

    const cookie = {
      name: SESSION_NAME,
      value: newSession,
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

    if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
      throw new UnauthenticatedError('Session expired');
    }

    return {
      userId: session.userId,
      session: session,
    };
  }

  async invalidateSession(sessionId: string) {
    const cookie = {
      name: SESSION_NAME,
      value: '',
      attributes: {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        expires: new Date(0),
        maxAge: 0,
        sameSite: 'lax' as 'lax',
        path: '/',
      },
    };

    return { cookie };
  }

  async validatePassword(inputPassword: string, userPasswordHash: string) {
    return compare(inputPassword, userPasswordHash);
  }
}

export { AuthentificationService };
