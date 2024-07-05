import NavLink from "@/components/NavLink/NavLink";

interface UserDetailPageProps {
  params?: {
    slug?: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  return (
    <div className="py-6 border-2 border-orange-400">
      <h1>User Detail Page {params?.slug}</h1>
      <ul>
        <li>
          <NavLink href={`/users/${params?.slug}/notes`}>User&apos;s Notes</NavLink>
        </li>
      </ul>
    </div>
  );
}
