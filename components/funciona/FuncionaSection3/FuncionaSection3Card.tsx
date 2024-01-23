import React from "react";
import Image from "next/image";

interface FuncionaSection3CardProps {
  img: string;
  heading: string;
  text: string;
}

const FuncionaSection3Card = ({ img, heading, text }: FuncionaSection3CardProps) => {
  return (
    <article className="flex flex-col items-start rounded-2xl bg-white p-9 drop-shadow-xl">
      <div className="h-24">
      <div className="rounded-3xl bg-gray-100 p-4">
        <Image className="text-left" src={img} alt="" height={64} width={64} />
      </div>
      </div>
      <h3 className="my-2 text-left text-xl font-semibold text-secondary-600">{heading}</h3>
      <p className="mt-5 text-start text-base text-secondary-400">{text}</p>
    </article>
  );
};

export default FuncionaSection3Card;
