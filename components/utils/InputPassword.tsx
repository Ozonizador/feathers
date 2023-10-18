import classNames from "classnames";
import { set } from "lodash";
import React, { ReactElement, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  onChange?: (e: any) => void;
  value?: string | number;
  customCss?: string;
  labelText?: string;
  name?: string;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
  [x: string]: any;
}

export default function InputPassword({
  onChange,
  value,
  name = "",
  labelText = "",
  customCss = "",
  errorMessage = "",
  placeholder = "",
  disabled = false,
  ...props
}: InputProps) {
  const [type, setType] = useState<boolean>(true);

  const handleClick = () => {
    setType(!type);
  };

  return (
    <div>
      {name && <label htmlFor={name}>{labelText}</label>}
      <div className="relative">
        <input
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded-md border border-solid border-terciary-500 px-5 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-0",
            `${customCss}`,
            { "border-red-700": errorMessage },
            { "bg-gray-100": disabled }
          )}
          onChange={onChange}
          name={name}
          value={value}
          aria-labelledby={name}
          disabled={disabled}
          type={type ? "password" : "text"}
          {...props}
        ></input>
        {type && <FaEye className="absolute right-5 top-3" onClick={handleClick}></FaEye>}
        {type == false && <FaEyeSlash className="absolute right-5 top-3" onClick={handleClick}></FaEyeSlash>}
        {errorMessage && <small className="text-red-700">{errorMessage}</small>}
      </div>
    </div>
  );
}
