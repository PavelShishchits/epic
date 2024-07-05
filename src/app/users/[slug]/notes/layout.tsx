import NavLink from "@/components/NavLink/NavLink";

type NotesLayoutProps = Readonly<{
  params?: {
    slug?: string;
  };
  children: React.ReactNode
}>

export default function NotesLayout({
  children,
  params
}: NotesLayoutProps) {
  return (
    <div className="flex border-2 border-orange-600">
      <div className="p-4 w-1/4 border-2 border-blue-200">
        <ul>
          <li>
            <NavLink href={`/users/${params?.slug}`}>Back to {params?.slug}</NavLink>
          </li>
          <li>
            <NavLink href={`/users/${params?.slug}/notes/1`}>User&apos;s Notes 1</NavLink>
          </li>
          <li>
            <NavLink href={`/users/${params?.slug}/notes/2`}>User&apos;s Notes 2</NavLink>
          </li>
          <li>
            <NavLink href={`/users/${params?.slug}/notes/3`}>User&apos;s Notes 3</NavLink>
          </li>
        </ul>
      </div>
      <div className="p-4 w-3/4 border-2 border-violet-600">{children}</div>
    </div>
  );
}
