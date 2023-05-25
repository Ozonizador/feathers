import React, { useMemo } from "react";
import { Carousel } from "flowbite-react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { houseAmenities } from "../../../../helpers/advertisementHelper";
import { TypeAmenityLabel } from "../../../../models/advertisement";

export default function RoomSlider() {
  const { about_house } = useGetSingleAdvertisement();

  const { general, bathRoom, bedRoom, kitchen, livingRoom, exterior } = about_house;
  const Comodities = ({}) =>
    useMemo(() => {
      return (
        <Carousel>

          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Comodidades gerais</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!general || general.length === 0) && <div>Sem nada a assinalar</div>}
              {general &&
                general.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="mb-10 flex  flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="mt-3 text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Quarto</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!bedRoom || bedRoom.length === 0) && <div>Sem nada a assinalar</div>}
              {bedRoom &&
                bedRoom.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Cozinha</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!kitchen || kitchen.length === 0) && <div>Sem nada a assinalar</div>}
              {kitchen &&
                kitchen.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Casa de Banho</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!bathRoom || bathRoom.length === 0) && <div>Sem nada a assinalar</div>}
              {bathRoom &&
                bathRoom.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Zona de estar</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!livingRoom || livingRoom.length === 0) && <div>Sem nada a assinalar</div>}
              {livingRoom &&
                livingRoom.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center text-primary-500 mb-auto mt-5">Zona Exterior</div>
            <div className="flex h-full mx-auto justify-center gap-5 align-middle flex-wrap w-11/12">
              {(!exterior || exterior.length === 0) && <div>Sem nada a assinalar</div>}
              {exterior &&
                exterior.map((amenity, index) => {
                  const icon = houseAmenities(amenity);
                  return (
                    <div className="flex flex-col items-center justify-center align-middle" key={index}>
                      {icon({ size: 24 })}
                      <div className="text-sm">{TypeAmenityLabel[amenity]}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Carousel>
      );
    }, []);

  return (
    <div className="mb-32 mt-10 min-h-[300px] h-48 rounded-xl border lg:mt-40">
      <Comodities />
    </div>
  );
}
