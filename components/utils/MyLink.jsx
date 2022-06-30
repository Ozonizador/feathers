import classNames from "classnames";
import Link from "next/link";

// @ts-ignore
const MyLink = ({ children, customClass = "", href }) => {
  return (
    <Link href={href}>
      <a className={classNames(`${customClass}`)}>{children}</a>
    </Link>
  );
};

export default MyLink;
