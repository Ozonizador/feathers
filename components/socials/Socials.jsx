import classNames from "classnames";
import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";

export default function Socials({ type, size = "sm" }) {
  return (
    <div className="flex gap-3">
      <a
        href="/"
        className={classNames(
          "flex h-6 w-6 rounded-full bg-white text-xl text-primary-500 transition",
          {
            "bg-primary-500": type === "primary",
            "h-10 w-10 text-2xl": size === "md",
          }
        )}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiFacebookFill
          className={classNames("mx-auto my-auto", {
            "text-primary-500": type !== "primary",
          })}
        />
      </a>
      <a
        href="/"
        className={classNames(
          "flex h-6 w-6 rounded bg-neutral-100 text-xl text-primary-500 transition",
          {
            "bg-primary-500": type === "primary",
            "h-10 w-10 text-2xl": size === "md",
          }
        )}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiInstagramLine
          className={classNames("mx-auto my-auto", {
            "text-primary-500": type !== "primary",
          })}
        />
      </a>
      <a
        href="/"
        className={classNames("flex h-6 w-6 bg-neutral-100 text-xl text-primary-500 transition", {
          "bg-primary-500": type === "primary",
          "h-10 w-10 text-2xl": size === "md",
        })}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiTwitterFill
          className={classNames("mx-auto my-auto", {
            "text-primary-500": type !== "primary",
          })}
        />
      </a>
    </div>
  );
}
