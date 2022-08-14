import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import RoomCard from "./RoomCard";
import { getFilteredAdvertisements, PAGE_NUMBER_COUNT } from "../../../services/advertisementService";
import Advertisement, { AdvertisementWithReviewAverage, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Pagination, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { MapCoordinates } from "../../../models/utils";

const MapWithNoSSR = dynamic(() => import("../../maps/MainMap"), {
  ssr: false,
});

interface ProcurarPagination {
  advertisements: AdvertisementWithReviewAverage[];
  count: number;
}

export default function ProcurarSection() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [advertisementsInfo, setAdvertisementsInfo] = useState<ProcurarPagination>({ count: 0, advertisements: [] });
  const [currentMapCoordinates, setCurrentMapCoordinates] = useState<MapCoordinates | null>(null);

  const router = useRouter();
  const { address, startDate, endDate } = router.query;

  const getAdvertisements = useCallback(async () => {
    const { data, error, count } = await getFilteredAdvertisements(page, null);
    if (!error) {
      setAdvertisementsInfo({ advertisements: data, count });
    }
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    getAdvertisements();
  }, [getAdvertisements]);

  const goToAdvert = (id: string) => {
    router.push(`/anuncio/${id}`);
  };

  useEffect(() => {
    if (address) {
      // TODO: finish this.
      debugger;
    } else {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          setCurrentMapCoordinates({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        },
        function errorCallback(error) {},
        { timeout: 10000 }
      );
    }
  }, [address]);

  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full lg:w-full">
            <div className="flex flex-row justify-between">
              <div className="text-sm font-bold lg:text-2xl">
                23 espaços <span className="font-normal text-gray-400">disponíveis para Peniche</span>{" "}
              </div>
              <div className="mb-2">
                <select className="w-36 rounded-md border  border-solid border-terciary-500 bg-white py-2 px-3 text-sm  lg:w-60">
                  <option>Ordenar Por</option>
                  <option>Preço</option>
                  <option>Apartamento</option>
                </select>
              </div>
            </div>

            <div className=" mr-0 flex-row lg:flex">
              <select className="mb-3 mr-4 w-full rounded-md border border-solid border-terciary-500 bg-white  py-4 text-sm lg:w-52">
                <option value="all">Qualquer Espaço</option>
                {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {TYPE_ADVERTISEMENT[type]}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-row justify-start gap-4">
                <div className="flex-1">
                  <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm lg:w-52">
                    <option>Preço</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>

                <div className="flex-1">
                  <select className="w-full rounded-md  border border-solid border-terciary-500 bg-white py-4  text-sm lg:w-52">
                    <option>Comodidades</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>
              </div>

              <div className="my-2 ml-auto mt-0">
                <Link href="/procurar">
                  <a>
                    <button className="mt-4  h-14 w-1/2 rounded-lg bg-primary-500 px-6 text-white transition lg:mt-0 lg:w-full">
                      Mais Filtros
                    </button>
                  </a>
                </Link>
              </div>
            </div>

            {isLoading && (
              <div className="mt-32 flex flex-1 justify-center">
                <Spinner color="info" aria-label="loading" size="lg" />
              </div>
            )}
            {!isLoading && (
              <>
                <div>
                  {advertisementsInfo.advertisements &&
                    advertisementsInfo.advertisements.map((advertisement, index) => {
                      return (
                        <div className="cursor-pointer" onClick={() => goToAdvert(advertisement.id)} key={index}>
                          <RoomCard advertisement={advertisement} />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>

          {/* {advertisementsInfo.advertisements.length !== 0 &&
                advertisementsInfo.count !== advertisementsInfo.advertisements.length && (
                  <div className="row mb-5">
                    <div className="col-md-2"></div>
                    <div className="flex flex-1 justify-around px-5">
                      <Pagination
                        currentPage={page}
                        totalPages={advertisementsInfo.count / PAGE_NUMBER_COUNT}
                        onPageChange={(page) => setPage(page)}
                      />
                    </div>
                    <div className="col-md-5"></div>
                  </div>
                )} */}
        </div>
        <div className="z-10 hidden w-1/2 px-5 lg:block">
          <MapWithNoSSR currentMap={currentMapCoordinates} />
        </div>
      </div>
    </>
  );
}
