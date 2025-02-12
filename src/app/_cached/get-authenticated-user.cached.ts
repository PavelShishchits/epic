import { cache } from 'react';

import { getAuthenticatedUserController } from '@/interface-adapters/controllers/get-authenticated-user.controller';

import { getSessionId } from '../_utils/getSessionId';

const getAuthenticatedUserCached = cache(async () => {
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  let user;
  try {
    user = await getAuthenticatedUserController({ sessionId });
  } catch (e: any) {
    console.log(e.message);
  }
  return user;
});

export { getAuthenticatedUserCached };
