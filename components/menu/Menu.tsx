import classNames from "classnames";
import { ReactElement } from "react";
import { TiLockClosed } from "react-icons/ti";
import Image from "next/image";

interface MenuItemProps {
  clickOnLink: (url: string) => void;
  url: string;
  label: string;
  activeLink?: boolean;
  blocked?: boolean;
  child?: boolean;
}

const MenuItem = ({ clickOnLink, url, label, activeLink = false, blocked = false, child = false }: MenuItemProps) => {
  return (
    <>
      <div
        className={classNames("cursor-pointer", {
          "rounded bg-primary-500 text-white": activeLink,
          "mt-1 px-2 py-1": !child,
          "my-1": child,
        })}
        onClick={() => clickOnLink(url)}
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
    </>
  );
};

interface MenuItemCollapsibleProps {
  children: ReactElement;
  setOpen: () => void;
  isOpen: boolean;
  title: string;
}
const MenuItemCollapsible = ({ children, setOpen, isOpen, title }: MenuItemCollapsibleProps) => {
  return (
    <>
      <div className="flex flex-1 items-center justify-between" onClick={setOpen}>
        <div>
          <p>{title}</p>
        </div>
        <Image
          src={isOpen ? "/images/icons8-sort-down-30.png" : "/images/icons8-sort-up-30.png"}
          height={32}
          width={32}
          alt=""
        />
      </div>
      {isOpen && children}
    </>
  );
};

export { MenuItem, MenuItemCollapsible };
