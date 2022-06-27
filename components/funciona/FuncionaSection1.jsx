import React from "react";
import Image from "next/image";


export default function FuncionaSection1() {
    return (
        <section>
                <div className="container-fluid flex justify-center   py-52 bg-[url('/images/back.png')] bg-cover ">
                    <div className="flex align-middle flex-col md:containerflex-row px-10 text-center">
                        <h1 className="text-6xl  text-white font-bold">Como funciona</h1>
                        <p className="text-white text-2xl">Tem uma propriedade para arrendar? Explicamos como<br />pode rentabilizá-la</p>
                    </div>
                </div>
        </section>
    );
}




