import { Popover, Transition } from "@headlessui/react";

import React, { Fragment, ReactNode } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

interface PopoverSelectProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const PopoverGeneric = ({ title, children, className }: PopoverSelectProps) => {
  return (
    <div className={className}>
      <Popover className="relative w-full">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                flex w-full justify-between rounded-xl border border-primary-300 p-2`}
            >
              <span className="text-md" style={{ whiteSpace: "nowrap" }}>
                {title}
              </span>
              <BsFillCaretDownFill
                className={`${open ? "" : "text-opacity-70"}
                  my-auto ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-700 mt-5 w-fit -translate-x-24 transform rounded-xl border border-primary-500 bg-white">
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopoverGeneric;
