import { SignJWT, jwtVerify } from 'jose';
import 'server-only';

import env from '@/lib/env';

const secret = env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secret);

async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    console.log('Failed to verify session');
  }
}

export { encrypt, decrypt };
