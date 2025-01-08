import {
  User as PrismaUser,
  UserImage as PrismaUserImage,
} from '@prisma/client';
import { Note } from './note';

export type User = PrismaUser & {
  notes?: Note[];
  image?: UserImage;
};

export type UserWithNotes = PrismaUser & {
  notes: Note[];
};

export type UserImage = PrismaUserImage;
