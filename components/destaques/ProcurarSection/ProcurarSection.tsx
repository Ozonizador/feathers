import React, { useCallback, useEffect } from "react";
import RoomCard from "./RoomCard";
import { SelectAmenityLabel, TypeAmenity, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Pagination, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Slider from "rc-slider";
import _ from "lodash";
import {
  useAdvertisementInfo,
  useCurrentProcurarAdvertisementContext,
  useSetComoditiesContext,
  useSetFiltersContext,
  useSetPageAdvertisementinfo,
} from "../../../context/ProcurarAdvertisementsProvider";
import { useGetUserCoordinates, useUserSearch } from "../../../context/MainProvider";
import { PAGE_NUMBER_COUNT } from "../../../hooks/advertisementService";
import { CoordinatesAsArray, GEO } from "../../../models/utils";
import { coordinateArrayToLatitude } from "../../../utils/map-services";
import { PROCURAR_ADVERT_URL } from "../../../models/paths";
import { format } from "date-fns";
import Button from "../../utils/Button";

const MapWithNoSSR = dynamic(() => import("../../maps/MainMap"), {
  ssr: false,
});

export default function ProcurarSection() {
  const { advertisements, count, page, loading } = useAdvertisementInfo();
  const { filter: currentFilter, order: currentOrder } = useCurrentProcurarAdvertisementContext();
  const { comodities } = currentFilter;
  const { location, startDate, endDate, coordinates } = useUserSearch();

  /* Filters */
  const setFilters = useSetFiltersContext();
  const setComoditiesFilter = useSetComoditiesContext();
  const setPage = useSetPageAdvertisementinfo();
  const currentMapCoordinates = useGetUserCoordinates();

  const router = useRouter();

  const goToAdvert = (id: string) => {
    router.push(`/anuncio/${id}`);
  };

  const locateByQuery = useCallback(() => {
    setFilters({
      coordinates: (coordinates && coordinates.coordinates) || currentMapCoordinates || undefined,
      dates: {
        startDate: startDate ? format(startDate, "yyyy-MM-dd") : "",
        endDate: endDate ? format(endDate, "yyyy-MM-dd") : "",
      },
    });
  }, [coordinates, startDate, endDate, currentMapCoordinates]);

  useEffect(() => {
    locateByQuery();
  }, [locateByQuery]);

  // Filters
  const toggleComododitiesFilter = (option: string) => {
    if (!comodities) return setComoditiesFilter([option as TypeAmenity]);

    const existentComodities = comodities;
    const existComodity = existentComodities.findIndex((commodity) => commodity === option);
    if (existComodity === -1) return setComoditiesFilter([...existentComodities, option as TypeAmenity]);

    existentComodities.splice(existComodity, 1);
    setComoditiesFilter(existentComodities);
  };

  const setPriceChange = _.debounce((value) => {
    const [startRange, endRange] = value;
    setFilters({ price: { startRange, endRange } });
  }, 400);

  const getAdvertisementsMarkers = () => {
    const markers: GEO[] = [];
    for (let advertisement of advertisements) {
      if (advertisement.geom) {
        markers.push(
          coordinateArrayToLatitude(
            (advertisement.geom as { type: string; coordinates: CoordinatesAsArray }).coordinates
          )
        );
      }
    }
    return markers;
  };

  const getTotalPages = () => {
    if (count !== 0) {
      return Math.ceil(count / PAGE_NUMBER_COUNT);
    } else return 1;
  };

  return (
    <>
      <div className="mt-5 flex flex-1 px-10">
        <div className="w-full lg:w-1/2">
          <div className="w-full lg:w-full">
            <div className="flex flex-row justify-between">
              <div className="text-sm font-bold lg:text-2xl">
                {count} espaços <span className="font-normal text-gray-400">disponíveis</span>
                {location ? (
                  <>
                    <span className="font-normal text-gray-400">{" para "}</span>
                    <span className="font-normal capitalize text-gray-400">{location.split(",")[0]}</span>
                  </>
                ) : (
                  <>{" na area"}</>
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
                      {TYPE_ADVERTISEMENT[type as keyof typeof TYPE_ADVERTISEMENT]}
                    </option>
                  );
                })}
              </select>
              <div className="flex h-20 flex-row justify-start gap-4">
                <div className="w-1/2 lg:w-52">
                  <div className="h-full w-full rounded-md border border-solid border-terciary-500 bg-white p-1 text-sm lg:w-52">
                    <div className="mb-1 text-sm">Preço</div>
                    <Slider
                      range
                      marks={{ 0: "0€", 1000: "1000€", 3000: "3000€" }}
                      defaultValue={[0, 3000]}
                      onChange={setPriceChange}
                      min={0}
                      max={3000}
                      className="mx-auto my-auto w-3/4"
                    ></Slider>
                  </div>
                </div>

                <div className="w-full flex-1">
                  <Button type="button">Mais Filtros</Button>
                </div>
              </div>

              <div className="my-2 ml-auto mt-0 hidden">
                <Link href={PROCURAR_ADVERT_URL}>
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
                        <div className="cursor-pointer" onClick={() => goToAdvert(advertisement.slug)} key={index}>
                          <RoomCard advertisement={advertisement} />
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </div>

          {advertisements && advertisements.length !== 0 && count > advertisements.length && (
            <div className="row mb-5">
              <div className="col-md-2"></div>
              <div className="flex flex-1 justify-around px-5">
                <Pagination currentPage={page} totalPages={getTotalPages()} onPageChange={(page) => setPage(page)} />
              </div>
              <div className="col-md-5"></div>
            </div>
          )}
        </div>
        <div className="z-10 hidden w-1/2 px-5 lg:block lg:h-[500px]">
          <MapWithNoSSR
            currentMapCoords={coordinates ? coordinates.coordinates : currentMapCoordinates}
            markers={getAdvertisementsMarkers()}
            showCenterMarker={false}
          />
        </div>
      </div>
    </>
  );
}
