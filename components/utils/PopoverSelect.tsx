import { Popover, Transition } from "@headlessui/react";
import classNames from "classnames";

import React, { Fragment } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";

export interface PopoverOption {
  value: string;
  id: string;
  label: string;
}

interface PopoverSelectProps {
  title: string;
  options: PopoverOption[];
  [x: string]: any;
  onClick: (e: any) => void;
  selectedOption?: string;
}

const PopoverSelect = ({ title, options, selectedOption, onClick, props }: PopoverSelectProps) => {
  const isSelectedOption = (option: PopoverOption) => {
    if (!selectedOption) return false;
    return selectedOption == option.value;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, selectedOption: string) => {
    e.preventDefault();
    onClick && onClick(selectedOption);
  };
  return (
    <div className="w-full">
      <Popover className="relative z-900 w-full">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                flex w-full justify-between rounded-xl border border-primary-300 p-3`}
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
              <Popover.Panel className="absolute left-1/2 z-900 w-full -translate-x-1/2 transform bg-white px-4 sm:px-0 lg:max-w-3xl">
                <div className="h-64 overflow-y-auto rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="flex flex-col gap-2 py-2">
                    {options &&
                      options.map((item) => (
                        <div
                          key={item.id}
                          value={item.value}
                          {...props}
                          onClick={(e) => handleClick(e, item.value)}
                          className={classNames(
                            "duration-1 flex cursor-pointer items-center rounded-lg p-2 transition ease-in-out focus:outline-none focus-visible:ring",
                            {
                              "text-primary-500": isSelectedOption(item),
                              "text-gray-900": !isSelectedOption(item),
                            }
                          )}
                        >
                          <p className="px-2 text-sm font-medium">{item.label}</p>
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
