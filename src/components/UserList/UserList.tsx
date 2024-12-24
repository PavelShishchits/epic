import NavLink from '@/components/NavLink/NavLink';
import { prisma } from '@/infrastructure/db/db.server';

const UserList = async () => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      name: true,
      id: true,
    },
  });

  return (
    <ul>
      {users.map((user) => {
        return (
          <li className="mb-2" key={user.id}>
            <NavLink href={`/users/${user.username}`}>{user.name}</NavLink>
          </li>
        );
      })}
      <li></li>
    </ul>
  );
};

export default UserList;
