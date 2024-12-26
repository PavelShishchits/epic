import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const execute = async () => {
  const result = await prisma.$queryRaw`
    EXPLAIN QUERY PLAN
    SELECT User.id, User.name, User.username, UserImage.id AS imageId
    FROM User
    LEFT JOIN UserImage ON UserImage.userId = User.id
    WHERE User.username
    LIMIT 50
  `;
  console.log(result);
};

execute();
