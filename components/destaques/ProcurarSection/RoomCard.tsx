import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { RiUserLine } from "react-icons/ri";
import { BiBed } from "react-icons/bi";
import { TbBed } from "react-icons/tb";
import { GrRestroom } from "react-icons/gr";
import { Rating } from "flowbite-react";
import {
  AdvertisementWithReviewAverage,
  TypeAmenity,
  TypeAmenityLabel,
  TYPE_ADVERTISEMENT,
} from "../../../models/advertisement";

/* IMAGES */
import { useCurrentUser, useSetProfileFavouritesInformation } from "../../../context/MainProvider";
import classNames from "classnames";
import { getMainAdvertPhoto } from "../../../helpers/advertisementHelper";
import Button from "../../utils/Button";
import { BsDot } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { checkIfExpensesIncluded } from "../../anuncio/ExpensesComponent";

interface RoomCardProps {
  advertisement: AdvertisementWithReviewAverage;
}

export default function RoomCard({ advertisement }: RoomCardProps) {
  const profile = useCurrentUser();
  const setFavouriteProfile = useSetProfileFavouritesInformation();
  const advertisementOverallRating =
    (advertisement.averages && advertisement.averages[0] && advertisement.averages[0].overall_average.toFixed(2)) ||
    "-";

  const toggleFavourite = async (e, advertId: string, isFavourite: boolean) => {
    e.stopPropagation();
    if (!profile) return;
    let { favourite_rooms } = profile;

    if (isFavourite) {
      const newFavRooms = favourite_rooms.filter((favourite) => advertId !== favourite);
      await setFavouriteProfile(newFavRooms);
    } else {
      if (favourite_rooms === null) favourite_rooms = [];
      favourite_rooms.push(advertId);
      await setFavouriteProfile(favourite_rooms);
    }
  };

  const isFavourite = useCallback(() => {
    if (profile) {
      const { favourite_rooms } = profile;
      if (favourite_rooms) {
        const index = favourite_rooms.findIndex((room) => advertisement.id == room);
        return index !== -1;
      }
    }
    return false;
  }, [advertisement.id, profile]);

  const getMainPhoto = useCallback(() => {
    if (advertisement) {
      getMainAdvertPhoto(advertisement.photos);
    } else {
      return null;
    }
  }, [advertisement]);

  const showSomeAmenities = useMemo(() => {
    if (advertisement.about_house) {
      const { general, bedRoom, bathRoom, exterior, livingRoom, kitchen } = advertisement.about_house;

      const amenities: TypeAmenity[] = [].concat.apply([], [general, exterior, bathRoom, livingRoom, kitchen, bedRoom]);
      return (
        <ul className="pr-3-3 flex gap-5 text-gray-500">
          {amenities.map((amenity, index) => {
            return (
              <li key={index} className={classNames({ "list-none": index === 0 })}>
                {TypeAmenityLabel[amenity]}
              </li>
            );
          })}
        </ul>
      );
    }
    return <></>;
  }, [advertisement]);

  return (
    <div>
      <div className="mt-10 mb-4 bg-white lg:rounded-xl lg:drop-shadow-2xl">
        <div className="cards">
          <div className="flex-col items-center gap-1 lg:flex lg:flex-row">
            <div className="relative h-96 w-full lg:h-56 lg:w-1/3">
              {getMainPhoto() ? <Image src={getMainPhoto().url} alt="..." layout="fill" objectFit="cover" /> : <></>}
            </div>
            <div className="px-5 lg:w-2/3">
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
                <div className="mb-2 mt-3 flex flex-1 gap-2 text-gray-500">
                  <div>
                    <RiUserLine className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {advertisement.tenant_number} {advertisement.tenant_number == 1 ? "Hóspede" : "Hóspedes"}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <BiBed className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {advertisement.beds} {advertisement.beds == 1 ? "Cama" : "Camas"}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <TbBed className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {advertisement.rooms} {advertisement.rooms == 1 ? "Quarto" : "Quartos"}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <GrRestroom className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {advertisement.bathrooms} {advertisement.bathrooms == 1 ? "Casa De Banho" : "Casas De Banho"}
                    </span>
                  </div>
                </div>

                {advertisement.about_house && (
                  <>
                    <div className="mb-1 mt-3 flex text-start text-xs lg:ml-3">{showSomeAmenities}</div>
                  </>
                )}

                <div className="mt-4 flex justify-between">
                  <div className="my-auto">
                    <Button
                      type="submit"
                      variant="informative"
                      onClick={(e) => toggleFavourite(e, advertisement.id, isFavourite())}
                    >
                      <AiFillHeart
                        className={classNames("inline", {
                          "fill-red-600 text-red-600": isFavourite(),
                        })}
                      />
                      <span className="my-auto ml-2">Favoritos</span>
                    </Button>
                  </div>
                  <div className="">
                    <div className="text-end">
                      <h3 className="text-xl font-bold text-primary-500">{advertisement.month_rent} €/mês</h3>
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
  );
}
