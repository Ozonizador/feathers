import React from "react";
import { useState } from "react";
import Image from "next/image";

import HomeInputFeild from "../homeInputFeild/HomeInputFeild";

export default function HomeSection1() {
    return (
        <section>
            <div className="container-fluid header">
               <div className="flex justify-center">
                    <h1 className="text-6xl  text-white text-left">
                        A tua <Image src="/images/icon-home.svg" style={{ display: "inline-block" }} alt="" height={32} width={32}/>
                        a distancia de um <br />
                        {/* <NavBarbr width={width} /> */}
                        click!
                    </h1>
                    </div>
                    <div className="flex justify-center">
                        <HomeInputFeild />
                    </div>
               
            </div>
        </section>
    );
}
