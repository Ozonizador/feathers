import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeSection7() {
  return (
    <section>
      <div className="my-24 rounded-3xl bg-terciary-300 lg:w-full">
        <div className="flex flex-col-reverse lg:flex-row lg:h-96">
          <div className="items-center p-0 text-center align-middle lg:basis-2/4 lg:p-0 lg:text-left lg:ml-12">
            <h2 className="mt-8 py-8 text-2xl font-bold text-secondary-500 lg:mt-8 lg:ml-6 lg:text-5xl ">
              Tem Uma<br /> Propriedade?
            </h2>
            <div className="lg:pb-0 text-2xl text-terciary-400 -mb-6">
              <div className="hidden lg:mt-2 lg:ml-6 lg:block">
                Comece já a anunciar e rentabilize
                <br />o seu imóvel!
              </div>

              <div className="block lg:hidden">Comece já a anunciar e rentabilize o seu imóvel!</div>
            </div>
            <div className="mb-14 mt-8 lg:mb-20 lg:mt-0 lg:pt-16">
              <Link href="/anunciar">
                <a className="rounded-full bg-primary-500 py-4 px-16 lg:px-9  text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl lg:ml-6">
                  Anunciar
                </a>
              </Link>
            </div>
          </div>
          <div className="lg:min-h-96 h-96 w-full rounded-3xl lg:basis-2/4">
            <div className="relative h-full w-full">
              <div className="absolute h-full w-full">
                <Image src="/images/house-key.jpg" layout="fill" alt="" className="rounded-3xl"></Image>
              </div>
              <div className="absolute right-20  bottom-10  mb-6 lg:right-8 lg:bottom-6">
                <Link href="/funciona">
                  <a className=" mb-9 rounded-full  bg-black/30 border-2 border-solid border-white py-4 px-8 text-white duration-200 ease-in hover:bg-primary-500 hover:text-white hover:drop-shadow-xl">
                    Quero saber mais...
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
