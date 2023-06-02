import Image from "next/image";
import React from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

export const SingleRoomGrid = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <section className="my-8 w-full">
      {(advertisement?.photos === null || advertisement?.photos.length === 0) && (
        <div className="flex flex-1 justify-center"></div>
      )}
      {advertisement?.photos && advertisement.photos.length > 0 && (
        <div className="grid grid-cols-12 gap-2">
          <div className="relative col-span-6 row-span-2 h-96">
            {advertisement.photos[0] ? (
              <Image src={advertisement.photos[0].url} alt="no photo available" layout="fill" objectFit="cover" />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-2">
            {advertisement.photos[1] ? (
              <Image src={advertisement.photos[1].url} alt="no photo available" layout="fill" objectFit="cover" />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-4">
            {advertisement.photos[2] ? (
              <Image src={advertisement.photos[2].url} alt="no photo available" layout="fill" objectFit="cover" />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-4">
            {advertisement.photos[3] ? (
              <Image src={advertisement.photos[3].url} alt="no photo available" layout="fill" objectFit="cover" />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-2">
            {advertisement.photos[4] ? (
              <Image src={advertisement.photos[4].url} alt="no photo available" layout="fill" objectFit="cover" />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleRoomGrid;
