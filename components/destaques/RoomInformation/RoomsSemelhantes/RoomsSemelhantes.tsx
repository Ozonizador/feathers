import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgHome } from "react-icons/cg";

export default function RoomSemelhantes() {
  return (
    <section className="mb-40">
      <div className="mb-5 text-2xl font-bold">Casas semelhantes</div>
      <div className="flex flex-col lg:flex-row">
        <div className="mr-0 flex w-full flex-row justify-between gap-5 lg:mr-7">
          <div>
            <article className="bg-destaques-slider1 relative h-56  w-40  rounded-lg lg:h-56  lg:w-48">
              <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
              <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
            </article>
          </div>
          <div>
            <article className="bg-destaques-slider1 relative h-56  w-40  rounded-lg lg:h-56  lg:w-48">
              <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
              <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
            </article>
          </div>
        </div>

        <div className="flex w-full flex-row justify-between gap-5 ">
          <div>
            <article className="bg-destaques-slider1 relative h-56  w-40  rounded-lg lg:h-56  lg:w-48">
              <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
              <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
            </article>
          </div>
          <div>
            <article className="bg-destaques-slider1 relative h-56  w-40  rounded-lg lg:h-56  lg:w-48">
              <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
              <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
            </article>
          </div>
        </div>
      </div>
      {/* <div className="mb-10 grid w-full grid-cols-2 justify-start gap-52 lg:w-3/5 lg:grid-cols-4">
        <article className="bg-destaques-slider1 relative h-56  w-48  rounded-lg ">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto partilhado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Casa Inteira</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">320&euro;/mês</p>
        </article>
      </div> */}

      <Link href="/procurar">
        <a className="hover: lg_mt-0 mt-10 flex w-full items-center justify-center  rounded-md bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl lg:w-96">
          Encontrar mais
          <span className="px-1">
            <CgHome />
          </span>{" "}
          em Peniche
        </a>
      </Link>
    </section>
  );
}
