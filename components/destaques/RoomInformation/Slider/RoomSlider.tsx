import React, { useMemo } from "react";
import { Carousel } from "flowbite-react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { houseAmenities } from "../../../../helpers/advertisementHelper";
import { HouseZonesLabel, TypeAmenity, TypeAmenityLabel } from "../../../../models/advertisement";

export default function RoomSlider() {
  const zones = Object.keys(HouseZonesLabel);
  const {
    general_amenities,
    bathroom_amenities,
    bedroom_amenities,
    kitchen_amenities,
    livingroom_amenities,
    exterior_amenities,
  } = useGetSingleAdvertisement() || {
    general_amenities: [],
    bathroom_amenities: [],
    bedroom_amenities: [],
    kitchen_amenities: [],
    exterior_amenities: [],
  };

  const Comodities = ({}) =>
    useMemo(() => {
      return (
        <Carousel>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Comodidades gerais</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!general_amenities || general_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {general_amenities &&
                general_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="mb-10 flex  flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="mt-3 text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Quarto</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!bedroom_amenities || bedroom_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {bedroom_amenities &&
                bedroom_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Cozinha</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!kitchen_amenities || kitchen_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {kitchen_amenities &&
                kitchen_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Casa de Banho</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!bathroom_amenities || bathroom_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {bathroom_amenities &&
                bathroom_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Zona de estar</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!livingroom_amenities || livingroom_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {livingroom_amenities &&
                livingroom_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mb-auto mt-5 flex items-center justify-center text-primary-500">Zona Exterior</div>
            <div className="mx-auto flex h-full w-11/12 flex-wrap justify-center gap-5 align-middle">
              {(!exterior_amenities || exterior_amenities.length === 0) && <div>Sem nada a assinalar</div>}
              {exterior_amenities &&
                exterior_amenities.map((amenity: string, index: number) => {
                  const icon = houseAmenities(amenity as TypeAmenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon && icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity as TypeAmenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Carousel>
      );
    }, []);

  return (
    <div className="mb-32 mt-10 h-48 min-h-[300px] rounded-xl border lg:mt-40">
      <Comodities />
    </div>
  );
}
