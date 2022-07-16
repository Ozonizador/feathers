import React from "react";
import { Carousel } from "flowbite-react";
import { TbSofa } from "react-icons/tb"
import { BiChair } from "react-icons/bi"
import { BiJoystick } from "react-icons/bi"
import { MdFireplace } from "react-icons/md"
import { BiTv } from "react-icons/bi"
import { MdOutlineBalcony } from "react-icons/md"


export default function RoomSlider() {
    return (

        // PROBLEMA - DAR ESTILOS AS SETAS ESQUERDA E DIREITA
        <section>
            <div className="h-44 rounded-xl  bg-white mt-40 mb-32 border border-color: black ;">
                <div className="text-center mt-3 font-bold text-2xl">Sala de estar</div>
                <Carousel indicators={false} slide={false}>
                    <div className="flex h-full items-center justify-center align-middle gap-14">
                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <MdFireplace className="text-4xl" />
                            <div className="text-base">Lareira</div>
                        </div>

                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <TbSofa className="text-4xl" />
                            <div className="text-base">Sofá</div>
                        </div>
                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <BiTv className="text-4xl" />
                            <div className="text-base">TV</div>
                        </div>

                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <BiChair className="text-4xl" />
                            <div className="text-base">Cadeiras</div>
                        </div>

                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <MdOutlineBalcony className="text-4xl" />
                            <div className="text-base">Varanda</div>
                        </div>

                        <div className="flex flex-col justify-center align-middle items-center mb-8">
                            <BiJoystick className="text-4xl" />
                            <div className="text-base">Videojogos</div>
                        </div>
                    </div>
                    <div className="flex h-full items-center justify-center ">
                        Slide 2
                    </div>
                </Carousel>
            </div>

            <div className="font-bold text-2xl mb-4">Mais quartos nesta casa</div>
            <div className="grid w-96 lg:grid-cols-2 justify-start gap-0 mb-40">
                <article className="relative h-44 w-44  rounded-lg  bg-destaques-slider1 ">
                    <h2 className=" text-base text-white p-3 mt-3">Quarto Privado</h2>
                    <p className="bold absolute bottom-3 right-4 text-base text-white font-bold">&euro;320</p>
                </article>

                <article className="relative h-44 w-44  rounded-lg bg-destaques-slider2">
                    <h2 className=" text-base text-white p-3 mt-3">Quarto Privado</h2>
                    <p className="bold absolute bottom-3 right-4 text-base text-white font-bold">&euro;320</p>
                </article>
            </div>

        </section>

    );
}


