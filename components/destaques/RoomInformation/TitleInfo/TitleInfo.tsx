import React from "react";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { GrRestroom } from "react-icons/gr";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

export const TitleInfo = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div>
      <div className="mb-8 text-5xl font-bold">{advertisement.title}</div>

      <div className="mb-2 mt-3 flex">
        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <RiUserLine className="text-4xl" />
          <div className="mt-3 text-base ">
            {advertisement.tenantNumber > 1
              ? `${advertisement.tenantNumber} Hóspedes`
              : `${advertisement.tenantNumber} Hóspede`}
          </div>
        </div>

        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <BiBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement.beds > 1 ? `${advertisement.beds} Camas` : `${advertisement.beds} Cama`}
          </div>
        </div>

        <div className="mr-3 flex h-32 w-40 flex-col items-center justify-center  rounded-lg align-middle text-secondary-500 shadow-2xl">
          <TbBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement.rooms > 1
              ? `${advertisement.rooms} Quartos`
              : `${advertisement.rooms} Quarto`}
          </div>
        </div>

        <div className="flex h-32 w-40 flex-col items-center justify-center rounded-lg  align-middle text-secondary-500 shadow-2xl">
          <GrRestroom className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement.bathrooms > 1
              ? `${advertisement.bathrooms} Casas de Banho`
              : `${advertisement.bathrooms} Casa de Banho`}
          </div>
        </div>
      </div>
    </div>
  );
};
