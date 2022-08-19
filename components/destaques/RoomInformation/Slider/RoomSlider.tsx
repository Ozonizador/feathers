import React, { useMemo } from "react";
import { Carousel } from "flowbite-react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { houseAmenities } from "../../../../helpers/advertisementHelper";
import { TypeAmenityLabel } from "../../../../models/advertisement";

export default function RoomSlider() {
  const { aboutHouse } = useGetSingleAdvertisement();

  const { general, bathRoom, bedRoom, kitchen, livingRoom, exterior } = aboutHouse;
  const Comodities = ({}) =>
    useMemo(() => {
      return (
        <>
          <Carousel>
            <div className="flex flex-col gap-8">
              <div className="flex h-full items-center justify-center text-primary-500">Comodidades gerais</div>
              <div className="flex h-full flex-wrap items-center justify-center gap-6 align-middle">
                {(!general || general.length === 0) && <div>Sem nada a assinalar</div>}
                {general.map((amenity, index) => {
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
              <div className="flex h-full items-center justify-center text-primary-500">Quarto</div>
              <div className="flex h-full flex-wrap items-center justify-center gap-5 align-middle">
                {(!bedRoom || bedRoom.length === 0) && <div>Sem nada a assinalar</div>}
                {bedRoom.map((amenity, index) => {
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
                {kitchen.map((amenity, index) => {
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
                {bathRoom.map((amenity, index) => {
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
                {livingRoom.map((amenity, index) => {
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
                {exterior.map((amenity, index) => {
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
        </>
      );
    }, []);

  return (
    <section>
      <div className="mt-10 mb-32 h-44 rounded-xl border lg:mt-40">
        <Carousel>
          <Comodities />
        </Carousel>
      </div>
      {/*
      <div className="mb-4 text-2xl font-bold">Mais quartos nesta casa</div>
      <div className="mb-40 grid w-96 justify-start gap-0 lg:grid-cols-2">
        <article className="bg-destaques-slider1 relative h-44  w-44  rounded-lg ">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-base font-bold text-white">&euro;320</p>
        </article>

        <article className="bg-destaques-slider2 relative h-44  w-44 rounded-lg">
          <h2 className=" mt-3 p-3 text-base text-white">Quarto Privado</h2>
          <p className="bold absolute bottom-3 right-4 text-base font-bold text-white">&euro;320</p>
        </article>
      </div> */}
    </section>
  );
}
