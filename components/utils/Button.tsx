import classNames from "classnames";
import React, { ReactNode } from "react";

interface FeathersButtonProps {
  onClick?: (e) => void;
  type: "submit" | "button" | "reset";
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

const FeathersButton = ({ children, onClick, loading = false, disabled }: FeathersButtonProps) => {
  return (
    <>
      <button
        className={classNames(
          "rounded-xl bg-primary-500 p-4 text-center text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:outline-none focus:ring-0",
          {
            "opacity-50": disabled,
          }
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {loading ? <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg> : children}
      </button>
    </>
  );
};

export default FeathersButton;
