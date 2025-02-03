import type { Cookie } from '@/entities/models/cookie';
import type { Session } from '@/entities/models/session';

export interface IAuthenticationService {
  createSession(userId: string): Promise<{ cookie: Cookie }>;
  validateSession(
    sessionId: string
  ): Promise<{ userId: string; session: Session }>;
  invalidateSession(sessionId: string): Promise<void>;
  // validatePassword()
}
