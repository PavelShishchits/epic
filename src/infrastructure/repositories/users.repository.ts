import type { Prisma, PrismaClient } from '@prisma/client';

interface IUserRepository {
  getUsers: <T extends Prisma.UserSelect>(
    selectFields: T
  ) => Promise<Prisma.UserGetPayload<{ select: T }>[]>;

  getUserByName: <T extends Prisma.UserSelect>(
    username: string,
    selectFields: T
  ) => Promise<Prisma.UserGetPayload<{ select: T }> | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly database: PrismaClient) {}

  async getUsers<T extends Prisma.UserSelect>(selectFields: T) {
    const users = await this.database.user.findMany({
      select: selectFields,
    });

    return users;
  }

  async getUserByName<T extends Prisma.UserSelect>(
    username: string,
    selectFields: T
  ) {
    const user = await this.database.user.findUnique({
      where: { username },
      select: selectFields,
    });

    return user;
  }
}
