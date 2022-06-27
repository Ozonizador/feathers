import React from "react";
import Link from "next/link";

export default function HomeSection7() {
  return (
    <section>
      <div className="container-fluid">
        <div className="container mx-auto bg-terciary-300 grid grid-cols-2 my-24 rounded-3xl">
          <div className="basis-2/4 py-28 px-20 ">
            <h2 className="text-6xl font-bold text-secondary-500 ">Tem Uma Propriedade?</h2>
            <p className="text-2xl py-10 text-terciary-400">
              Comece já a anunciar e rentabilize<br /> o seu imóvel!
            </p>
            <Link href="/">
              <a className="py-4 px-16 bg-primary-500 text-white rounded-full duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                Anunciar
              </a>
                
            </Link>
          </div>
          <div className="relative bg-primary-300 bg-cover rounded-3xl">
            <Link href="/7" >
            <a className="absolute text-white bottom-10 right-10 py-4 px-8 rounded-full border-solid border-2 border-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">Quero saber mais...</a> 
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
