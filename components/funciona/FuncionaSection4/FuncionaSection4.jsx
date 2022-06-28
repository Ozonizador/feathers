import React from "react";
import { optionsCard1 } from "./Section4.config";
import { optionsCard2 } from "./FuncionaCard2.config";
import Link from "next/link";

// import Link from "next/link"

import FuncionaSection4Card from "./FuncionaSection4Card";
import Image from "next/image"




export default function FuncionaSection4() {
    return (
        <section className="flex w-1/2 mx-auto my-20 justify-evenly">
            <div className="flex flex-col drop-shadow-2xl bg-white p-5 rounded-2xl w-2/5">
                <div className="grid grid-rows-6 ">
                    <h1 className="text-2xl font-bold text-center mt-4">Gestão da casa premium</h1>
                    {optionsCard1.map((option, index) => {
                        return (<div key={index} className="flex flex-row  ">
                            <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                            <p className="ml-4 mt-5 text-xl">{option.text}</p>
                        </div>
                        )
                    })}
                    <hr className="my-6" />
                    <h1 className="text-2xl font-bold text-center mb-5">Preço Sob Consulta</h1>

                    <Link href=" " >
                        <a className="bg-primary-300 py-2 px-7 text-center rounded-md text-white">
                            Saber mais
                        </a>
                    </Link>
                </div>
            </div>




            <div className="flex flex-col drop-shadow-2xl bg-white p-5 rounded-2xl w-2/5 ">
                <div className="grid grid-rows-6">
                    <h1 className="text-2xl font-bold text-center mt-4">Gestão da casa premium</h1>
                    <div className="flex flex-col flex-1 align-middle items-center">
                        <h2 className="text-xl font-bold">Gestão da casa</h2>
                        <div className=" text-2xl font-bold">+</div>
                    </div>
                    {optionsCard2.map((option, index) => {
                        return (<div key={index} className="flex flex-row items-baseline ">
                            <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                            <p className="ml-4 mt-5 text-xl">{option.text}</p>
                        </div>
                        )
                    })}
                    <hr className="my-6" />
                    <h1 className="text-2xl font-bold text-center mb-5">Preço Sob Consulta</h1>

                    <Link href=" " >
                        <a className="bg-primary-300 py-2 px-7 text-center rounded-md text-white">
                            Saber mais
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}




