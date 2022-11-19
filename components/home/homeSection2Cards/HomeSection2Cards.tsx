import React from "react";
import Image from "next/image";

const HomeSection2Cards = ({ img, heading, text }) => {
  return (
    <article className="flex flex-1 gap-8 p-2 lg:gap-2">
      <div className="relative my-auto lg:my-0">
        <Image src={img} alt="" layout="fixed" height="65" width="65"></Image>
      </div>
      <div className="w-11/12	lg:ml-2">
        <h2 className="text-xl font-semibold text-secondary-600">{heading}</h2>
        <p className="w-full  text-secondary-400">{text}</p>
      </div>
    </article>
  );
};

export default HomeSection2Cards;
