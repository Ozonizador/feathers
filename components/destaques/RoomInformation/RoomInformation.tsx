import React from "react";
import { BiBed } from "react-icons/bi";
import { GrRestroom } from "react-icons/gr";
import { RiUserLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { useGetSingleAdvertisement } from "../../../context/ShowingSingleAdvertisementProvider";
import { useTranslation } from "next-i18next";

export default function RoomInformation() {
  const advertisement = useGetSingleAdvertisement();
  const { t } = useTranslation();
  return (
    <div>
      <div className="mb-8 flex flex-wrap font-bold">
        <div className="text-5xl pr-2 break-words break-all">{advertisement?.title || ""} </div>
        {advertisement?.verified && (
          <div className="text-md flex items-end">
            <p className="text-md">{t("advertisements:house_verified")}</p>
            <img className="h-10" src="/images/homeSection new-1.png" alt="House Verified" />
          </div>
        )}
      </div>
      <div className="my-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <RiUserLine className="text-4xl" />
          <div className="mt-3 text-base ">
            {advertisement && t("guestWithCount", { count: advertisement.tenant_number })}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <BiBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement && t("advertisements:bedWithCount", { count: advertisement.beds })}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <TbBed className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement && t("advertisements:roomWithCount", { count: advertisement.rooms })}
          </div>
        </div>

        <div className="mx-auto mb-10 flex h-32 w-40 flex-col items-center justify-center rounded-lg align-middle text-secondary-500  shadow-2xl lg:mx-0">
          <GrRestroom className="text-4xl" />
          <div className="mt-3 text-base">
            {advertisement && t("advertisements:bathroomWithCount", { count: advertisement.bathrooms })}
          </div>
        </div>
      </div>
    </div>
  );
}
