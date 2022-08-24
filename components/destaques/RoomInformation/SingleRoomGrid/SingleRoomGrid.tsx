import Image from "next/image";
import React from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

/* IMAGES */
import NoPhotoAvailable from "../../../../public/images/imageNotAvailable.png";

export const SingleRoomGrid = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <section className="my-8 w-full">
      {(advertisement.photos === null || advertisement.photos.length === 0) && (
        <div className="flex flex-1 justify-center">
          <Image src={NoPhotoAvailable} alt="no photo available" />
        </div>
      )}
      {advertisement.photos && advertisement.photos.length > 0 && (
        <div className="grid grid-cols-12 gap-2">
          <div className="relative col-span-6 row-span-2 bg-black">
            {advertisement.photos[0] ? (
              <Image src={advertisement.photos[0].url} alt="no photo available" layout="fill" />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-2 bg-orange-500">
            {advertisement.photos[1] ? (
              <Image src={advertisement.photos[1].url} alt="no photo available" width="100%" height="100%" />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-4 bg-blue-500">
            {advertisement.photos[2] ? (
              <Image src={advertisement.photos[2].url} alt="no photo available" width="100%" height="100%" />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-4 bg-red-400">
            {advertisement.photos[3] ? (
              <Image src={advertisement.photos[3].url} alt="no photo available" width="100%" height="100%" />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-2 bg-purple-500">
            {advertisement.photos[4] ? (
              <Image src={advertisement.photos[4].url} alt="no photo available" width="100%" height="100%" />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleRoomGrid;
