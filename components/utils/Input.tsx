import classNames from "classnames";
import React from "react";

interface InputProps {
  onChange?: (e) => void;
  value?: string;
  customCss?: string;
  labelText?: string;
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  [x: string]: any;
}

export default function Input({
  onChange,
  value,
  label = "",
  labelText = "",
  customCss = "",
  errorMessage = "",
  disabled = false,
  ...props
}: InputProps) {
  return (
    <div className="my-2">
      <div>
        {label && <label htmlFor={label}>{labelText}</label>}
        <input
          className={classNames(
            "block w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-5 shadow-sm",
            `${customCss}`,
            { "border-red-700": errorMessage },
            { "bg-gray-300": disabled }
          )}
          onChange={onChange}
          name={label}
          value={value}
          aria-labelledby={label}
          disabled={disabled}
          {...props}
        ></input>
        {errorMessage && <small className="text-red-700">{errorMessage}</small>}
      </div>
    </div>
  );
}
