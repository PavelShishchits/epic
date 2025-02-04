import Link from 'next/link';

import { User } from 'lucide-react';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import { ThemeSwitcher } from '@/app/_components/ThemeSwitcher/ThemeSwitcher';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/Avatar/Avatar';
import Button from '@/app/_components/ui/Button/Button';
import { getSessionId } from '@/app/_utils/getSessionId';
import { getUserImageSrc } from '@/app/_utils/misc';

const Header = async () => {
  let user = null;
  const sessionId = await getSessionId();

  if (sessionId) {
    user = await getAuthenticatedUserCached({ sessionId });
  }

  const avatarUserName = user?.username.substring(0, 2).toLocaleUpperCase();

  return (
    <header className="p-6">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <Avatar>
              <AvatarImage src={getUserImageSrc(user.image?.id)} alt="avatar" />
              <AvatarFallback>{avatarUserName}</AvatarFallback>
            </Avatar>
          ) : (
            <Button asChild variant="link" iconBefore={<User />}>
              <Link href="/login">Login / Register</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
