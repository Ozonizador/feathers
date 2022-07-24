import React from "react";
import { Carousel } from "flowbite-react";
import { TbSofa } from "react-icons/tb";
import { BiChair } from "react-icons/bi";
import { BiJoystick } from "react-icons/bi";
import { MdFireplace } from "react-icons/md";
import { BiTv } from "react-icons/bi";
import { MdOutlineBalcony } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

export default function RoomSlider() {
  const advertisement = useGetSingleAdvertisement();
  return (
    // PROBLEMA - DAR ESTILOS AS SETAS ESQUERDA E DIREITA
    <section>
      <div className="mt-40 mb-32 h-44 rounded-xl border">
        <Carousel>
          <div>
            <div className="my-3 text-center text-2xl font-bold">Sala de estar</div>
            <div className="flex h-full items-center justify-center gap-14 align-middle">
              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <MdFireplace className="text-4xl" />
                <div className="text-base">Lareira</div>
              </div>

              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <TbSofa className="text-4xl" />
                <div className="text-base">Sofá</div>
              </div>
              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <BiTv className="text-4xl" />
                <div className="text-base">TV</div>
              </div>

              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <BiChair className="text-4xl" />
                <div className="text-base">Cadeiras</div>
              </div>

              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <MdOutlineBalcony className="text-4xl" />
                <div className="text-base">Varanda</div>
              </div>

              <div className="mb-8 flex flex-col items-center justify-center align-middle">
                <BiJoystick className="text-4xl" />
                <div className="text-base">Videojogos</div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex h-full items-center justify-center ">Quarto</div>
          </div>
          <div>
            <div className="flex h-full items-center justify-center ">Cozinha</div>
          </div>
          <div>
            <div className="flex h-full items-center justify-center ">Zona Exterior</div>
          </div>
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

/* Comoditites */
const Commodities = () => {};
