import Link from "next/link";

const Header = () => {
  return (
    <header className="p-6 border-2 border-sky-100">
      <div className="flex justify-between gap-3">
        <Link href="/">Logo</Link>
        <Link href="/sign-up">Sign up</Link>
      </div>
    </header>
  );
};

export default Header;
