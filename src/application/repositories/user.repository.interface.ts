import { Prisma } from '@prisma/client';
import { getUsers } from '@prisma/client/sql';

import type { CreateUser, UpdateUser, User } from '@/entities/models/user';

export interface IUserRepository {
  getUsers: <T extends Prisma.UserSelect>(
    selectFields: T
  ) => Promise<Prisma.UserGetPayload<{ select: T }>[]>;

  getUsersOrderedByLatestChanges(query?: string): Promise<getUsers.Result[]>;
  getUserByName(username: string): Promise<User | null>;
  getUser(id: string): Promise<User | null>;
  createUser(input: CreateUser): Promise<User>;
  updateUser(id: string, input: UpdateUser): Promise<User>;
}
