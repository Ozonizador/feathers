import React from "react";
import Image from "next/image";

export default function HomeSection5Cards({ img, heading, text }) {
  return (
    <article className=" rounded-2xl border border-solid border-terciary-200 p-9">
      <Image src={img} alt="" height={64} width={64} />
      <h3 className="mb-2 mt-4 text-3xl font-semibold text-terciary-400">{heading}</h3>
      <p className="text-xl text-secondary-400">{text}</p>
    </article>
  );
}
