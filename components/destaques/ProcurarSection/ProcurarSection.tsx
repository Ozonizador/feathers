import React, { useCallback, useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import Select from "react-select";
import { TypeAmenityLabel, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { MapCoordinates } from "../../../models/utils";
import { customStyles } from "./ProcurarSectionConfig";
import {
  useAdvertisementInfo,
  useCurrentProcurarAdvertisementContext,
  useSetComoditiesContext,
  useSetFiltersContext,
} from "../../../context/ProcurarAdvertisementsProvider";

const MapWithNoSSR = dynamic(() => import("../../maps/MainMap"), {
  ssr: false,
});

export default function ProcurarSection() {
  const { advertisements, count, page, loading } = useAdvertisementInfo();
  const { filter: currentFilter, order: currentOrder } = useCurrentProcurarAdvertisementContext();
  const setFilters = useSetFiltersContext();
  const setComoditiesFilter = useSetComoditiesContext();

  const [currentMapCoordinates, setCurrentMapCoordinates] = useState<MapCoordinates | null>(null);

  const router = useRouter();
  let { address, startDate, endDate } = router.query;

  const goToAdvert = (id: string) => {
    router.push(`/anuncio/${id}`);
  };

  const locateByQuery = useCallback(() => {
    let addressFormatted = address as string;
    let startDateFormatted = startDate as string;
    let endDateFormatted = endDate as string;

    debugger;
    setFilters({
      address: addressFormatted,
      dates: {
        startDate: startDateFormatted && startDateFormatted != "" ? new Date(startDateFormatted).toISOString() : "",
        endDate: endDateFormatted && endDateFormatted != "" ? new Date(endDateFormatted).toISOString() : "",
      },
    });
  }, [address, startDate, endDate]);

  useEffect(() => {
    locateByQuery();
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setCurrentMapCoordinates({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      },
      function errorCallback(error) {},
      { timeout: 10000 }
    );
  }, [locateByQuery]);

  // Filters
  const toggleComododitiesFilter = (options) => {
    const comoditiesFilter = options.map((option) => option.value);
    setComoditiesFilter(comoditiesFilter);
  };

  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full lg:w-full">
            <div className="flex flex-row justify-between">
              <div className="text-sm font-bold lg:text-2xl">
                {count} espaços <span className="font-normal text-gray-400">disponíveis</span>
                {address ? (
                  <>
                    <span className="font-normal text-gray-400">{" para "}</span>
                    <span className="font-normal capitalize text-gray-400">{address}</span>
                  </>
                ) : (
                  <>na area</>
                )}
              </div>
              <div className="mb-2">
                <select className="w-36 rounded-md border border-solid border-terciary-500 bg-white px-3 text-sm lg:w-60">
                  <option>Ordenar por:</option>
                  <option value="asc">Preço (crescente)</option>
                  <option value="desc">Preço (descrescente)</option>
                </select>
              </div>
            </div>

            <div className="mr-0 gap-2 lg:flex lg:flex-row">
              <select
                defaultValue={currentFilter.placeType}
                className="mb-2 w-full rounded-md border border-solid border-terciary-500 bg-white text-sm lg:mb-0 lg:w-52"
              >
                <option value="ALL">Qualquer Espaço</option>
                {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {TYPE_ADVERTISEMENT[type]}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-row justify-start gap-4">
                <div className="w-1/2">
                  <select className="h-full w-full rounded-md border border-solid border-terciary-500 bg-white text-sm lg:w-52">
                    <option>Preço</option>
                    <option>Casa</option>
                    <option>Apartamento</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <Select
                    id="comodities-select"
                    placeholder="Comodities"
                    options={TypeAmenityLabel.map((amenity) => amenity)}
                    isMulti={true}
                    styles={customStyles}
                    onChange={toggleComododitiesFilter}
                    className="h-full w-full rounded-md border border-solid border-terciary-500 bg-white text-sm lg:w-52"
                  />
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

            {loading && (
              <div className="mt-32 flex flex-1 justify-center">
                <Spinner color="info" aria-label="loading" size="lg" />
              </div>
            )}
            {!loading && (
              <>
                <div>
                  {advertisements &&
                    advertisements.map((advertisement, index) => {
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
        <div className="z-10 hidden w-1/2 px-5 lg:block lg:min-h-[500px]">
          <MapWithNoSSR currentMap={currentMapCoordinates} />
        </div>
      </div>
    </>
  );
}
