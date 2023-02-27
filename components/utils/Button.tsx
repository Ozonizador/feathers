import { styled, tw } from "classname-variants/react";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: (e) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "facebook" | "gmail";
  rounded?: "xl" | "full";
  padding?: "sm" | "md" | "lg";
}

const Spinner = dynamic(() => import("./Spinner"), {
  ssr: false,
});

const buttonProps = styled("button", {
  base: tw`w-full text-center focus:outline-none focus:ring-0`,
  variants: {
    variant: {
      facebook: tw`bg-socials-facebook`,
      gmail: tw`bg-socials-gmail`,
      primary: tw`bg-primary-500 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg`,
    },
    rounded: {
      none: tw`rounded-none`,
      xl: tw`rounded-xl`,
      full: tw`rounded-full`,
    },
    disabled: {
      true: "opacity",
    },
    padding: {
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-5 py-4",
    },
  },
  defaultVariants: {
    variant: "primary",
    rounded: "none",
    disabled: false,
    padding: "sm",
  },
});

const Button = ({
  children,
  onClick,
  loading = false,
  disabled,
  variant = "primary",
  rounded = "xl",
  padding = "sm",
  type,
}: ButtonProps): JSX.Element => {
  return (
    <button {...buttonProps({ variant, rounded, padding })} onClick={onClick} disabled={disabled} type={type}>
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
