import classNames from "classnames";
import Link from "next/link";
import { forwardRef } from "react";

interface MyLinkProps {
  children: any;
  customClass: string;
  href: string;
  ref: string;
}
const MyLink = forwardRef(({ children, customClass = "", href, ref }: MyLinkProps) => {
  return (
    <Link href={href}>
      <a ref={ref} className={classNames(`${customClass}`)}>
        {children}
      </a>
    </Link>
  );
});

MyLink.displayName = "MyLink";
export default MyLink;
