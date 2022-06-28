import React from "react";
import { optionsCard1 } from "./Section4.config";
import { optionsCard2 } from "./FuncionaCard2.config";
import Link from "next/link";

import FuncionaSection4Card from "./FuncionaSection4Card";
import Image from "next/image";

export default function FuncionaSection4() {
  return (
    <section className="my-20 mx-10 flex flex-col justify-center gap-5 lg:mx-32 lg:flex-1 lg:flex-row">
      <div className="flex-col rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-1/2">
        <h1 className="mt-4 text-center text-2xl font-bold">Gestão da casa premium</h1>
        {optionsCard1.map((option, index) => {
          return (
            <div key={index} className="flex flex-1 flex-row">
              <Image
                className="object-scale-down"
                src="/images/tick.png"
                alt=""
                height="25"
                width="25"
              ></Image>
              <p className="my-auto ml-4 py-2 text-xl">{option.text}</p>
            </div>
          );
        })}
        <hr className="my-6" />
        <h1 className="mb-5 text-center text-2xl font-bold">Preço Sob Consulta</h1>

        <div className="flex flex-1 justify-center">
          <Link href=" ">
            <a className="rounded-md bg-primary-300 py-2 px-7 text-center text-white">Saber mais</a>
          </Link>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-1/2">
        <div>
          <h1 className="mt-4 text-center text-2xl font-bold">Gestão da casa premium</h1>
          <div className="flex flex-1 flex-col items-center align-middle">
            <h2 className="text-xl font-bold">Gestão da casa</h2>
            <div className=" text-2xl font-bold">+</div>
          </div>
          {optionsCard2.map((option, index) => {
            return (
              <div key={index} className="flex flex-row">
                <Image
                  className="object-scale-down"
                  src="/images/tick.png"
                  alt=""
                  height="25"
                  width="25"
                ></Image>
                <p className="my-auto ml-4 py-2 text-xl">{option.text}</p>
              </div>
            );
          })}
          <hr className="my-6" />
          <h1 className="mb-5 text-center text-2xl font-bold">Preço Sob Consulta</h1>

          <div className="flex flex-1 justify-center">
            <Link href=" ">
              <a className="rounded-md bg-primary-300 py-2 px-7 text-white">Saber mais</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
