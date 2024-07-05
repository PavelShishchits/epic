"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface NavLinkProps extends LinkProps {
  activeClass?: string;
  className?: string;
  children: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => {
  const {
    className,
    activeClass = "text-blue-600",
    children,
    ...linkProps
  } = props;
  const pathname = usePathname();

  return (
    <Link
      {...linkProps}
      className={classNames(
        className,
        pathname === linkProps.href ? activeClass : ""
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
