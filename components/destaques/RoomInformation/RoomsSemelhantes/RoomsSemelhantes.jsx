import React from "react";
import Image from "next/image"
import Link from "next/link"
import { CgHome } from "react-icons/cg"


export default function RoomSemelhantes() {
    return (
        <section className="mb-40">
            <div className="font-bold text-2xl mb-5">Casas semelhantes</div>
            <div className="grid w-3/5 lg:grid-cols-4 justify-start gap-52 mb-10">
                <article className="relative h-56 w-48  rounded-lg  bg-destaques-slider1 ">
                    <h2 className=" text-base text-white p-3 mt-3">Quarto Privado</h2>
                    <p className="bold absolute bottom-3 right-4 text-2xl text-white font-bold">320&euro;/mês</p>
                </article>

                <article className="relative h-56 w-48  rounded-lg bg-destaques-slider2">
                    <h2 className=" text-base text-white p-3 mt-3">Quarto partilhado</h2>
                    <p className="bold absolute bottom-3 right-4 text-2xl text-white font-bold">320&euro;/mês</p>
                </article>

                <article className="relative h-56 w-48  rounded-lg bg-destaques-slider2">
                    <h2 className=" text-base text-white p-3 mt-3">Casa Inteira</h2>
                    <p className="bold absolute bottom-3 right-4 text-2xl text-white font-bold">320&euro;/mês</p>
                </article>

                <article className="relative h-56 w-48  rounded-lg bg-destaques-slider2">
                    <h2 className=" text-base text-white p-3 mt-3">Quarto Privado</h2>
                    <p className="bold absolute bottom-3 right-4 text-2xl text-white font-bold">320&euro;/mês</p>
                </article>


            </div>

            <Link href="/">
                <a className="hover: flex w-96 items-center justify-center  rounded-md bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                    Encontrar mais{" "}
                    <span className="px-1">
                        <CgHome />
                    </span>{" "}
                    em Peniche
                </a>
            </Link>

        </section>
    );
}








