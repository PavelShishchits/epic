import { cache } from 'react';

import { getAuthenticatedUserController } from '@/interface-adapters/controllers/get-authenticated-user.controller';

const getAuthenticatedUserCached = cache(getAuthenticatedUserController);

export { getAuthenticatedUserCached };
