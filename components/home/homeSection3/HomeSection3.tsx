import React, { useCallback, useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import useAdvertisementService from "../../../hooks/advertisementService";
import { useGetUserCoordinates } from "../../../context/MainProvider";
import { Advertisement, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import Image from "next/image";
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
import { PROCURAR_ADVERT_URL } from "../../../models/paths";

export default function HomeSection3() {
  const { getAdvertisementsForMainPage } = useAdvertisementService();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const currentMapCoordinates = useGetUserCoordinates();

  const getCloseAdvertisements = useCallback(async () => {
    if (currentMapCoordinates) {
      const { data, error } = await getAdvertisementsForMainPage(currentMapCoordinates.lat, currentMapCoordinates.lng);
      if (!error && data) {
        setAdvertisements(data);
      }
    }
  }, [currentMapCoordinates]);

  useEffect(() => {
    getCloseAdvertisements();
  }, [getCloseAdvertisements]);

  return (
    <>
      {!advertisements && <></>}
      {advertisements && advertisements.length > 0 && (
        <>
          <section>
            <div className="mb-28 mt-5">
              <div className="hidden lg:block">
                <div className="mb-12 flex justify-between align-middle">
                  <h2 className="text-5xl font-bold text-black">Os quartos em destaque na tua área</h2>

                  <Link href={PROCURAR_ADVERT_URL}>
                    <a className="flex items-center rounded-full bg-primary-300 px-4 align-middle">
                      Ver Mais
                      <div>
                        <BsArrowRightShort className="ml-2 rounded-full bg-white text-primary-500" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
              <h2 className="mb-8 text-4xl font-bold text-black lg:hidden">Os quartos em destaque na tua área</h2>

              <div className="grid gap-8 lg:h-96 lg:grid-cols-4">
                {advertisements.map((advertisement, index) => {
                  return (
                    <article
                      className="min-h-96 relative h-96 rounded-3xl bg-black bg-gradient-to-r from-gray-400 bg-cover p-8 transition lg:h-3/4"
                      key={index}
                    >
                      {advertisement.photos && advertisement.photos[0] ? (
                        <Image src={advertisement.photos[0].url} alt="..." layout="fill" />
                      ) : (
                        <Image src={NoPhotoAvailable} alt="no photo available" className="rounded-2xl" layout="fill" />
                      )}
                      <h2 className=" text-xl text-white">{TYPE_ADVERTISEMENT[advertisement.type]}</h2>
                      <p className="bold absolute bottom-8 right-8 text-4xl text-white">
                        &euro;{advertisement.month_rent}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="block lg:hidden">
                <div className="mb-12 mt-10 flex justify-center align-middle">
                  <Link href={PROCURAR_ADVERT_URL}>
                    <a className="flex w-full items-center justify-center rounded-full bg-primary-300 px-4 py-3 align-middle">
                      Ver Mais
                      <div>
                        <BsArrowRightShort className="ml-2 rounded-full bg-white text-primary-500" />
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
