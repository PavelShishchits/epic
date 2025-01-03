import NavLink from '@/components/NavLink/NavLink';
import { prisma } from '@/infrastructure/db/db.server';
import { getUserImageSrc } from '@/utils/misc';
import NextImage from 'next/image';
import Typography from '@/components/ui/Typography/Typography';
import NoteSidebarList from '@/components/NotesSidebarList/NotesSidebarList';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getUserByUsername = cache(async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      name: true,
      username: true,
      image: {
        select: { id: true },
      },
      notes: {
        select: { id: true, title: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return user;
});

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

  const user = await getUserByUsername(userNameParam);
  const userName = user?.name ?? user?.username ?? userNameParam;

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
        <NoteSidebarList userName={userNameParam} notes={user?.notes} />
      </div>
      <div className="p-4 w-3/4 h-full">{children}</div>
    </div>
  );
}
