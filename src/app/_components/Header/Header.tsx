import Link from 'next/link';

import { User } from 'lucide-react';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import { LogoutForm } from '@/app/_components/LogoutForm/LogoutForm';
import { ThemeSwitcher } from '@/app/_components/ThemeSwitcher/ThemeSwitcher';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/Avatar/Avatar';
import Button from '@/app/_components/ui/Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/DropdownMenu/DropdownMenu';
import { getUserImageSrc } from '@/app/_utils/misc';

const Header = async () => {
  const user = await getAuthenticatedUserCached();

  const avatarUserName = user?.username.substring(0, 2).toLocaleUpperCase();

  return (
    <header className="p-6">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={getUserImageSrc(user.image?.id)}
                    alt="avatar"
                  />
                  <AvatarFallback>{avatarUserName}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Button
                    className="justify-start p-0 h-auto w-full"
                    asChild
                    variant={'link'}
                  >
                    <Link href={`/users/${user?.username}`}>
                      {"User's page"}
                    </Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogoutForm className="w-full">
                    <Button
                      className="justify-start p-0 h-auto w-full"
                      variant={'link'}
                    >
                      Logout
                    </Button>
                  </LogoutForm>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
