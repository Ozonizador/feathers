import React from "react";
import Link from "next/link";

export default function HomeSection7() {
  return (
    <section>
      <div className="w-11/12 rounded-3xl  mx-auto bg-terciary-300 my-24   lg:w-4/5 ">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="items-center align-middle text-center p-0 lg:text-left lg:p-32">
            <h2 className="text-2xl font-bold text-secondary-500 lg:text-6xl mt-8 lg:mt-0">
              Tem Uma Propriedade?
            </h2>
            <p className="py-10 text-2xl text-terciary-400">
              <div className="hidden lg:block">
                Comece já a anunciar e rentabilize
                <br />
                o seu imóvel!
              </div>

              <div className="block lg:hidden">
                Comece já a anunciar e rentabilizeo seu imóvel!
              </div>



            </p>
            <div className="mb-14 mt-8">
              <Link href="/">
                <a className=" rounded-full bg-primary-500 py-4 px-16 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                  Anunciar
                </a>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-[url('/images//img9.jpg')] bg-cover w-full flex items-end justify-center lg:justify-end h-96">
            <div className="mr-0 mb-9 lg:mr-11 lg:mb-14 ">

              <Link href="/7">
                <a className="mb-9 rounded-full border-2 border-solid border-white py-4 px-8 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                  Quero saber mais...
                </a>
              </Link>
            </div>
          </div>

        </div>
      </div>

























      {/* <div>
        <div className="mx-auto my-24 grid rounded-3xl bg-primary-500 lg:grid-cols-2 w-11/12 bg-[url('/images//img9.jpg')] bg-cover bg-left-top bg-no-repeat lg:w-4/5">
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
      </div> */}
    </section >
  );
}
