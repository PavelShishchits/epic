import type { Cookie } from '@/entities/models/cookie';
import type { Session } from '@/entities/models/session';

export interface IAuthenticationService {
  createSession(params: {
    userId: string;
    rememberMe?: boolean;
  }): Promise<{ cookie: Cookie }>;
  updateSession(session: string): Promise<{ cookie: Cookie }>;
  validateSession(
    sessionId: string
  ): Promise<{ userId: string; session: Session }>;
  invalidateSession(sessionId: string): Promise<void>;
  validatePassword(
    inputPassword: string,
    userPasswordHash: string
  ): Promise<boolean>;
}
