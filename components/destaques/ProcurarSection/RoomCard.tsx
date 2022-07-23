import React, { useCallback, useMemo } from "react";
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
import {
  useProfileInformation,
  useSetProfileFavouritesInformation,
} from "../../../context/MainProvider";
import classNames from "classnames";

interface RoomCardProps {
  advertisement: Advertisement;
}

export default function RoomCard({ advertisement }: RoomCardProps) {
  const profile = useProfileInformation();
  const setFavouriteProfile = useSetProfileFavouritesInformation();

  const toggleFavourite = async (e, advertId: string, isFavourite: boolean) => {
    e.stopPropagation();
    const { favouriteRooms } = profile;

    if (isFavourite) {
      const newFavRooms = favouriteRooms.filter((favourite) => advertId !== favourite);
      await setFavouriteProfile(newFavRooms);
    } else {
      favouriteRooms.push(advertId);
      await setFavouriteProfile(favouriteRooms);
    }
  };

  const isFavourite = useCallback(() => {
    if (profile) {
      const { favouriteRooms } = profile;
      if (favouriteRooms) {
        const index = favouriteRooms.findIndex((room) => advertisement.id == room);
        return index !== -1;
      }
    }
    return false;
  }, [advertisement.id, profile]);

  return (
    <div>
      <div className="container mb-4 rounded-xl bg-white drop-shadow-2xl">
        <div>
          <div className="cards">
            <div className="flex flex-1">
              <div className="w-1/3">
                {advertisement.photos && advertisement.photos[0] ? (
                  <Image src={advertisement.photos[0]} alt="..." height={256} width={256} />
                ) : (
                  <Image src={NoPhotoAvailable} alt="no photo available" />
                )}
              </div>
              <div className="p-3">
                <div className="m-1">
                  <div className="flex flex-1">
                    <h6 className="mb-0 text-xl font-bold">{advertisement.title}</h6>
                    <div className="ml-2 flex items-center align-middle">
                      <Rating className="">
                        <Rating.Star />
                      </Rating>
                      <p className="text-sm text-yellow-400">4.9</p>
                    </div>
                  </div>
                  {/* icon with images */}
                  <div className="mb-2 mt-3 flex flex-1 justify-around text-gray-500">
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
                    <div className="text-gra ml-2">
                      <GrRestroom className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.bathrooms}{" "}
                        {advertisement.bathrooms == 1 ? "Casa De Banho" : "Casas De Banho"}
                      </span>
                    </div>
                  </div>
                  <div className="mb-1 mt-2 flex text-start text-xs">
                    <ul id="classlist" className="pr-3-3 flex gap-5 text-gray-500">
                      <li className="list-none">Wifi</li>
                      <li>Cozinha</li>
                      <li>Secretária</li>
                      <li>Varanda</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex bg-black">
                    <div className="my-auto">
                      <button
                        className="rounded-md  border border-black  py-2 px-4 text-xs hover:border-primary-500"
                        onClick={(e) => toggleFavourite(e, advertisement.id, isFavourite())}
                      >
                        <CgHeart
                          className={classNames("inline", {
                            "fill-red-600 text-red-600": isFavourite(),
                          })}
                        />
                        <span className="my-auto ml-2">Favoritos</span>
                      </button>
                    </div>
                    <div className="relative left-36 ">
                      <div className="text-end">
                        <h3 className="text-xl font-bold text-primary-500">
                          {advertisement.monthRent} €/mês
                        </h3>
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
