import React, { useEffect } from "react";
import RoomCard from "./RoomCard";
import { TYPE_ADVERTISEMENT, TypeAdvertisement } from "../../../models/advertisement";
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
import Button from "../../utils/Button";
import { useSetModalMaisFiltros } from "../../../context/ModalMaisFiltrosProvider";
import ModalMaisFiltros from "../../modals/ModalMaisFiltros";
import { AdvertisementOrder } from "../../../server/types/advertisement";
import PopoverGeneric from "../../utils/PopoverGeneric";
import classNames from "classnames";
import { Trans, useTranslation } from "next-i18next";

const MapWithNoSSR = dynamic(() => import("../../maps/MainMap"), {
  ssr: false,
});

export default function ProcurarSection() {
  const { t } = useTranslation();
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
    router.push(`/anuncio/${id}`, undefined, { locale: router.locale });
  };

  const setPriceChange = _.debounce((value) => {
    const [startRange, endRange] = value;
    setFilters({ price: { startRange, endRange } });
  }, 400);

  const getAdvertisementsMarkers = () => {
    const markers: { title: string; link: string; geo: GEO }[] = [];
    for (let advertisement of advertisements) {
      if (advertisement.geom) {
        let marker = {
          title: advertisement.title,
          link: `/anuncio/${advertisement.slug}`,
          geo: coordinatesArrayToGeoPoint(
            (advertisement.geom as { type: string; coordinates: CoordinatesAsArray }).coordinates
          ),
        };
        markers.push(marker);
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

  useEffect(() => {
    if (!coordinates || !coordinates.coordinates) return setFilters({ coordinates: undefined });

    setFilters({ coordinates: coordinates.coordinates });
  }, [coordinates]);

  return (
    <>
      <ModalMaisFiltros />
      <div className="mt-5 flex flex-1 px-10">
        <div className={`w-full ${location ? "lg:w-1/2" : ""}`}>
          <div className="w-full lg:w-full">
            <div className="flex flex-row justify-between">
              <div className="text-sm font-bold lg:text-2xl">
                <Trans
                  i18nKey="available_options"
                  values={{ count: count }}
                  components={{
                    1: <strong className="font-normal text-gray-400">{t("available")}</strong>,
                  }}
                />
                {location ? (
                  <>
                    <span className="font-normal text-gray-400">{t("for")}</span>
                    <span className="font-normal capitalize text-gray-400"> {location.split(",")[0]}</span>
                  </>
                ) : (
                  <>{t("in_area")}</>
                )}
              </div>
              <div className="mb-2">
                <select
                  className="w-fit rounded-md border border-solid border-terciary-500 bg-white px-3 text-sm"
                  onChange={changeOrderFilter}
                  value={currentOrder.byColumn}
                >
                  <option>{t("order_by")}</option>
                  <option value="price-asc">{t("order_price_asc")}</option>
                  <option value="price-desc">{t("order_price_desc")}</option>
                  <option value="rating">{t("best_classification")}</option>
                  <option value="time">{t("most_recent")}</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <PopoverGeneric title={t("advertisements:type_house")}>
                <div className="grid w-96 grid-cols-2 gap-4 rounded-lg bg-white p-3 text-neutral-500">
                  <div
                    className={classNames("my-auto rounded-xl border p-3 text-xs", {
                      "border-primary-500 text-primary-500": currentFilter.placeType === "ALL",
                      "border-neutral-500": currentFilter.placeType !== "ALL",
                    })}
                    onClick={() => setFilters({ placeType: "ALL" as TypeAdvertisement })}
                  >
                    {t("any_space")}
                  </div>
                  {Object.keys(TYPE_ADVERTISEMENT).map((type, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setFilters({ placeType: type as TypeAdvertisement })}
                        className={classNames("my-auto rounded-xl border p-3 text-xs", {
                          "border-primary-500 text-primary-500": currentFilter.placeType === type,
                          "border-neutral-500": currentFilter.placeType !== type,
                        })}
                      >
                        {t(TYPE_ADVERTISEMENT[type as keyof typeof TYPE_ADVERTISEMENT])}
                      </div>
                    );
                  })}
                </div>
              </PopoverGeneric>
              <PopoverGeneric title={t("advertisements:price", { count: 1 })}>
                <div className="w-fit">
                  <Slider
                    range
                    marks={{ 0: "0€", 1000: "1000€", 3000: "3000€" }}
                    defaultValue={[0, 3000]}
                    onChange={setPriceChange}
                    min={0}
                    max={3000}
                    className="mx-5 my-auto w-64 py-10"
                  ></Slider>
                </div>
              </PopoverGeneric>

              <div className="ml-auto h-full w-fit">
                <Button type="button" onClick={() => setModalMaisFiltros(true)} padding="md">
                  {t("more_filters")}
                </Button>
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
                    (advertisements.length == 0 && <div className="mt-5">{t("no_available_spaces")}</div>)}
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
            currentMapCoords={
              coordinates
                ? coordinates.coordinates
                : currentMapCoordinates
                ? currentMapCoordinates
                : { lat: 38.707751, lng: -9.136592 }
            }
            markers={getAdvertisementsMarkers()}
            showCenterMarker={false}
          />
        </div>
      </div>
    </>
  );
}
