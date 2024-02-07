import React from "react";
import { createPopper } from "@popperjs/core";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";

const NotificationDropdown = ({profile_id = null}) => {
  const router = useRouter();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 px-3 py-1"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy(0,1);
          window.scrollBy(0,-1);
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <IoIosArrowDown />
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "z-50 float-left min-w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
        }
      >
        <a
          href="#pablo"
          className={"text-blueGray-700 block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal"}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/perfil/${profile_id}`);
          }}
        >
          Visitar Perfil
        </a>
      </div>
    </>
  );
};

export default NotificationDropdown;
