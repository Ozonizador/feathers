import React from "react";
import Image from "next/image";

interface HomeSection5CardsProps {
  img: string;
  heading: string;
  text: string;
}

const HomeSection5Cards = ({ img, heading, text }: HomeSection5CardsProps) => {
  return (
    <article className="rounded-2xl border border-solid border-terciary-200 p-9">
      <Image src={img} alt="" height={64} width={64} />
      <h3 className="mb-2 mt-4 text-3xl font-semibold text-secondary-600">{heading}</h3>
      <p className="text-lg text-secondary-400">{text}</p>
    </article>
  );
};

export default HomeSection5Cards;
