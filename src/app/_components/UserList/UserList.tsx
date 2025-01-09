import NavLink from '@/app/_components/NavLink/NavLink';
import { prisma } from '@/infrastructure/db/db.server';
import { getUserImageSrc } from '@/utils/misc';
import Image from 'next/image';
import { getUsers } from '@prisma/client/sql';

interface UserListProps {
  usernameQuery?: string;
}

const UserList = async ({ usernameQuery }: UserListProps) => {
  const like = `%${usernameQuery ?? ''}%`;

  const users = await prisma.$queryRawTyped(getUsers(like));

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
