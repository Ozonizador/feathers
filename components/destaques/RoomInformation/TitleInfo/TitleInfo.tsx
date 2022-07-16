import React from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { GrRestroom } from "react-icons/gr";

export default function TitleInfo() {
  return (
    <div>
      <div className="mb-8 text-5xl font-bold">Quarto privado em Peniche</div>

      <div className="mb-2 mt-3 flex">
        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <RiUserLine className=" text-4xl " />
          <div className="mt-3 text-base ">2 Hóspedes</div>
        </div>

        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <BiBed className=" text-4xl " />
          <div className="mt-3 text-base">1 cama</div>
        </div>

        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <TbBed className=" text-4xl " />
          <div className="mt-3 text-base">1 quarto</div>
        </div>

        <div className="flex h-32 w-40 flex-col items-center justify-center rounded-lg  align-middle text-secondary-500 shadow-2xl">
          <GrRestroom className=" text-4xl " />
          <div className="mt-3 text-base ">1 Casa De Banho</div>
        </div>
      </div>
    </div>
  );
}
