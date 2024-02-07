import React from "react";
import { createPopper } from "@popperjs/core";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import useAdvertisementService from "../../../hooks/advertisementService";
import { toast } from "react-toastify";

const NotificationDropdown = ({ profile_id = null, options = [] }) => {
  const { removeAdvertisement, disableAdvertisement } = useAdvertisementService();
  const router = useRouter();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const [eliminar, setEliminar] = React.useState(false);
  const [validar, setValidar] = React.useState(false);
  const verifyAd = trpc.advertisements.verifyAdvertisement.useMutation();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
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
          window.scrollBy(0, 1);
          window.scrollBy(0, -1);
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
        {options.length >= 1 &&
          options.map((option, index) => {
            return (
              <a
                href="#pablo"
                className={
                  "text-blueGray-700 block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal"
                }
                onClick={(e) => {
                  e.preventDefault();
                  switch (index) {
                    case 0:
                      router.push(paths[index]);
                      break;
                    case 1:
                      disableAdvertisement(paths[index]);
                      break;
                    case 2:
                      let ad = paths[index];
                      if (!validar) {
                        setValidar(true);
                        toast.warning("Tem a certeza que quer validar?")
                      } else {
                        verifyAd.mutateAsync({ ad });
                      }
                      break;
                    case 3:
                      if (!eliminar) {
                        setEliminar(true);
                        toast.warning("Tem a certeza que quer eliminar?")
                      } else {
                        removeAdvertisement(paths[index]);
                      }
                      break;
                  }
                }}
              >
                {option}
              </a>
            );
          })}
      </div>
    </>
  );
};

export default NotificationDropdown;
