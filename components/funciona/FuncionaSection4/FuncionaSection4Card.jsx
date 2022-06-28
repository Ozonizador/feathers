import React from "react";
import Image from "next/image";

export default function FuncionaSection4Card({img, heading, text, heading2}) {
    return (
        <article className="flex flex-col">
            <h1 className="text-terciary-400 text-4xl font-semibold my-2">{heading}</h1>
        <div className="flex flex-row">
            <Image src={img} alt="" height={32} width={32} />
            <p className="text-secondary-400 text-base ">{text}</p>
        </div>
        <h1 className="text-terciary-400 text-4xl font-semibold my-2">{heading2}</h1>
            
        </article>
    );
}
