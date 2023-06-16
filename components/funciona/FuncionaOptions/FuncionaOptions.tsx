import React from "react";
import { optionsCard1 } from "./Section4.config";
import { optionsCard2 } from "./FuncionaCard2.config";
import Link from "next/link";

import Image from "next/image";

const FuncionaOptions = () => {
  return (
    <section className="max-width mx-5 my-20 flex flex-col justify-center gap-5 lg:flex-row lg:gap-12">
      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-[30%]">
        <div>
          <h1 className="mb-9 mt-4 text-center text-2xl font-bold">Gestão da casa</h1>
          {optionsCard1.map((option, index) => {
            return (
              <div key={index} className="my-5 flex flex-row gap-1">
                <div className="mb-auto flex w-1/12">
                  <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                </div>
                <p className="my-auto -mt-1 w-9/12 text-xl lg:text-lg">{option.text}</p>
              </div>
            );
          })}
        </div>
        <hr className="my-6" />
        <div className="mt-auto">
          <h1 className="mb-8 text-center text-2xl font-bold">Preço Sob Consulta</h1>

          <div className="flex flex-1 justify-center">
            <Link href="#">
              <a className="w-full rounded-md bg-primary-300 px-7 py-2 text-center text-white">Saber mais</a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-2xl bg-white p-5 drop-shadow-2xl lg:w-[30%]">
        <div>
          <h1 className="mb-9 mt-4 text-center text-2xl font-bold">Gestão da casa premium</h1>
          <div className="flex flex-1 flex-col items-center align-middle">
            <h2 className="text-xl font-bold">Gestão da casa</h2>
            <div className="text-2xl font-bold">+</div>
          </div>
          {optionsCard2.map((option, index) => {
            return (
              <div key={index} className="my-5 flex flex-row gap-1 px-3">
                <div className="mb-auto flex w-1/12">
                  <Image className="object-scale-down" src="/images/tick.png" alt="" height="25" width="25"></Image>
                </div>
                <p className="my-auto -mt-1 w-11/12 break-words text-xl lg:text-lg">{option.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-auto">
          <hr className="my-6" />
          <h1 className="mb-8 text-center text-2xl font-bold">Preço Sob Consulta</h1>

          <div className="flex flex-1 justify-center">
            <Link href="#">
              <a className="w-full rounded-md bg-primary-300 px-7 py-2 text-center text-white">Saber mais</a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuncionaOptions;
