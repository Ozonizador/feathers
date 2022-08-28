import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeSection7() {
  return (
    <section>
      <div className="my-24 w-11/12 rounded-3xl bg-terciary-300 lg:w-full">
        <div className="flex flex-col-reverse lg:flex-row">
          <div className="basis-2/4 items-center  p-0 text-center align-middle lg:p-0 lg:text-left">
            <h2 className="mt-8 text-2xl font-bold text-secondary-500 lg:mt-8 lg:ml-6 lg:text-6xl ">
              Tem Uma Propriedade?
            </h2>
            <div className="py-10 text-2xl text-terciary-400">
              <div className="hidden lg:mt-2 lg:ml-6 lg:block">
                Comece já a anunciar e rentabilize
                <br />o seu imóvel!
              </div>

              <div className="block lg:hidden">Comece já a anunciar e rentabilize o seu imóvel!</div>
            </div>
            <div className="mb-14 mt-8 lg:mb-10 lg:mt-0">
              <Link href="/anunciar">
                <a className="rounded-full bg-primary-500 py-4 px-16 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl lg:ml-6">
                  Anunciar
                </a>
              </Link>
            </div>
          </div>

          <div className="relative ml-auto h-96 w-full rounded-3xl md:h-[600px] lg:w-2/3 xl:h-[1000px]">
            <Image src="/images/img9.jpg" layout="fill" height="75%" width="75%" alt=""></Image>
            <div className="absolute right-0 bottom-0 mr-6 mb-6 lg:mr-14 lg:mb-14">
              <Link href="/funciona">
                <a className="mb-9 rounded-full border-2 border-solid border-white py-4 px-8 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                  Quero saber mais...
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
