import React from "react";
import Image from "next/image";

export default function FuncionaSection3Card({img, heading, text}) {
    return (
        <article className=" p-9  rounded-2xl flex items-start flex-col bg-white">



            <Image className="text-left" src={img} alt="" height={64} width={64} />
            <h3 className="text-terciary-400 text-4xl font-semibold my-2 text-left">{heading}</h3>
            <p className="text-secondary-400 text-2xl text-left mt-5">{text}</p>
        </article>
    );
}
