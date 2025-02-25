import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import Typography from '@/app/_components/ui/Typography/Typography';

import ChangeProfileForm from './_components/ChangeProfile/ChangeProfile';

export default async function ProfilePage() {
  const user = await getAuthenticatedUserCached();

  if (!user) return null;

  // console.log('user', user);

  return (
    <div className="container space-y-10">
      <Typography variant={'h2'} tag="h1">
        Profile page
      </Typography>
      <Typography variant={'h3'} tag="h2">
        Edit profile
      </Typography>
      <ChangeProfileForm
        user={{
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          imageId: user.image?.id,
        }}
      />
      <Typography variant={'h3'} tag="h2">
        Change profile
      </Typography>
    </div>
  );
}
