import Image from "next/image";
import React, { useState } from "react";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { number } from "zod";

export const SingleRoomGrid = () => {
  const advertisement = useGetSingleAdvertisement();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slideImages = () => {
    let slideImages: { src: string }[] = [];
    advertisement?.photos.map((photo) => {
      slideImages.push({
        src: photo.url,
      });
    });
    
    return slideImages;
  };

  const handelClick = (index: number) => {
    setOpen(true);
    setIndex(index);
  };

  return (
    <section className="my-8 w-full">
      {(advertisement?.photos === null || advertisement?.photos.length === 0) && (
        <div className="flex flex-1 justify-center"></div>
      )}
      {advertisement?.photos && advertisement.photos.length > 0 && (
        <div className="grid grid-cols-12 gap-2">
          <div className="relative col-span-6 row-span-2 h-96">
            {advertisement.photos[0] ? (
              <Image
                src={advertisement.photos[0].url}
                alt="no photo available"
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handelClick(0)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-2">
            {advertisement.photos[1] ? (
              <Image
                src={advertisement.photos[1].url}
                alt="no photo available"
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handelClick(1)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-4">
            {advertisement.photos[2] ? (
              <Image
                src={advertisement.photos[2].url}
                alt="no photo available"
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handelClick(2)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-4">
            {advertisement.photos[3] ? (
              <Image
                src={advertisement.photos[3].url}
                alt="no photo available"
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handelClick(3)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="relative col-span-2">
            {advertisement.photos[4] ? (
              <Image
                src={advertisement.photos[4].url}
                alt="no photo available"
                fill
                style={{ objectFit: "cover" }}
                onClick={() => handelClick(4)}
              />
            ) : (
              <></>
            )}
          </div>

          <Lightbox open={open} close={() => setOpen(false)} plugins={[Zoom]} index={index} slides={slideImages()} />
        </div>
      )}
    </section>
  );
};

export default SingleRoomGrid;
