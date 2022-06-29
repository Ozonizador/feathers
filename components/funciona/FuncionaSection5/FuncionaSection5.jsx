import React from "react";
import Link from "next/link";
import Image from "next/image"




export default function FuncionaSection5() {
    return (
        <section className="container mx-auto flex rounded-2xl py-20 bg-terciary-600 my-60">
            <div className="flex flex-1">
                MAP
            </div>

            <div className="flex flex-1 align-middle justify-center flex-col">
                <div className="w-3/4">
                    <h1 className="text-6xl m- font-bold">Onde Estamos?</h1>
                    <div className="bg-white flex items-center align-middle p-4 rounded-full w-80 drop-shadow-md">
                        <div className="">
                            <Image className="flex object-scale-down " src="/images/location.png" alt="" height="25" width="25"></Image>
                        </div>
                        <div className="ml-2 text-xl">Portugal continental e ilhas</div>
                    </div>

                    <div className="mt-6 mb-10 text-lg">Pode anunciar o seu espaço de forma gratuita em todo o território nacional. 
                    <br /><br />Nas zonas assinaladas já pode encontrar os nossos unipackages!
                    </div>

                    <Link href=" " >
                        <a className="bg-primary-500 py-3 px-11 text-center rounded-md text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                            Saber mais
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}




