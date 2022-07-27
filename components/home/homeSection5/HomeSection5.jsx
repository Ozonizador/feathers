import React from "react";
import HomeSection5Cards from "../homeSection5Cards/HomeSection5Cards";
import Link from "next/link";
// import Image from "next-image"

import { CgHome } from "react-icons/cg";

export default function HomeSection5() {
  return (
    <section>
      <div className="container mx-auto px-8 pt-24 pb-36">
        <h2 className="text-3xl mb-12 lg:text-5xl font-bold">Como Funciona?</h2>
        <div className="mb-24 grid gap-10 lg:grid-cols-3">
          <HomeSection5Cards
            img="/images/homeSection2-3.svg"
            heading="Pesquisa"
            text="De forma intuitiva defina a localização, datas e características que pretende para um estadia ideal!"
          />
          <HomeSection5Cards
            img="/images/homeSection5-2.svg"
            heading="Reserva"
            text="Assim que o pedido for confirmado irás agilizar e esclarecer com o senhorio a data de mudança e entrega das chaves."
          />
          <HomeSection5Cards
            img="/images/homeSection5-3.svg"
            heading="Mudança"
            text="O primeiro pagamento só será transferido após verificares a casa, estamos aqui para qualquer questão. Boa estadia!"
          />
        </div>
        <span className="hidden lg:flex justify-center">
          <Link href="/4_5">
            <a className="hover: flex w-1/5 items-center justify-center  rounded-xl bg-primary-500 p-5 text-white duration-200 ease-in hover:text-white hover:drop-shadow-xl">
              Encontrar{" "}
              <span className="px-1">
                <CgHome />
              </span>{" "}
              um...
            </a>
          </Link>
        </span>
      </div>
    </section>
  );
}
