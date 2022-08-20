import React from "react";
import { MdSmokeFree } from "react-icons/md";
import { GiBroom, GiPartyPopper } from "react-icons/gi";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { FaDog } from "react-icons/fa";

export default function DescricaoCondicoes() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="my-20 flex flex-col align-middle">
      <div className="mb-5 flex w-full flex-1 gap-5">
        <div className="flex w-2/4 text-2xl font-bold">Descrição</div>
        <div className="flex w-2/4 justify-center text-2xl font-bold">Condições da casa</div>
      </div>
      <div className="flex gap-5">
        <div className="w-2/4 py-2">
          <div className="text-justify text-base text-secondary-500">{advertisement.description}</div>
        </div>

        <div className="mt-10 flex w-2/4 flex-col justify-start lg:mt-3 lg:flex-col">
          <div className="mb-2 mt-3 flex rounded-lg shadow-2xl">
            <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
              <FaDog className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.houseRules.animalsAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>

            <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
              <GiPartyPopper className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.houseRules.eventsAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>

            <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center align-middle text-secondary-500">
              <MdSmokeFree className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.houseRules.smokeAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
