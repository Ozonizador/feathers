import React from "react";
import Image from "next/image";
import { RiUserLine } from 'react-icons/ri';
import { BiBed } from 'react-icons/bi';
import { TbBed } from 'react-icons/tb'
import { GrRestroom } from 'react-icons/gr'


export default function TitleInfo() {
    return (

        <div>
            <div className="text-5xl font-bold mb-8">
                Quarto privado em Peniche
            </div>

            <div className="flex mb-2 mt-3">
                <div className="flex flex-col items-center justify-center align-middle w-40 h-32  shadow-2xl rounded-lg mr-3 text-secondary-500">
                    <RiUserLine className=" text-2xl " />
                    <div className="mt-3 text-base ">
                        2 Hóspedes
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center align-middle w-40 h-32  shadow-2xl rounded-lg mr-3 text-secondary-500">
                    <BiBed className=" text-2xl " />
                    <div className="mt-3 text-base">
                        1 cama
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center align-middle w-40 h-32  shadow-2xl rounded-lg mr-3 text-secondary-500">
                    <TbBed className=" text-2xl " />
                    <div className="mt-3 text-base">
                        1 quarto
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center align-middle w-40 h-32  shadow-2xl rounded-lg text-secondary-500">
                    <GrRestroom className=" text-2xl " />
                    <div className="mt-3 text-base ">
                        1 Casa De Banho
                    </div>
                </div>
            </div>
        </div>
    );
}
