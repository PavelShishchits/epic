import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import Typography from '@/app/_components/ui/Typography/Typography';

import ChangeProfileForm from './_components/ChangeProfile/ChangeProfile';

export default async function ProfilePage() {
  const user = await getAuthenticatedUserCached();

  if (!user) return null;

  return (
    <div className="container">
      <Typography variant={'h2'} tag="h1">
        Profile page
      </Typography>
      <ChangeProfileForm
        user={{
          username: user.username,
          name: user.name,
          email: user.email,
          imageId: user.image?.id,
        }}
      />
    </div>
  );
}
