import NavLink from "@/components/NavLink/NavLink";

export default function UsersPage() {
  return (
    <div>
      <h1>Users Page</h1>
      <ul>
        <li>
          <NavLink href="/users/1">User 1</NavLink>
        </li>
        <li>
          <NavLink href="/users/2">User 2</NavLink>
        </li>
        <li>
          <NavLink href="/users/3">User 3</NavLink>
        </li>
      </ul>
    </div>
  );
}
