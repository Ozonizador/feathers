import React from "react";
import Image from "next/image";

const HomeSection2Cards = ({ img, heading, text }) => {
  return (
    <article className="flex flex-1 justify-center gap-2 p-2">
      <Image className="my-auto" src={img} alt="" height={164} width={164}></Image>
      <div className="ml-5">
        <h2 className="text-2xl font-bold text-secondary-600">{heading}</h2>
        <p className="text-secondary-400">{text}</p>
      </div>
    </article>
  );
};

export default HomeSection2Cards;
