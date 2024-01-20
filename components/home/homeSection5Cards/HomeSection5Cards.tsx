import React from "react";
import Image from "next/image";

interface HomeSection5CardsProps {
  img: string;
  heading: string;
  text: string;
}

const HomeSection5Cards = ({ img, heading, text }: HomeSection5CardsProps) => {
  return (
    <article className="rounded-2xl border border-solid border-terciary-200 p-5 text-center lg:text-start">
      <Image src={img} alt="" height={55} width={55} className="mx-auto lg:mx-0" />
      <h3 className="mb-2 mt-4 text-2xl font-semibold text-secondary-600">{heading}</h3>
      <p className="text-md text-secondary-400">{text}</p>
    </article>
  );
};

export default HomeSection5Cards;
