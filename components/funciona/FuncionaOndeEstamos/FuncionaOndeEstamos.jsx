import React from "react";
import Link from "next/link";
import Image from "next/image";

const FuncionaOndeEstamos = () => {
  return (
    <section className="container mx-auto my-60 flex w-11/12 rounded-2xl bg-terciary-600 py-20">
      {/* <div className="flex flex-1">MAP</div> */}

      <div className="flex flex-1 flex-col justify-center align-middle">
        <div className="w-full">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="lg:min-h-96 relative h-96 w-full lg:w-1/3">
              <Image src="/images/mapa_unihosts_funciona.jpeg" layout="fill" alt="" className="rounded-lg" />
            </div>
            <div className="sm:w-full lg:w-2/3">
              <h1 className="mb-4 text-center text-3xl font-bold lg:text-left lg:text-5xl">Onde Estamos?</h1>
              <div className="flex w-11/12  items-center rounded-full bg-white p-4 align-middle drop-shadow-md lg:w-1/2">
                <div className="">
                  <Image
                    className="flex object-scale-down "
                    src="/images/location.png"
                    alt=""
                    height="25"
                    width="25"
                  ></Image>
                </div>
                <div className="ml-2 text-base lg:text-xl">Portugal continental e ilhas</div>
              </div>

              <div className="mt-6 mb-10 text-lg">
                Pode anunciar o seu espaço de forma gratuita em todo o território nacional.
                <br />
                <br />
                Os nossos Unipackages pode encontrar nas seguintes cidades: Leiria, Santarém, Caldas da Rainha, Peniche
                e Rio Maior.
              </div>

              <Link href=" ">
                <a className="rounded-md bg-primary-500 py-3 px-11 text-center text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
                  Saber mais
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionaOndeEstamos;
