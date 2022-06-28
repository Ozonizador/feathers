import React from "react";
import Link from "next/link";

export default function HomeSection7() {
  return (
    <section>
      <div>
        <div className="mx-auto my-24 grid rounded-3xl bg-terciary-300 lg:grid-cols-2">
          <div className="basis-2/4 py-28 px-20 ">
            <h2 className="text-2xl font-bold text-secondary-500 lg:text-6xl ">
              Tem Uma Propriedade?
            </h2>
            <p className="py-10 text-2xl text-terciary-400">
              Comece já a anunciar e rentabilize
              <br /> o seu imóvel!
            </p>
            <Link href="/">
              <a className="rounded-full bg-primary-500 py-4 px-16 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                Anunciar
              </a>
            </Link>
          </div>
          <div className="relative rounded-3xl bg-primary-300 bg-cover">
            <Link href="/7">
              <a className="absolute bottom-10 right-10 rounded-full border-2 border-solid border-white py-4 px-8 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                Quero saber mais...
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
