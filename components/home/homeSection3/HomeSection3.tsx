import React, { useCallback, useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import useAdvertisementService from "../../../hooks/advertisementService";
import { useGetUserCoordinates } from "../../../context/MainProvider";
import { Advertisement, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import Image from "next/image";
import { PROCURAR_ADVERT_URL } from "../../../models/paths";

export default function HomeSection3() {
  const { getAdvertisementsWithoutCoordinates } = useAdvertisementService();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const currentMapCoordinates = useGetUserCoordinates();

  const getCloseAdvertisements = useCallback(async () => {
    if (currentMapCoordinates) {
      const { data, error } = await getAdvertisementsWithoutCoordinates(1, {
        filter: {
          comodities: [],
          placeType: "ALL",
          price: {
            startRange: null,
            endRange: null,
          },
          coordinates: undefined,
          dates: {
            startDate: null,
            endDate: null,
          },
        },
        order: {
          byColumn: "price",
          type: "asc",
          isActive: false,
        },
      });
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
                    <Link key={index} href={`anuncio/${advertisement.slug}`}>
                      <article className="min-h-96 relative h-96 cursor-pointer rounded-3xl bg-black bg-cover p-2 opacity-70 transition lg:h-3/4">
                        {advertisement.photos && advertisement.photos[0] ? (
                          <Image src={advertisement.photos[0].url} alt="..." layout="fill" objectFit="cover" />
                        ) : (
                          <></>
                        )}
                        <h2 className="absolute top-1 z-50 p-2 text-sm text-white">
                          {TYPE_ADVERTISEMENT[advertisement.type]}
                        </h2>
                        <p className="bold absolute bottom-1 right-4 rounded-full p-3 text-4xl text-white lg:right-4">
                          &euro;{advertisement.month_rent}
                        </p>
                      </article>
                    </Link>
                  );
                })}
              </div>

              <div className="block lg:hidden">
                <div className="mx-auto mb-12 mt-10 flex w-1/2 justify-center align-middle">
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
