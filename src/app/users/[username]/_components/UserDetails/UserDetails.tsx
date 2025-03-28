import NextImage from 'next/image';
import { notFound } from 'next/navigation';

import { LogOutIcon } from 'lucide-react';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import { getUserCached } from '@/app/_cached/get-user.cached';
import { LogoutForm } from '@/app/_components/LogoutForm/LogoutForm';
import NavLink from '@/app/_components/NavLink/NavLink';
import Button from '@/app/_components/ui/Button/Button';
import Typography from '@/app/_components/ui/Typography/Typography';
import { getUserImageSrc } from '@/app/_utils/misc';

interface UserDetailsProps {
  userName: string;
}

const UserDetails = async ({ userName }: UserDetailsProps) => {
  const user = await getUserCached(userName);

  if (!user) {
    return notFound();
  }

  const authenticatedUser = await getAuthenticatedUserCached();

  const isAuthenticatedUser = user.id === authenticatedUser?.id;

  const userJoinedDate = new Date(user.createdAt).toLocaleDateString();
  const userDisplayName = user.name ?? userName;

  return (
    <div className="container ml-auto mr-auto mb-48 mt-36 flex flex-col items-center justify-center">
      <div className="h-4" />
      <div className="container flex flex-col items-center rounded-3xl bg-muted p-12">
        <div className="relative w-52">
          <div className="absolute -top-40">
            <div className="relative">
              <NextImage
                src={getUserImageSrc(user.image?.id)}
                alt={userDisplayName}
                className="h-52 w-52 rounded-full object-cover"
                width={208}
                height={208}
              />
            </div>
          </div>
        </div>

        <div className="h-20" />

        <div className="flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Typography variant={'h2'} tag="h1">
              {userDisplayName}
            </Typography>
          </div>
          <Typography
            variant={'p'}
            tag={'p'}
            className="mt-2 mb-0 text-center text-muted-foreground"
          >
            Joined {userJoinedDate}
          </Typography>
          {isAuthenticatedUser ? (
            <LogoutForm>
              <Button
                className="mt-2"
                iconBefore={<LogOutIcon />}
                variant={'link'}
              >
                Logout
              </Button>
            </LogoutForm>
          ) : null}
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <NavLink href={`/users/${userName}/notes`}>
                {isAuthenticatedUser
                  ? 'My notes'
                  : `${userDisplayName}&apos;s notes`}
              </NavLink>
            </Button>
            <Button asChild>
              <NavLink href="/settings/profile">Edit profile</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
