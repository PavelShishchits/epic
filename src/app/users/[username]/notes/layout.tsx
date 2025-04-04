import NextImage from 'next/image';
import { notFound } from 'next/navigation';

import { getUserCached } from '@/app/_cached/get-user.cached';
import NavLink from '@/app/_components/NavLink/NavLink';
import NoteSidebarList from '@/app/_components/NotesSidebarList/NotesSidebarList';
import Typography from '@/app/_components/ui/Typography/Typography';
import { getUserImageSrc } from '@/app/_utils/misc';

type NotesLayoutProps = Readonly<{
  params: Promise<{
    username: string;
  }>;
  children: React.ReactNode;
}>;

export default async function NotesLayout({
  children,
  params,
}: NotesLayoutProps) {
  const { username: userNameParam } = await params;

  const user = await getUserCached(userNameParam);

  if (!user) {
    notFound();
  }

  const userName = user?.username ?? user?.name ?? userNameParam;

  return (
    <div className="container ml-auto mr-auto flex h-full">
      <div className="p-4 w-1/4 bg-muted rounded-3xl">
        <div className="mb-4 pt-4">
          <NavLink
            href={`/users/${userNameParam}`}
            className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:justify-start lg:gap-4"
          >
            <NextImage
              src={getUserImageSrc(user?.image?.id)}
              alt={userName}
              className="h-16 w-16 rounded-full object-cover lg:h-24 lg:w-24"
              width={96}
              height={96}
            />
            <Typography variant={'h5'} tag="h1">
              {userName}&apos;s Notes
            </Typography>
          </NavLink>
        </div>
        <NoteSidebarList
          userId={user.id}
          userName={userNameParam}
          notes={user?.notes}
        />
      </div>
      <div className="p-4 w-3/4 h-full">{children}</div>
    </div>
  );
}
