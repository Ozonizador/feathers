import React from "react";
import Image from "next/image";

const HomeSection2Cards = ({ img, heading, text }) => {
  return (
    <article className="flex flex-1 gap-8 p-2 lg:gap-2">
      <div className="relative my-auto h-16 w-16 lg:w-1/6">
        <Image src={img} alt="" layout="fill"></Image>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-bold text-secondary-600">{heading}</h2>
        <p className="w-2/3 text-secondary-400">{text}</p>
      </div>
    </article>
  );
};

export default HomeSection2Cards;
