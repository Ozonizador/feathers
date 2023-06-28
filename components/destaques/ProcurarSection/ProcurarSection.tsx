import React, { useCallback, useEffect } from "react";
import RoomCard from "./RoomCard";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Pagination, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Slider from "rc-slider";
import _ from "lodash";
import {
  useAdvertisementInfo,
  useCurrentProcurarAdvertisementContext,
  useSetFiltersContext,
  useSetOrderContext,
  useSetPageAdvertisementinfo,
} from "../../../context/ProcurarAdvertisementsProvider";
import { useGetUserCoordinates, useUserSearch } from "../../../context/MainProvider";
import { PAGE_NUMBER_COUNT } from "../../../hooks/advertisementService";
import { CoordinatesAsArray, GEO } from "../../../models/utils";
import { coordinatesArrayToGeoPoint } from "../../../utils/map-services";
import { format } from "date-fns";
import Button from "../../utils/Button";
import { useSetModalMaisFiltros } from "../../../context/ModalMaisFiltrosProvider";
import ModalMaisFiltros from "../../modals/ModalMaisFiltros";
import { AdvertisementOrder } from "../../../server/types/advertisement";

const MapWithNoSSR = dynamic(() => import("../../maps/MainMap"), {
  ssr: false,
});

export default function ProcurarSection() {
  const { advertisements, count, page, loading } = useAdvertisementInfo();
  const { filter: currentFilter, order: currentOrder } = useCurrentProcurarAdvertisementContext();
  const { location, coordinates } = useUserSearch();

  /* Filters */
  const setFilters = useSetFiltersContext();
  const setOrderFilter = useSetOrderContext();
  const setPage = useSetPageAdvertisementinfo();
  const currentMapCoordinates = useGetUserCoordinates();

  // Modal mais filtros
  const setModalMaisFiltros = useSetModalMaisFiltros();

  const router = useRouter();

  const goToAdvert = (id: string) => {
    router.push(`/anuncio/${id}`);
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
          coordinatesArrayToGeoPoint(
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

  const changeOrderFilter = (event: React.ChangeEvent<any>) => {
    const optionValue = event.target.value as string;
    const arr = optionValue.split("-");

    let ascending = arr[0] === "price" ? arr[1] : arr[0] === "rating" ? "desc" : "asc";
    setOrderFilter({
      byColumn: arr[0],
      isActive: true,
      type: ascending,
    } as AdvertisementOrder);
  };

  return (
    <>
      <ModalMaisFiltros />
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
                <select
                  className="w-fit rounded-md border border-solid border-terciary-500 bg-white px-3 text-sm"
                  onChange={changeOrderFilter}
                >
                  <option>Ordenar por:</option>
                  <option value="price-asc">Preço (crescente)</option>
                  <option value="price-desc">Preço (descrescente)</option>
                  <option value="rating">Melhor classificação</option>
                  <option value="time">Mais recente</option>
                </select>
              </div>
            </div>

            <div className="mt-4 gap-2 lg:flex lg:flex-row">
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
              <div className="flex h-20 w-full flex-row justify-start gap-4">
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

                <div className="h-full w-full">
                  <Button type="button" onClick={() => setModalMaisFiltros(true)}>
                    Mais Filtros
                  </Button>
                </div>
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
                  {!advertisements ||
                    (advertisements.length == 0 && <div className="mt-5">Não tem espaços disponíveis</div>)}
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
