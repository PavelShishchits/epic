import NavLink from '@/components/NavLink/NavLink';
import { prisma } from '@/infrastructure/db/db.server';
import { getUserImageSrc } from '@/utils/misc';
import Image from 'next/image';
import { type UserSearchResults } from '@/schema/userSearchResult';
import { Prisma } from '@prisma/client';

interface UserListProps {
  usernameQuery?: string;
}

const UserList = async ({ usernameQuery }: UserListProps) => {
  const like = `%${usernameQuery ?? ''}%`;
  console.log('UserList:render');

  const users = await prisma.$queryRaw<UserSearchResults>(
    Prisma.sql`
      SELECT User.id, User.name, User.username, UserImage.id AS imageId
      FROM User
      LEFT JOIN UserImage ON UserImage.userId = User.id
      WHERE User.username
      LIKE ${like} OR User.name LIKE ${like}
      ORDER BY (
        SELECT Note.updatedAt
        FROM Note
        WHERE Note.ownerId = User.id
        ORDER BY Note.updatedAt DESC
        LIMIT 1
      ) DESC
      LIMIT 50`
  );

  if (!users.length) {
    return <p>No users found</p>;
  }

  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-4">
      {users.map((user) => {
        return (
          <li key={user.id}>
            <NavLink
              href={`/users/${user.username}`}
              className="flex h-36 w-44 flex-col items-center justify-center rounded-lg bg-muted px-5 py-3"
            >
              <Image
                alt={user.name ?? user.username}
                src={getUserImageSrc(user.imageId)}
                className="h-16 w-16 rounded-full mb-2"
                width={64}
                height={64}
              />
              {user.name ? (
                <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-body-md">
                  {user.name}
                </span>
              ) : null}
              <span className="w-full overflow-hidden text-ellipsis text-center text-body-sm text-muted-foreground">
                {user.username}
              </span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
