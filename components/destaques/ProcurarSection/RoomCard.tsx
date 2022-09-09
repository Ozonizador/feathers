import React, { useCallback } from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { CgHeart } from "react-icons/cg";
import { GrRestroom } from "react-icons/gr";
import { Rating } from "flowbite-react";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";

/* IMAGES */
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
import { useProfileInformation, useSetProfileFavouritesInformation } from "../../../context/MainProvider";
import classNames from "classnames";
import { AdvertisementWithReviewAverage } from "../../../services/advertisementService";
import { checkIfExpensesIncluded } from "../../../helpers/advertisementHelper";

interface RoomCardProps {
  advertisement: AdvertisementWithReviewAverage;
}

export default function RoomCard({ advertisement }: RoomCardProps) {
  const profile = useProfileInformation();
  const setFavouriteProfile = useSetProfileFavouritesInformation();
  const advertisementOverallRating =
    (advertisement.averages && advertisement.averages[0] && advertisement.averages[0].overallAverage.toFixed(2)) || "-";

  const toggleFavourite = async (e, advertId: string, isFavourite: boolean) => {
    e.stopPropagation();
    let { favouriteRooms } = profile;

    if (isFavourite) {
      const newFavRooms = favouriteRooms.filter((favourite) => advertId !== favourite);
      await setFavouriteProfile(newFavRooms);
    } else {
      if (favouriteRooms === null) {
        favouriteRooms = [];
      }
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
      <div className="mt-10 mb-4 bg-white lg:rounded-xl lg:drop-shadow-2xl">
        <div>
          <div className="cards">
            <div className="flex-col items-center lg:flex lg:flex-row">
              <div className="relative h-96 w-full lg:w-1/3 lg:pl-4">
                {advertisement.photos && advertisement.photos[0] ? (
                  <Image src={advertisement.photos[0].url} alt="..." layout="fill" />
                ) : (
                  <Image src={NoPhotoAvailable} alt="no photo available" className="rounded-2xl" layout="fill" />
                )}
              </div>
              <div className="p-3 lg:w-2/4">
                <div className="m-1">
                  <div className="flex flex-1">
                    <h6 className="mb-0 text-xl font-bold">
                      {TYPE_ADVERTISEMENT[advertisement.type]} - {advertisement.title}
                    </h6>
                    <div className="ml-2 flex items-center align-middle">
                      <Rating className="">
                        <Rating.Star filled={true} />
                      </Rating>
                      <p className="text-sm text-yellow-400">{advertisementOverallRating}</p>
                    </div>
                  </div>
                  {/* icon with images */}
                  <div className="mb-2 mt-3 flex flex-1 justify-around text-gray-500">
                    <div>
                      <RiUserLine className="my-auto inline" />
                      <span className="my-auto ml-1 text-xs">
                        {advertisement.tenantNumber} {advertisement.tenantNumber == 1 ? "Hóspede" : "Hóspedes"}
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
                        {advertisement.bathrooms} {advertisement.bathrooms == 1 ? "Casa De Banho" : "Casas De Banho"}
                      </span>
                    </div>
                  </div>
                  <div className="mb-1 mt-3 flex text-start text-xs lg:ml-3">
                    <ul className="pr-3-3 flex gap-5 text-gray-500">
                      <li className="list-none">Wifi</li>
                      <li>Cozinha</li>
                      <li>Secretária</li>
                      <li>Varanda</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <div className="my-auto">
                      <button
                        className="rounded-md  border border-black py-2 px-4 text-xs hover:border-primary-500 lg:text-base"
                        onClick={(e) => toggleFavourite(e, advertisement.id, isFavourite())}
                      >
                        <CgHeart
                          className={classNames("inline", {
                            "fill-gray-800 text-gray-800": isFavourite(),
                          })}
                        />
                        <span className="my-auto ml-2">Favoritos</span>
                      </button>
                    </div>
                    <div className="">
                      <div className="text-end">
                        <h3 className="text-xl font-bold text-primary-500">{advertisement.monthRent} €/mês</h3>
                        <div className="d-flex">
                          <p className="mt-1 text-xs lg:text-base">
                            {checkIfExpensesIncluded(advertisement.expenses.services || [])}
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
