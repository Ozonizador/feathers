import React from "react";
import Image from "next/image";
import { RiUserLine } from 'react-icons/ri';
import { MdSmokeFree } from 'react-icons/md';
import { GiBroom } from 'react-icons/gi'



export default function DescricaoCondicoes() {
    return (
        <div className="flex flex-row my-20 align-middle items-center">

            <div className="flex flex-col mr-20">
                <div className="font-bold text-2xl mb-5">
                    Descrição
                </div>

                <div className="">
                    <div className="text-base text-secondary-500">
                        Quarto privado em T3 na zona de Peniche. T3 localizado numa zona calma de Peniche e apenas a 1,7 Km da ESTM. O apartamento é composto por 1 sala de estar agradável, 3 quartos com cama de casal, 1 cozinha totalmente equipada, 2 casas de banho e 2 varandas com vista mar. A casa está totalmente equipada e mobilada consoante as fotografias.
                    </div>

                </div>
            </div>


            <div className="flex-1">
                <div className="font-bold text-2xl mb-5">Condições da casa</div>

                <div className="flex mb-2 mt-3 shadow-2xl rounded-lg">
                    <div className="flex flex-col items-center justify-center align-middle w-40 h-32 mr-3 text-secondary-500">
                        <RiUserLine className=" bg-terciary-300 rounded-full w-12 h-12 p-2" />
                        <div className="mt-3 text-base ">
                            2 Hóspedes
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center align-middle w-40 h-32 mr-3 text-secondary-500">
                        <GiBroom className="  bg-terciary-300 rounded-full w-12 h-12 p-2" />
                        <div className="mt-3 text-base">
                            Limpeza trimestral
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center align-middle w-40 h-32 mr-3 text-secondary-500">
                        <MdSmokeFree className=" bg-terciary-300 rounded-full w-12 h-12 p-2" />
                        <div className="mt-3 text-base ">
                            Proibido Fumar
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
