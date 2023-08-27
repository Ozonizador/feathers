import classNames from "classnames";
import Link from "next/link";
import { forwardRef, LegacyRef, Ref } from "react";

interface MyLinkProps {
  href: string;
  customClass: string;
  children: any;
}

const MyLink = forwardRef(({ href, customClass, children }: MyLinkProps, ref: Ref<HTMLAnchorElement>) => {
  return (
    <Link href={href} ref={ref} className={classNames(`${customClass}`)}>
      {children}
    </Link>
  );
});

MyLink.displayName = "MyLink";
export default MyLink;
