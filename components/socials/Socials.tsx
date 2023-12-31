import classNames from "classnames";
import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";

interface SocialsProps {
  type: string;
  size?: "sm" | "md";
}

export default function Socials({ type, size = "sm" }: SocialsProps) {
  return (
    <div className="flex gap-2 px-3">
      <div
        className={classNames("rounded-full transition", {
          "h-10 w-10": size === "md",
          "h-6 w-6": size === "sm",
          "bg-primary-500 text-white": type === "primary",
          "bg-white text-primary-500": type !== "primary",
        })}
      >
        <a
          href="https://www.facebook.com/UniHosts/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Unihosts_Facebook"
        >
          <RiFacebookFill
            className={classNames("mx-auto my-auto h-full", {
              "text-lg": size === "sm",
              "text-xl": size === "md",
            })}
          />
        </a>
      </div>

      <div
        className={classNames("rounded-full transition", {
          "h-10 w-10": size === "md",
          "h-6 w-6": size === "sm",
          "bg-primary-500 text-white": type === "primary",
          "bg-white text-primary-500": type !== "primary",
        })}
      >
        <a
          href="https://www.instagram.com/uni_hosts/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Unihosts_Instagram"
        >
          <RiInstagramLine
            className={classNames("mx-auto my-auto h-full", {
              "text-lg": size === "sm",
              "text-xl": size === "md",
            })}
          />
        </a>
      </div>
    </div>
  );
}
