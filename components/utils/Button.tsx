import classNames from "classnames";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: (e) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "facebook" | "gmail";
}

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
        {loading ? <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg> : children}
      </button>
    </>
  );
};

export default Button;
