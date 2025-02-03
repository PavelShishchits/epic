import { cache } from 'react';

import { getUserController } from '@/interface-adapters/controllers/get-user.controller';

const getUserCached = cache(getUserController);

export { getUserCached };
