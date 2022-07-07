import classNames from "classnames";
import Link from "next/link";
import { forwardRef, LegacyRef } from "react";

interface MyLinkProps {
  href: string;
  customClass: string;
  children: any;
}

const MyLink = forwardRef(
  ({ href, customClass, children }: MyLinkProps, ref: LegacyRef<HTMLAnchorElement>) => {
    return (
      <Link href={href}>
        <a ref={ref} className={classNames(`${customClass}`)}>
          {children}
        </a>
      </Link>
    );
  }
);

MyLink.displayName = "MyLink";
export default MyLink;
