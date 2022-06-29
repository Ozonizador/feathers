
import React from "react";

import Link from "next/link";
import Image from "next/image"

export default function UnideskHero() {
    return (

        <section>
            <div className="flex justify-center  bg-[url('/images//bed14.jpg')] bg-cover py-52 ">
                <div className="flex flex-col px-10 align-middle md:container">
                    <h1 className="text-7xl text-center font-normal leading-snug text-white tracking-widest">
                        Uni - Desk
                    <h2 className="text-4xl font-normal ">Estudante</h2>
                    </h1>

                </div>
            </div>
        </section>




    );
}
