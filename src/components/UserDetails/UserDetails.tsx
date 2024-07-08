import NavLink from "@/components/NavLink/NavLink";
import { db } from "@/utils/db.server";

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
      <h1 className="text-h2">{user?.name}</h1>
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