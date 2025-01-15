import type { Prisma } from '@prisma/client';
import { getUsers } from '@prisma/client/sql';

import type { IUserRepository } from '@/application/repositories/user.repository.interface';
import { DatabaseOperationError } from '@/entities/errors';
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

  async getUserByName(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        notes: true,
        image: true,
      },
    });

    if (!user) {
      throw new DatabaseOperationError('User not found');
    }

    return user;
  }
}
