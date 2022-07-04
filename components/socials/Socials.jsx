import classNames from "classnames";
import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";

export default function Socials({ type, size = "sm" }) {
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
        <a href="https://www.facebook.com/UniHosts/" target="_blank" rel="noreferrer noopener">
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
        <a href="https://www.instagram.com/uni_hosts/" target="_blank" rel="noreferrer noopener">
          <RiInstagramLine
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
        <a href="/" target="_blank" rel="noreferrer noopener">
          <RiTwitterFill
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
