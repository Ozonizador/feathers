import { tw, variantProps } from "classname-variants/react";
import dynamic from "next/dynamic";
import React, { ReactNode } from "react";
import { toast } from "react-toastify";

interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "facebook" | "gmail" | "informative" | "disabled";
  rounded?: "xl" | "full" | "none" | "small" | "medium";
  padding?: "sm" | "md" | "lg" | "custom";
  [x: string]: any;
}

const Spinner = dynamic(() => import("./Spinner"), {
  ssr: false,
});

const buttonProps = variantProps({
  base: tw`text-center focus:outline-none focus:ring-0 capitalize`,
  variants: {
    variant: {
      facebook: tw`bg-socials-facebook`,
      gmail: tw`bg-socials-gmail`,
      primary: tw`bg-primary-500 text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg`,
      informative: tw`text-color border border-black`,
      disabled: tw`bg-primary-300 text-white shadow-md`,
    },
    rounded: {
      none: tw`rounded-none`,
      xl: tw`rounded-xl`,
      full: tw`rounded-full`,
      small: tw`rounded-sm`,
      medium: tw`rounded-md`
    },
    disabled: {
      true: tw`opacity-60 cursor-none`,
      false: tw`cursor-pointer`,
    },
    padding: {
      custom: tw`px-3 py-3`,
      sm: tw`px-3 py-2`,
      md: tw`px-4 py-3`,
      lg: tw`px-5 py-4`,
    },
    size: {
      full: tw`w-full`,
      contain: tw`w-fit`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "full",
    rounded: "none",
    disabled: false,
    padding: "custom",
  },
});

const Button = ({
  children,
  onClick,
  loading = false,
  disabled,
  variant = "primary",
  rounded = "xl",
  padding = "custom",
  type,
}: ButtonProps): JSX.Element => {
  return (
    <button {...buttonProps({ variant, rounded, padding })} onClick={onClick} disabled={disabled} type={type}>
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
