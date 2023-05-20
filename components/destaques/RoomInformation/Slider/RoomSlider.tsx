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
            <div className="flex h-full items-center justify-center font-bold text-primary-500">Comodidades gerais</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-6 align-middle">
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
            <div className="flex h-full items-center justify-center text-primary-500">Quarto</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
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
            <div className="flex h-full items-center justify-center text-primary-500">Cozinha</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
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
            <div className="flex h-full items-center justify-center text-primary-500">Casa de Banho</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
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
            <div className="flex h-full items-center justify-center text-primary-500">Zona de estar</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
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
            <div className="flex h-full items-center justify-center text-primary-500">Zona Exterior</div>
            <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
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
    <div className="mb-32 mt-10 h-40 rounded-xl border lg:mt-40">
      <Comodities />
    </div>
  );
}
