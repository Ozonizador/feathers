import React from "react";
import { RiUserLine } from "react-icons/ri";
import { MdSmokeFree } from "react-icons/md";
import { GiBroom } from "react-icons/gi";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

export default function DescricaoCondicoes() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="my-20 flex flex-row items-center align-middle">
      <div className="mr-5 flex w-3/4 flex-col">
        <div className="mb-5 text-2xl font-bold">Descrição</div>

        <div>
          <div className="text-justify text-base text-secondary-500">{advertisement.description}</div>
        </div>
      </div>

      <div>
        <div className="mb-5 text-2xl font-bold">Condições da casa</div>

        <div className="mb-2 mt-3 flex rounded-lg shadow-2xl">
          <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
            <RiUserLine className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
            <div className="mt-3 text-base ">{advertisement.houseRules.animalsAllowed}</div>
          </div>

          <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
            <GiBroom className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
            <div className="mt-3 text-base">{advertisement.houseRules.cleaning}</div>
          </div>

          <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
            <MdSmokeFree className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
            <div className="mt-3 text-base ">{advertisement.houseRules.smokeAllowed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
