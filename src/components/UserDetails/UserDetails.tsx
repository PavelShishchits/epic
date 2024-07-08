import NavLink from "@/components/NavLink/NavLink";
import { db } from "@/utils/db.server";
import Typography from "@/components/Typography/Typography";

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

  return (
    <div>
      <Typography variant="h2" tag="h1">{user?.name}</Typography>
      <ul>
        <li>
          <NavLink
            href={`/users/${userName}/notes`}
            className="underline"
          >
            Notes
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default UserDetails;