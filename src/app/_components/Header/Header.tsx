import Link from 'next/link';

import { ThemeSwitcher } from '@/app/_components/ThemeSwitcher/ThemeSwitcher';
import Button from '@/app/_components/ui/Button/Button';

const Header = () => {
  return (
    <header className="p-6">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Button asChild variant="link">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
