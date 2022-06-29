import React from "react";
import Link from "next/link";
import Image from "next/image";

const FuncionaOndeEstamos = () => {
  return (
    <section className="container mx-auto my-60 flex rounded-2xl bg-terciary-600 py-20">
      <div className="flex flex-1">MAP</div>

      <div className="flex flex-1 flex-col justify-center align-middle">
        <div className="w-3/4">
          <h1 className="m- text-6xl font-bold">Onde Estamos?</h1>
          <div className="flex w-80 items-center rounded-full bg-white p-4 align-middle drop-shadow-md">
            <div className="">
              <Image
                className="flex object-scale-down "
                src="/images/location.png"
                alt=""
                height="25"
                width="25"
              ></Image>
            </div>
            <div className="ml-2 text-xl">Portugal continental e ilhas</div>
          </div>

          <div className="mt-6 mb-10 text-lg">
            Pode anunciar o seu espaço de forma gratuita em todo o território nacional.
            <br />
            <br />
            Nas zonas assinaladas já pode encontrar os nossos unipackages!
          </div>

          <Link href=" ">
            <a className="rounded-md bg-primary-500 py-3 px-11 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Saber mais
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FuncionaOndeEstamos;
