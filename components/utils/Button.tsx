import classNames from "classnames";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import FeathersSpinner from "./Spinner";

interface ButtonProps {
  onClick?: (e) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "facebook" | "gmail";
}

const Spinner = dynamic(() => import("./Spinner"), {
  ssr: false,
});

const Button = ({ children, onClick, loading = false, disabled, variant = "primary" }: ButtonProps) => {
  return (
    <>
      <button
        className={classNames("w-full rounded-xl bg-primary-500 p-4 text-center focus:outline-none focus:ring-0", {
          "opacity-50": disabled,
          "bg-primary-500 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg":
            variant === "primary",
          "bg-socials-facebook": variant === "facebook",
          "bg-socials-gmail": variant === "gmail",
        })}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <Spinner /> : children}
      </button>
    </>
  );
};

export default Button;
