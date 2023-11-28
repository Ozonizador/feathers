import React, { useMemo } from "react";
import { Carousel } from "flowbite-react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { houseAmenities } from "../../../../helpers/advertisementHelper";
import { TypeAmenity, TypeAmenityLabel } from "../../../../models/advertisement";
import { useTranslation } from "next-i18next";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

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

  const Comodities = ({}) =>
    useMemo(() => {
      return (
        <Carousel leftControl={<BiLeftArrowAlt />} rightControl={<BiRightArrowAlt />}>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">
              {t("advertisements:zones.general")}
            </div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!general_amenities || general_amenities.length === 0) && <div>{t("advertisements:no_comodities")}</div>}
              {general_amenities &&
                general_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="group mb-10 flex  flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 40 })}
                      <div className="mt-3 truncate text-sm opacity-0 hover:text-clip group-hover:opacity-100">
                        {t(TypeAmenityLabel[amenity as TypeAmenity])}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">
              {t("advertisements:zones.bedroom")}
            </div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!bedroom_amenities || bedroom_amenities.length === 0) && <div>{t("advertisements:no_comodities")}</div>}
              {bedroom_amenities &&
                bedroom_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="group flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 40 })}
                      <div className="truncate text-sm opacity-0 hover:text-clip group-hover:opacity-100">
                        {t(TypeAmenityLabel[amenity as TypeAmenity])}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">
              {t("advertisements:zones.kitchen")}
            </div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!kitchen_amenities || kitchen_amenities.length === 0) && <div>{t("advertisements:no_comodities")}</div>}
              {kitchen_amenities &&
                kitchen_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="group flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 40 })}
                      <div className="truncate text-sm opacity-0 hover:text-clip group-hover:opacity-100">
                        {t(TypeAmenityLabel[amenity as TypeAmenity])}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">
              {t("advertisements:zones.bathroom")}
            </div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!bathroom_amenities || bathroom_amenities.length === 0) && (
                <div>{t("advertisements:no_comodities")}</div>
              )}
              {bathroom_amenities &&
                bathroom_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="group flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 40 })}
                      <div className="truncate text-sm opacity-0 hover:text-clip group-hover:opacity-100">
                        {t(TypeAmenityLabel[amenity as TypeAmenity])}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">
              {t("advertisements:zones.exterior")}
            </div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!exterior_amenities || exterior_amenities.length === 0) && (
                <div>{t("advertisements:no_comodities")}</div>
              )}
              {exterior_amenities &&
                exterior_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="group flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 40 })}
                      <div className="truncate text-sm opacity-0 hover:text-clip group-hover:opacity-100">
                        {t(TypeAmenityLabel[amenity as TypeAmenity])}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Carousel>
      );
    }, []);

  return (
    <div className="mb-32 mt-10 h-48 min-h-[400px] rounded-xl border lg:mt-40">
      <Comodities />
    </div>
  );
}
