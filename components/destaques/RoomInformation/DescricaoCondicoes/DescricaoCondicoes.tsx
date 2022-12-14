import React from "react";
import { MdSmokeFree } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { FaDog } from "react-icons/fa";

export default function DescricaoCondicoes() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="my-20 flex flex-col align-middle">
      <div className="mb-5 flex w-full gap-5">
        <div className="flex w-2/4 text-2xl font-bold">Descrição</div>
        <div className="flex w-2/4 justify-center text-2xl font-bold">Condições da casa</div>
      </div>
      <div className="flex gap-5">
        <div className="w-2/4 py-2">
          <div className="text-justify text-base text-secondary-500">{advertisement.description}</div>
        </div>

        <div className="mt-10 flex w-2/4 flex-col justify-start lg:mt-3 lg:flex-col">
          <div className="mb-2 flex flex-col gap-5 rounded-lg shadow-2xl lg:flex-row lg:justify-around">
            <div className="flex flex-col items-center p-3 align-middle text-secondary-500">
              <FaDog className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.house_rules.animalsAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>

            <div className="flex flex-col items-center p-3 align-middle text-secondary-500">
              <GiPartyPopper className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.house_rules.eventsAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>

            <div className="flex  flex-col items-center p-3 align-middle text-secondary-500">
              <MdSmokeFree className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
              <div className="mt-3 text-sm">
                {advertisement.house_rules.smokeAllowed ? "Permitido" : "Não Permitido"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
