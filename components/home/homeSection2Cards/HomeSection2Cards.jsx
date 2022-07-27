import React from "react";
import Image from "next/image";

const HomeSection2Cards = ({ img, heading, text }) => {
  return (
    <article className="flex  gap-8 p-2 lg:gap-2">
      <div className="w-16 h-16  relative mt-5 lg:w-1/6">
        <Image src={img} alt="" layout="fill"></Image>
      </div>
      <div className="w-2/3 lg:w-5/6">
        <h2 className="text-2xl font-bold text-secondary-600">{heading}</h2>
        <p className="text-secondary-400">{text}</p>
      </div>
    </article>
  );
};

export default HomeSection2Cards;
