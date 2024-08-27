import NavLink from "@/components/NavLink/NavLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "A note taking app",
}

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
