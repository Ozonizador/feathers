import React from "react";
import Image from "next/image";

interface HomeSection2CardsProps {
  img: string;
  heading: string;
  text: string;
}

const HomeSection2Cards = ({ img, heading, text }: HomeSection2CardsProps) => {
  return (
    <article className="flex flex-1 gap-8 p-2 lg:gap-2">
      <div className="relative my-auto pt-1 lg:my-0">
        <Image src={img} alt="" layout="fixed" height="60" width="60"></Image>
      </div>
      <div className="w-11/12	lg:ml-2">
        <h2 className="text-lg font-semibold text-secondary-600">{heading}</h2>
        <p className="text-md w-full text-secondary-400">{text}</p>
      </div>
    </article>
  );
};

export default HomeSection2Cards;
