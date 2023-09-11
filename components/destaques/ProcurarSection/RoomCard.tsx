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
import { BsDot, BsHeart } from "react-icons/bs";
import { checkIfExpensesIncluded } from "../../anuncio/ExpensesComponent";
import { useTranslation } from "next-i18next";

interface RoomCardProps {
  advertisement: AdvertisementWithReviewAverage;
}

export default function RoomCard({ advertisement }: RoomCardProps) {
  const { t } = useTranslation();
  const profile = useCurrentUser();
  const setFavouriteProfile = useSetProfileFavouritesInformation();
  const advertisementOverallRating =
    (advertisement.averages && advertisement.averages[0] && advertisement.averages[0]?.overall_average?.toFixed(2)) ||
    "-";

  const toggleFavourite = async (e: React.MouseEvent, advertId: string, isFavourite: boolean) => {
    e.stopPropagation();
    if (!profile) return;
    let { favourite_rooms } = profile;

    if (isFavourite) {
      const newFavRooms = favourite_rooms?.filter((favourite) => advertId !== favourite) || [];
      await setFavouriteProfile(newFavRooms);
    } else {
      if (favourite_rooms === null) favourite_rooms = [];
      favourite_rooms.push(advertId);
      await setFavouriteProfile(favourite_rooms);
    }
  };

  const isFavourite = useCallback(() => {
    if (!profile) return false;

    const { favourite_rooms } = profile;
    if (!favourite_rooms) return false;
    const index = favourite_rooms.findIndex((room) => advertisement.id == room);
    return index !== -1;
  }, [advertisement.id, profile]);

  const getMainPhoto = useMemo(() => {
    if (!advertisement) return undefined;
    return getMainAdvertPhoto(advertisement.photos);
  }, [advertisement]);

  const showSomeAmenities = useMemo(() => {
    const { general_amenities } = advertisement;

    const amenities: string[] = ([] as string[]).concat
      .apply([], [general_amenities || []])
      .filter((opt) => !!opt)
      .slice(0, 5);

    if (!amenities) return undefined;
    return (
      <ul className="flex gap-5 pr-3 text-gray-500">
        {amenities.map((amenity, index) => {
          return (
            <li key={index} className={classNames({ "list-none": index === 0 })}>
              {TypeAmenityLabel[amenity as TypeAmenity]}
            </li>
          );
        })}
      </ul>
    );
  }, [advertisement]);

  return (
    <div>
      <div className="mb-4 mt-10 bg-white lg:rounded-xl lg:drop-shadow-2xl">
        <div className="cards">
          <div className="flex-col items-center gap-1 lg:flex lg:flex-row">
            <div className="relative h-96 w-full lg:h-56 lg:w-1/3">
              {getMainPhoto ? <Image src={getMainPhoto?.url} alt="..." fill style={{ objectFit: "cover" }} /> : <></>}
            </div>
            <div className="px-5 lg:w-2/3">
              <div className="m-1">
                <div className="flex flex-1">
                  <h6 className="mb-0 text-xl font-bold">
                    {t(TYPE_ADVERTISEMENT[advertisement.type])} - {advertisement.title}
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
                      {t("guestWithCount", { count: advertisement.tenant_number })}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <BiBed className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {t("advertisements:bedWithCount", { count: advertisement.beds })}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <TbBed className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {t("advertisements:roomWithCount", { count: advertisement.rooms })}
                    </span>
                  </div>
                  <div>
                    <BsDot className="my-auto inline" />
                    <GrRestroom className="my-auto inline" />
                    <span className="my-auto text-xs">
                      {t("advertisements:bathroomWithCount", { count: advertisement.bathrooms })}
                    </span>
                  </div>
                </div>

                {showSomeAmenities && (
                  <>
                    <div className="mb-1 mt-3 flex text-start text-xs">{showSomeAmenities}</div>
                  </>
                )}

                <div className="mt-4 flex justify-between">
                  <div>
                    <Button
                      type="submit"
                      variant="informative"
                      onClick={(e) => toggleFavourite(e, advertisement.id, isFavourite())}
                    >
                      <BsHeart className={classNames("inline")} color={isFavourite() == false ? "black" : "red"} />
                      <span className="my-auto ml-2">{t("favourites", { count: 2 })}</span>
                    </Button>
                  </div>
                  <div className="text-end">
                    <h3 className="text-xl font-bold text-primary-500">
                      {t("advertisements:price_month", { price: advertisement.month_rent })}
                    </h3>
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
  );
}
