import Image from "next/image";
import React from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

/* IMAGES */
import NoPhotoAvailable from "../../../../public/images/imageNotAvailable.png";

export const SingleRoomGrid = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <section className="my-8 w-full">
      {advertisement.photos && advertisement.photos.length > 0 && (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6 row-span-2 bg-black">
            {advertisement.photos[0] ? (
              <Image
                src={advertisement.photos[0]}
                alt="no photo available"
                width="100%"
                height="100%"
              />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-2 bg-orange-500">
            {advertisement.photos[1] ? (
              <Image
                src={advertisement.photos[1]}
                alt="no photo available"
                width="100%"
                height="100%"
              />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-4 bg-blue-500">
            {advertisement.photos[2] ? (
              <Image
                src={advertisement.photos[2]}
                alt="no photo available"
                width="100%"
                height="100%"
              />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-4 bg-red-400">
            {advertisement.photos[3] ? (
              <Image
                src={advertisement.photos[3]}
                alt="no photo available"
                width="100%"
                height="100%"
              />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
          <div className="col-span-2 bg-purple-500">
            {advertisement.photos[4] ? (
              <Image
                src={advertisement.photos[4]}
                alt="no photo available"
                width="100%"
                height="100%"
              />
            ) : (
              <Image src={NoPhotoAvailable} alt="no photo available" />
            )}
          </div>
        </div>
      )}
      {!advertisement.photos ||
        (!advertisement.photos.length && <Image src={NoPhotoAvailable} alt="no photo available" />)}
    </section>
  );
};

export default SingleRoomGrid;
