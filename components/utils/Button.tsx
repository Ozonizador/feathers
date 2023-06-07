import { tw, variantProps } from "classname-variants/react";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "facebook" | "gmail" | "informative";
  rounded?: "xl" | "full";
  padding?: "sm" | "md" | "lg";
}

const Spinner = dynamic(() => import("./Spinner"), {
  ssr: false,
});

const buttonProps = variantProps({
  base: tw`w-full text-center focus:outline-none focus:ring-0 cursor-pointer`,
  variants: {
    variant: {
      facebook: tw`bg-socials-facebook`,
      gmail: tw`bg-socials-gmail`,
      primary: tw`bg-primary-500 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg`,
      informative: tw`text-color border border-black`,
    },
    rounded: {
      none: tw`rounded-none`,
      xl: tw`rounded-xl`,
      full: tw`rounded-full`,
    },
    disabled: {
      true: tw`opacity-60`,
    },
    padding: {
      sm: tw`px-3 py-2`,
      md: tw`px-4 py-3`,
      lg: tw`px-5 py-4`,
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
