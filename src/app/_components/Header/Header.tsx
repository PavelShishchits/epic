import Link from 'next/link';

import { getAuthenticatedUserCached } from '@/app/_cached/get-authenticated-user.cached';
import { ThemeSwitcher } from '@/app/_components/ThemeSwitcher/ThemeSwitcher';
import Button from '@/app/_components/ui/Button/Button';
import { getSessionId } from '@/app/_utils/getSessionId';

const Header = async () => {
  let user = null;
  const sessionId = await getSessionId();

  if (sessionId) {
    user = await getAuthenticatedUserCached({ sessionId });
  }

  return (
    <header className="p-6">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <span>{user.username}</span>
          ) : (
            <Button asChild variant="link">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
