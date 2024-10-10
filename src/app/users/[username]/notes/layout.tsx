import NavLink from "@/components/NavLink/NavLink";
import { db } from "@/infrastructure/db/db.server";
import NoteSidebarList from "@/components/NotesSidebarList/NotesSidebarList";
import { Suspense } from "react";

type NotesLayoutProps = Readonly<{
  params?: {
    username?: string;
  };
  children: React.ReactNode;
}>;

export default async function NotesLayout({
  children,
  params,
}: NotesLayoutProps) {
  const userNameParam = params?.username || "";

  const user = await db.user.findFirst({
    where: {
      username: {
        equals: userNameParam,
      },
    },
  });

  const userName = user?.name ?? user?.username ?? userNameParam;

  return (
    <div className="flex border-2 border-orange-600 h-full">
      <div className="p-4 w-1/4 border-2 border-blue-200">
        <div className="mb-4">
          <NavLink href={`/users/${userNameParam}`}>Back to {userName}</NavLink>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <NoteSidebarList userName={userNameParam} />
        </Suspense>
      </div>
      <div className="p-4 w-3/4 border-2 border-violet-600 h-full">{children}</div>
    </div>
  );
}
