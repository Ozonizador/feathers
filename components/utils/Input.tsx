import classNames from "classnames";
import React, { ReactElement } from "react";

interface InputProps {
  onChange?: (e: any) => void;
  value?: string | number;
  customCss?: string;
  labelText?: string;
  name?: string;
  errorMessage?: string;
  disabled?: boolean;
  icons?: ReactElement;
  handleClick?: any;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  [x: string]: any;
}

export default function Input({
  onChange,
  value,
  name = "",
  labelText = "",
  customCss = "",
  errorMessage = "",
  placeholder = "",
  disabled = false,
  icons,
  options,
  handleClick,
  ...props
}: InputProps) {
  const isDropdown = options && options.length > 0;

  return (
    <div>
      {name && <label htmlFor={name}>{labelText}</label>}
      <div className="relative text-sm">
        {isDropdown ? (
          <select
            placeholder={placeholder}
            className={classNames(
              "block w-full rounded-md border border-solid border-terciary-500 px-5 py-2 focus:border focus:border-primary-500 focus:outline-0 focus:ring-transparent",
              { "border-red-700": errorMessage },
              { "bg-gray-100": disabled }
            )}
            onChange={onChange}
            name={name}
            value={value}
            aria-labelledby={name}
            disabled={disabled}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            placeholder={placeholder}
            className={classNames(
              "block w-full rounded-md border border-solid border-terciary-500 px-5 py-2 focus:border-primary-500 focus:outline-none focus:ring-0",
              `${customCss}`,
              { "border-red-700": errorMessage },
              { "bg-gray-100": disabled }
            )}
            onChange={onChange}
            name={name}
            value={value}
            aria-labelledby={name}
            disabled={disabled}
            {...props}
          ></input>
        )}
        {icons}
        {errorMessage && <small className="text-red-700">{errorMessage}</small>}
      </div>
    </div>
  );
}
