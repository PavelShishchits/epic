import { getNoteController } from '@/interface-adapters/controllers/get-note.controller';
import { cache } from 'react';

const getNoteCached = cache(getNoteController);

export { getNoteCached };
