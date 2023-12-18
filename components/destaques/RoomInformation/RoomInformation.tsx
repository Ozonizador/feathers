import React from "react";
import { BiBed } from "react-icons/bi";
import { GrRestroom } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { useGetSingleAdvertisement } from "../../../context/ShowingSingleAdvertisementProvider";
import { useTranslation } from "next-i18next";
import Image from "next/image";

export default function RoomInformation() {
  const advertisement = useGetSingleAdvertisement();
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-8 flex flex-wrap font-bold">
        <div className="break-words break-all pr-2 text-5xl">{advertisement?.title || ""} </div>
        {advertisement?.verified && (
          <div className="text-md flex items-end">
            <p className="text-md">{t("advertisements:house_verified")}</p>
            <img className="h-10" src="/images/homeSection new-1.png" alt="House Verified" />
          </div>
        )}
      </div>
      <div className="my-3 grid grid-cols-2 gap-5 lg:grid-cols-5 w-screen" style={{ width: '-webkit-fill-available' }}>
  <div className="mx-auto mb-10 flex xl:w-[125px] xl:h-[125px] w-40 h-40 lg:w-24 lg:h-24 flex-col items-center shadow-md justify-center rounded-lg align-middle text-secondary-500 lg:mx-0 aspect-w-1 aspect-h-1">
    <RiUserLine className="xl:text-4xl lg:text-2xl text-4xl" />
    <div className="mt-3 xl:text-[13px] lg:text-[13px] text-base">
      {advertisement && t("guestWithCount", { count: advertisement.tenant_number })}
    </div>
  </div>

  <div className="mx-auto mb-10 flex xl:w-[125px] xl:h-[125px] w-40 h-40 lg:w-24 lg:h-24  flex-col shadow-md items-center justify-center rounded-lg align-middle text-secondary-500 lg:mx-0 aspect-w-1 aspect-h-1">
    <BiBed className="xl:text-4xl lg:text-2xl text-4xl"/>
    <div className="mt-3 xl:text-[13px] lg:text-[13px] text-base">
      {advertisement && t("advertisements:bedWithCount", { count: advertisement.beds })}
    </div>
  </div>

  <div className="mx-auto mb-10 flex xl:w-[125px] xl:h-[125px] w-40 h-40 lg:w-24 lg:h-24  flex-col shadow-md items-center justify-center rounded-lg align-middle text-secondary-500 lg:mx-0 aspect-w-1 aspect-h-1">
    <TbBed className="xl:text-4xl lg:text-2xl text-4xl" />
    <div className="mt-3 xl:text-[13px] lg:text-[13px] text-base">
      {advertisement && t("advertisements:roomWithCount", { count: advertisement.rooms })}
    </div>
  </div>

  <div className="mx-auto mb-10 flex xl:w-[125px] xl:h-[125px] w-40 h-40 lg:w-24 lg:h-24  flex-col shadow-md items-center justify-center rounded-lg align-middle text-secondary-500 lg:mx-0 aspect-w-1 aspect-h-1">
    <GrRestroom className="xl:text-4xl lg:text-2xl text-4xl text-secondary-500" />
    <div className="mt-3 xl:text-[13px] lg:text-[13px] text-base">
      {advertisement && t("advertisements:bathroomWithCount", { count: advertisement.bathrooms })}
    </div>
  </div>
</div>

    </div>
  );
}
