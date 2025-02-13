import { cookies } from 'next/headers';

import 'server-only';

import { SESSION_NAME } from '@/lib/auth.server';

async function getSessionId() {
  const cookiesStore = await cookies();
  return cookiesStore.get(SESSION_NAME)?.value;
}

export { getSessionId };
