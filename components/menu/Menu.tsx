import classNames from "classnames";
import { ReactNode, useState } from "react";
import { TiLockClosed } from "react-icons/ti";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Tooltip } from "react-tooltip";

type MenuProps = {
  children: ReactNode;
};


const Menu = ({ children }: MenuProps) => {
  return <div className="flex w-full flex-col gap-1 rounded-2xl bg-primary-200 p-4 lg:w-full">{children}</div>;
};

type MenuOptionProps = {
  label: string;
  activeLink?: boolean;
  url?: string;
  blocked?: boolean;
};

const MenuOption = ({ label, activeLink = false, url, blocked }: MenuOptionProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const goToUrl = () => {
    url && router.push(url);
  };

  return (
    <div
      className={classNames("cursor-pointer px-3 py-2 text-sm", {
        "rounded bg-primary-500 font-black text-white": activeLink,
      })}
      onClick={() => goToUrl()}
    >
      {blocked ? (
        <>
          <div
            className="flex"
            data-tooltip-id="blocked"
            data-tooltip-content={t("common:tooltip")}
            data-tooltip-place="top"
            data-tooltip-variant="light"
          >
            <TiLockClosed className="my-auto" />
            <span className="ml-2">{t(label)}</span>
          </div>
          <Tooltip id="blocked" />
        </>
      ) : (
        t(label)
      )}
    </div>
  );
};

type MenuGrouperProps = {
  title: string;
  selectedGroup: boolean;
  isCollapsed?: boolean;
  children?: ReactNode;
  defaultOpen?: boolean;
  url?: string;
};

const MenuGrouper = ({ title, children, selectedGroup, isCollapsed, url, defaultOpen = false }: MenuGrouperProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const goToUrl = (url: string) => {
    router.push(url);
  };

  return (
    <div
      className={classNames("flex flex-col", {
        "rounded-xl": selectedGroup || isOpen,
        "bg-primary-500 text-white": !isCollapsed && selectedGroup,
        "bg-primary-300": isOpen,
      })}
    >
      <div
        className={classNames("cursor-pointer px-3", {
          "pb-1 pt-3": selectedGroup && isCollapsed,
          "py-1": !selectedGroup,
          "py-3": selectedGroup && !isCollapsed,
          "border-b border-primary-500": isOpen && children,
        })}
        onClick={() => (url ? goToUrl(url) : setIsOpen(!isOpen))}
      >
        <div className="flex w-full">
          <div>
            <p>{title}</p>
          </div>
          {isCollapsed && (
            <div className="ml-auto">
              <Image
                src={isOpen ? "/images/icons8-sort-up-30.png" : "/images/icons8-sort-down-30.png"}
                height={24}
                width={24}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      {isOpen && children && (
        <div
          className={classNames("flex flex-col", {
            "mb-2 mt-3 px-4": selectedGroup,
            "px-2": !selectedGroup,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { MenuOption, MenuGrouper };
export default Menu;
