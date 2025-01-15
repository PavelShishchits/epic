import type {
  Note as PrismaNote,
  NoteImage as PrismaNoteImage,
} from '@prisma/client';

import type { User } from './user';

export type Note = PrismaNote & {
  images?: NoteImage[];
  owner?: User;
};

export type NoteImage = PrismaNoteImage;
