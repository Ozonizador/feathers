import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import { RiInstagramLine } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";

export default function Socials(props) {
  return (
    <div className="flex" style={{ gap: "0.75rem" }}>
      <a
        href="/"
        className="right-icons btn-shadow flex transition"
        style={{
          backgroundColor: props.bgClr,
          fontSize: props.fSize,
          width: props.width,
          height: props.width,
        }}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiFacebookFill className="my-auto mx-auto" style={{ color: props.clr }} />
      </a>
      <a
        href="/"
        className="right-icons  btn-shadow flex transition"
        style={{
          backgroundColor: props.bgClr,
          fontSize: props.fSize,
          width: props.width,
          height: props.width,
        }}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiInstagramLine className="my-auto mx-auto" style={{ color: props.clr }} />
      </a>
      <a
        href="/"
        className="right-icons btn-shadow flex transition"
        style={{
          backgroundColor: props.bgClr,
          fontSize: props.fSize,
          width: props.width,
          height: props.width,
        }}
        target="_blank"
        rel="noreferrer noopener"
      >
        <RiTwitterFill className="my-auto mx-auto" style={{ color: props.clr }} />
      </a>
    </div>
  );
}
