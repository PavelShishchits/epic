import {
  User as PrismaUser,
  UserImage as PrismaUserImage,
} from '@prisma/client';

import { Note } from './note';

type User = PrismaUser & {
  notes?: Note[];
  image?: UserImage | null;
};

type UserWithNotes = PrismaUser & {
  notes: Note[];
};

type CreateUser = {
  email: string;
  username: string;
  name: string;
  password: string;
};

type UpdateUser = {
  email?: string;
  username?: string;
  name?: string;
  password?: string;
  image?: {
    altText: string;
    contentType: string;
    blob: Buffer;
  } | null;
};

type UserImage = PrismaUserImage;

export type { User, UserWithNotes, CreateUser, UpdateUser, UserImage };
