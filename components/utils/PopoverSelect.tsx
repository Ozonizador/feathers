import { Popover, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

export interface PopoverOption {
  name: string;
  id: string;
  description?: string;
}

interface PopoverSelectProps {
  title: string;
  options: PopoverOption[];
  [x: string]: any;
  onClick: () => void;
}

const PopoverSelect = ({ title, options, props }: PopoverSelectProps) => {
  return (
    <div className="w-full px-4">
      <Popover className="relative w-full">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                flex w-full justify-between p-3`}
            >
              <span className="text-xl">{title}</span>
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
              <Popover.Panel className="absolute left-1/2 z-10 w-full -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex flex-col gap-2 py-2">
                    {options &&
                      options.map((item) => (
                        <div
                          key={item.id}
                          {...props}
                          className="duration-1 flex cursor-pointer items-center rounded-lg bg-gray-50 p-2 transition ease-in-out hover:text-primary-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopoverSelect;
