import Link from 'next/link';
import Button from '@/app/_components/ui/Button/Button';

const Header = () => {
  return (
    <header className="p-6 border-2 border-sky-100">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <Button asChild variant="link">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
