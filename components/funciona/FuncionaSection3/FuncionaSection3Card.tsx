import React from "react";
import Image from "next/image";

const FuncionaSection3Card = ({ img, heading, text }) => {
  return (
    <article className="flex flex-col items-start rounded-2xl bg-white p-9 drop-shadow-2xl">
      <div className="rounded-3xl bg-gray-100 p-4">
        <Image className="text-left" src={img} alt="" height={64} width={64} />
      </div>
      <h3 className="my-2 text-left text-2xl font-semibold text-secondary-600">{heading}</h3>
      <p className="mt-5 text-start text-base text-secondary-400">{text}</p>
    </article>
  );
};

export default FuncionaSection3Card;
