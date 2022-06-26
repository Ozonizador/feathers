import React from "react";
import { useState } from "react";
import Image from "next/image";

import HomeInputFeild from "../homeInputFeild/HomeInputFeild";

export default function HomeSection1() {
    return (
        <section>
         
         <div className="container-fluid flex justify-center  py-52 bg-[url('/images//furniture5.jpg')] bg-cover ">
                <div className="flex align-middle flex-col md:containerflex-row px-10">
                        <h1 className="text-6xl  text-white font-bold leading-snug"> A tua <Image  className="display: inline-block  relative  left-0 top-40;" src="/images/icon-home.svg" alt="" height={64} width={64}/>
                        à distancia de um<br />click!</h1>
                        <div className="flex">
                            <HomeInputFeild />
                        </div>
                </div>
            </div>
        </section>
    );
}










