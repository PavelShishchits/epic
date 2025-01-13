import type { Prisma } from '@prisma/client';
import type { IUserRepository } from '@/application/repositories/user.repository.interface';
import { prisma } from '@/infrastructure/db/db.server';
import { DatabaseOperationError } from '@/entities/errors';
import { getUsers } from '@prisma/client/sql';

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
