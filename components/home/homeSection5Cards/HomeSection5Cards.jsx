import React from "react";
import Image from "next/image";

export default function HomeSection5Cards({ img, heading, text }) {
    return (
        <article className=" p-9 border-solid border border-terciary-200 rounded-2xl">



            <Image src={img} alt="" height={64} width={64} />
            <h3 className="text-terciary-400 text-3xl font-semibold mb-2 mt-4">{heading}</h3>
            <p className="text-secondary-400 text-xl">{text}</p>
        </article>
    );
}
