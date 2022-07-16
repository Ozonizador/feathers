import React from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { CgHeart } from "react-icons/cg";
import { GrRestroom } from "react-icons/gr";
import { Rating } from "flowbite-react";
import Advertisement, { EXPENSES_TO_TEXT } from "../../../models/advertisement";

/* IMAGES */
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";

interface RoomCardProps {
  advertisement: Advertisement;
}

export default function RoomCard({ advertisement }: RoomCardProps) {
  const toggleFavourite = async () => {};

  return (
    <div>
      <div className="container mb-4">
        <div>
          <div className="cards">
            <div className="flex flex-1">
              <div className="w-1/3">
                {advertisement.photos ? (
                  <Image src={advertisement.photos[0]} alt="..." height={256} width={256} />
                ) : (
                  <Image src={NoPhotoAvailable} alt="no photo available" />
                )}
              </div>
              <div className="p-3">
                <div className="m-1">
                  <div className="flex flex-1">
                    <h6 className="mb-0 ">{advertisement.title}</h6>
                    <div className="ml-2 flex">
                      <Rating className="">
                        <Rating.Star />
                      </Rating>
                      <p>4.9</p>
                    </div>
                  </div>
                  {/* icon with images */}
                  <div className="mb-2 mt-3 flex flex-1 justify-around">
                    <div>
                      <RiUserLine className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.tenantNumber}{" "}
                        {advertisement.tenantNumber == 1 ? "Hóspede" : "Hóspedes"}
                      </span>
                    </div>
                    <div className="ml-2">
                      <BiBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.beds} {advertisement.beds == 1 ? "Cama" : "Camas"}
                      </span>
                    </div>
                    <div className="ml-2">
                      <TbBed className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.rooms} {advertisement.rooms == 1 ? "Quarto" : "Quartos"}
                      </span>
                    </div>
                    <div className="ml-2">
                      <GrRestroom className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.bathrooms}{" "}
                        {advertisement.bathrooms == 1 ? "Casa De Banho" : "Casas De Banho"}
                      </span>
                    </div>
                  </div>
                  <div className="mb-1 mt-2 flex text-xs">
                    <ul id="classlist" className="flex gap-5 px-3">
                      <li className="list-none">Wifi</li>
                      <li>Cozinha</li>
                      <li>Secretária</li>
                      <li>Varanda</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-1">
                    <div className="my-auto">
                      <button
                        className="rounded-md border-2 border-terciary-300 p-1 text-xs hover:border-primary-500"
                        onClick={toggleFavourite}
                      >
                        <CgHeart className="inline" />
                        <span className="my-auto ml-2">Favoritos</span>
                      </button>
                    </div>
                    <div className="ml-auto">
                      <div className="text-center">
                        <h3 className="text-primary-500">{advertisement.monthRent} €/mês</h3>
                        <div className="d-flex">
                          <p className="text-xs">
                            {EXPENSES_TO_TEXT[advertisement.expenses.inclusive]}
                          </p>
                          <i className="fa-solid fa-circle-info m-1"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
