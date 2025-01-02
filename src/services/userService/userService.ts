import { prisma } from '@/infrastructure/db/db.server';
import { cache } from 'react';

const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      name: true,
      createdAt: true,
      email: true,
      image: {
        select: {
          id: true,
        },
      },
    },
  });

  return user;
};

const getUserCached = cache(getUser);

export { getUser, getUserCached };
