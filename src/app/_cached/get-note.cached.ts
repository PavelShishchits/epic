import { cache } from 'react';

import { getNoteController } from '@/interface-adapters/controllers/get-note.controller';

const getNoteCached = cache(getNoteController);

export { getNoteCached };
