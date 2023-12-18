import React, { useMemo } from "react";
import { Carousel } from "flowbite-react"; 
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { houseAmenities } from "../../../../helpers/advertisementHelper";
import { TypeAmenity, TypeAmenityLabel } from "../../../../models/advertisement";
import { useTranslation } from "next-i18next";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

export default function RoomSlider() {
  const { t } = useTranslation();
  const { general_amenities, bathroom_amenities, bedroom_amenities, kitchen_amenities, exterior_amenities } =
    useGetSingleAdvertisement() || {
      general_amenities: [],
      bathroom_amenities: [],
      bedroom_amenities: [],
      kitchen_amenities: [],
      exterior_amenities: [],
    };

  function chunkArray(array: string[], size: number) {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
      array.slice(i * size, i * size + size)
    );
  }
  const Comodities = () =>
  useMemo(() => {
    const zones = [
      { amenities: general_amenities, label: t("advertisements:zones.general") },
      { amenities: bedroom_amenities, label: t("advertisements:zones.bedroom") },
      { amenities: kitchen_amenities, label: t("advertisements:zones.kitchen") },
      { amenities: bathroom_amenities, label: t("advertisements:zones.bathroom") },
      { amenities: exterior_amenities, label: t("advertisements:zones.exterior") },
    ];

    return (
      <Carousel
      leftControl={<IoIosArrowDropleft className="h-7 w-7" />}
      rightControl={<IoIosArrowDropright className="h-7 w-7" />}
    >
      {zones.map((zone, zoneIndex) => {
        const amenitiesChunks = zone.amenities
          ? chunkArray(zone.amenities, 6) 
          : [[]];

        return amenitiesChunks.map((chunk, chunkIndex) => (
          <div key={`${zoneIndex}-${chunkIndex}`} className="flex flex-col gap-8">
            <div className="mb-auto mt-5 pt-5 flex items-center justify-center text-2xl font-bold">
              {chunkIndex==1? t("advertisements:more")+ " "+ zone.label:zone.label}
            </div>
            <div className="mx-auto pb-5 pt-2 lg:pb-20 flex h-full w-11/12 flex-wrap lg:flex-nowrap justify-center align-middle">
              {chunk.map((amenity, index) => {
                const icon = houseAmenities(amenity as TypeAmenity);
                return (
                  <div className="group flex w-[90px] flex-col items-center justify-center align-middle" key={index}>
                    {icon && icon({ size: 40, color: "#505046" })}
                    <div className="mt-3 truncate text-[16px] font-medium text-[#576068] opacity-0 hover:text-clip group-hover:opacity-100">
                      {t(TypeAmenityLabel[amenity as TypeAmenity])}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ));
      })}
    </Carousel>
    );
  }, [general_amenities, bedroom_amenities, kitchen_amenities, bathroom_amenities, exterior_amenities, t]);


  return (
    <div className="mb-32 mt-10 h-48 min-h-[300px] lg:min-h-[200px] rounded-xl border lg:mt-10">
      <Comodities />
    </div>
  );
}
