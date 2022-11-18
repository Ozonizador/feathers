import classNames from "classnames";
import React from "react";

interface InputProps {
  value: string;
  onChange: (e) => void;
  customCss?: string;
  labelText?: string;
  label?: string;
  type?: "password" | "text";
  defaultValue?: string;
  autoComplete?: string;
}

export default function Input({
  onChange,
  value,
  label = "",
  labelText = "",
  customCss = "",
  type = "text",
  defaultValue,
  autoComplete = "off",
}: InputProps) {
  return (
    <div className="my-2">
      <div>
        {label && <label htmlFor={label}>{labelText}</label>}
        <input
          className={classNames(
            "block w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-5 shadow-sm",
            `${customCss}`
          )}
          onChange={onChange}
          name={label}
          value={value}
          type={type}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
        ></input>
      </div>
    </div>
  );
}
