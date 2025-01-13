import { Prisma } from '@prisma/client';
import type { User } from '@/entities/models/user';
import { getUsers } from '@prisma/client/sql';
export interface IUserRepository {
  getUsers: <T extends Prisma.UserSelect>(
    selectFields: T
  ) => Promise<Prisma.UserGetPayload<{ select: T }>[]>;

  getUsersOrderedByLatestChanges(query?: string): Promise<getUsers.Result[]>;
  getUserByName(username: string): Promise<User>;
}
