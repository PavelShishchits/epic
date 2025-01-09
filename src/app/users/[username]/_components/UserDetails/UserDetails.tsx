import NavLink from '@/app/_components/NavLink/NavLink';
import Typography from '@/app/_components/ui/Typography/Typography';
import NextImage from 'next/image';
import Button from '@/app/_components/ui/Button/Button';
import { getUserImageSrc } from '@/utils/misc';
import { getUserCached } from '@/services/userService/userService';
import { notFound } from 'next/navigation';

interface UserDetailsProps {
  userName: string;
}

const UserDetails = async ({ userName }: UserDetailsProps) => {
  const user = await getUserCached(userName);

  if (!user) {
    return notFound();
  }

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
          <div className="mt-10 flex gap-4">
            <Button asChild>
              <NavLink href={`/users/${userName}/notes`}>
                {userDisplayName}&apos;s notes
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
