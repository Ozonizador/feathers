import React from "react";
import { BiBed } from "react-icons/bi";
import { GrRestroom } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { useGetSingleAdvertisement } from "../../../context/ShowingSingleAdvertisementProvider";

export default function RoomInformation() {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div>
      <div className="mb-8 text-5xl font-bold">{advertisement.title}</div>

      <div className="my-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <RiUserLine className="text-4xl" />
          <div className="mt-3 text-base ">
            {advertisement.tenant_number > 1
              ? `${advertisement.tenant_number} Hóspedes`
              : `${advertisement.tenant_number} Hóspede`}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <BiBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement.beds > 1 ? `${advertisement.beds} Camas` : `${advertisement.beds} Cama`}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <TbBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement.rooms > 1 ? `${advertisement.rooms} Quartos` : `${advertisement.rooms} Quarto`}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
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
}
