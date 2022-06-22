import React from "react";
import { useState } from "react";
import Image from "next/image";
// import NavBarbr from "../../components/navbar/Navbar";
// import "./HomeSection1.css";

import HomeInputFeild from "../homeInputFeild/HomeInputFeild";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


export default function HomeSection1() {
    return (
        <section>
            <div className="container-fluid header">
                <div className="ycontainer-sm">
                    <h1 className="fs-950 clr-white" style={{ marginBottom: "2rem" }}>
                        A tua
                        <Image
                            src="/images/icon-home.svg"
                            style={{ display: "inline-block" }}
                            alt=""
                            height={32} width={32}
                        />
                        a distancia de um <br />
                        {/* <NavBarbr width={width} /> */}
                        click!
                    </h1>
                    <HomeInputFeild />

                </div>
            </div>
        </section>
    );
}
