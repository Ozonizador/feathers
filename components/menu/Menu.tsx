import classNames from "classnames";
import { ReactNode } from "react";
import { TiLockClosed } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";

type MenuProps = {
  children: ReactNode;
};

const Menu = ({ children }: MenuProps) => {
  return <div className="w-full rounded-2xl bg-primary-50 p-4 lg:w-full">{children}</div>;
};

type MenuOptionProps = {
  label: string;
  activeLink?: boolean;
  url?: string;
  blocked?: boolean;
};

const MenuOption = ({ label, activeLink = false, url, blocked }: MenuOptionProps) => {
  const router = useRouter();
  const goToUrl = () => {
    url && router.push(url);
  };

  return (
    <div
      className={classNames("cursor-pointer", {
        "rounded bg-primary-500 font-bold text-white": activeLink,
      })}
      onClick={() => goToUrl()}
    >
      {blocked ? (
        <>
          <div className="flex">
            <TiLockClosed className="my-auto" />
            <span className="ml-2">{label}</span>
          </div>
        </>
      ) : (
        label
      )}
    </div>
  );
};

type MenuGrouperProps = {
  title: string;
  selectedGroup: boolean;
  isCollapsible?: boolean;
  setOpen?: () => void;
  isOpen?: boolean;
  children?: ReactNode;
  url?: string;
};

const MenuGrouper = ({ title, children, selectedGroup, isOpen, setOpen, isCollapsible }: MenuGrouperProps) => {
  return (
    <div
      className={classNames("flex flex-col", {
        "rounded-xl bg-primary-200 p-4": selectedGroup,
      })}
    >
      <div className={classNames({ "border-b border-primary-500 p-2": selectedGroup })} onClick={setOpen && setOpen}>
        <div className="flex">
          <div>
            <p>{title}</p>
          </div>
          {isCollapsible && (
            <Image
              className="ml-auto"
              src={isOpen ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
              height={32}
              width={32}
              alt=""
            />
          )}
        </div>
      </div>
      {children && <div className="flex flex-col pt-2">{children}</div>}
    </div>
  );
};

export { MenuOption, MenuGrouper };
export default Menu;
