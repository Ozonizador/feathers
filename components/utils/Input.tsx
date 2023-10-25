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
  icons?: ReactElement,
  handleClick?: any,
  placeholder?: string;
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
  handleClick,
  ...props
}: InputProps) {
  return (
    <div>
      {name && <label htmlFor={name}>{labelText}</label>}
      <div className="relative">
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
        {icons}
        {errorMessage && <small className="text-red-700">{errorMessage}</small>}
      </div>
    </div>
  );
}
