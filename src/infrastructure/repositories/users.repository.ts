import type { Prisma } from '@prisma/client';
import { getUsers } from '@prisma/client/sql';

import type { IUserRepository } from '@/application/repositories/user.repository.interface';
import { User } from '@/entities/models/user';
import { prisma } from '@/infrastructure/db/db.server';

export class UserRepository implements IUserRepository {
  constructor() {}

  async getUsers<T extends Prisma.UserSelect>(selectFields: T) {
    const users = await prisma.user.findMany({
      select: selectFields,
    });

    return users;
  }

  async getUsersOrderedByLatestChanges(query?: string) {
    const like = `%${query ?? ''}%`;

    const users = await prisma.$queryRawTyped(getUsers(like));

    return users;
  }

  async getUserByName(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        notes: true,
        image: true,
      },
    });

    return user;
  }

  async getUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        notes: true,
        image: true,
      },
    });

    return user;
  }
}
