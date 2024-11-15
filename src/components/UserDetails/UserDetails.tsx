import NavLink from '@/components/NavLink/NavLink';
import { db } from '@/infrastructure/db/db.server';
import Typography from '@/components/ui/Typography/Typography';
import { notFound } from 'next/navigation';

interface UserDetailsProps {
  userName: string;
}

const UserDetails = async ({ userName }: UserDetailsProps) => {
  const user = await db.user.findFirst({
    where: {
      username: {
        equals: userName,
      },
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <Typography variant="h2" tag="h1">
        {user.name}
      </Typography>
      <ul>
        <li>
          <NavLink href={`/users/${userName}/notes`} className="underline">
            Notes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserDetails;
