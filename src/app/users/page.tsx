import NavLink from "@/components/NavLink/NavLink";

export default function UsersPage() {
  return (
    <div>
      <h1>Users Page</h1>
      <ul>
        <li>
          <NavLink href="/users/kody">Kody</NavLink>
        </li>
      </ul>
    </div>
  );
}
