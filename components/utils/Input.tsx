import { er } from "@fullcalendar/core/internal-common";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface InputProps {
  onChange?: (e: any) => void;
  value?: string | number;
  customCss?: string;
  labelText?: string;
  name?: string;
  required?: boolean;
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
  required = false,
  placeholder = "",
  disabled = false,
  icons,
  options,
  handleClick,
  ...props
}: InputProps) {
  const isDropdown = options && options.length > 0;
  const { t } = useTranslation();

  return (
    <div>
      {name && (
        <label htmlFor={name}>
          {labelText}
          {required && <span>*</span>}
        </label>
      )}
      <div className="relative pt-2 text-sm">
        {isDropdown ? (
          <select
            placeholder={placeholder}
            className={classNames(
              "block w-full rounded-md border border-solid border-terciary-500 px-5 py-2 focus:border focus:border-primary-500 focus:outline-0 focus:ring-transparent",
              { "border-red-700": errorMessage },
              { "bg-gray-200": disabled }
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
              { "!bg-gray-200": disabled }
            )}
            onChange={onChange}
            name={name}
            value={value}
            required={required}
            aria-labelledby={name}
            disabled={disabled}
            {...props}
          ></input>
        )}
        {icons}
        {errorMessage && errorMessage.includes("required") ? (
          <small className="text-red-700">{t("form:validations.required")}</small>
        ) : (
          <small className="text-red-700">{errorMessage}</small>
        )}
      </div>
    </div>
  );
}
