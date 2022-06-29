import React from "react";
import Image from "next/image";

const FuncionaSection3Card = ({ img, heading, text }) => {
  return (
    <article className=" flex  flex-col items-start rounded-2xl bg-white p-9">
      <Image className="text-left" src={img} alt="" height={64} width={64} />
      <h3 className="my-2 text-left text-4xl font-semibold text-terciary-400">{heading}</h3>
      <p className="mt-5 text-left text-2xl text-secondary-400">{text}</p>
    </article>
  );
};

export default FuncionaSection3Card;
