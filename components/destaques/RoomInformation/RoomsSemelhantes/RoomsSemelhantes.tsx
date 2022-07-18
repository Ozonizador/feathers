import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CgHome } from "react-icons/cg";

export default function RoomSemelhantes() {
  return (
    <section className="mb-40">
      <div className="mb-5 text-2xl font-bold">Casas semelhantes</div>
      <div className="mb-10 grid w-3/5 justify-start gap-52 lg:grid-cols-4">
        <article className="bg-destaques-slider1 relative h-56  w-48  rounded-lg ">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">
            320&euro;/mês
          </p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto partilhado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">
            320&euro;/mês
          </p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Casa Inteira</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">
            320&euro;/mês
          </p>
        </article>

        <article className="bg-destaques-slider2 relative h-56  w-48 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-2xl font-bold text-white">
            320&euro;/mês
          </p>
        </article>
      </div>

      <Link href="/procurar">
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
