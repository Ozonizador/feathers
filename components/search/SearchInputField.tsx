import React, { useCallback, useMemo, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import FeatherDatePicker from "../utils/FeatherDatepicker";
import { giveSearchByLocationSearch } from "../../hooks/mapService";
import _ from "lodash";
import { CoordinatesAsArray } from "../../models/utils";
import { useSetSearchLocation, useSetSearchLocationByProperty, useUserSearch } from "../../context/MainProvider";
import { coordinatesArrayToGeoPoint } from "../../utils/map-services";
import { checkMonthsInAdvance } from "../../utils/utils";
import { useTranslation } from "next-i18next";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";

export enum SearchFields {
  START_DATE = "startDate",
  END_DATE = "endDate",
  LOCATION = "location",
  COORDINATES = "coordinates",
}

interface AddressOptionInfo {
  place_name: string;
  geometry: { type: string; coordinates: CoordinatesAsArray };
}

export const SearchInputField = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const userSearch = useUserSearch();
  const { location, startDate, endDate } = userSearch;
  const setSearchInfoProperty = useSetSearchLocationByProperty();
  const setSearch = useSetSearchLocation();

  const [addressOptions, setAddressOptions] = useState<AddressOptionInfo[]>();

  const sendQueryRequest = () => {
    router.push("/procurar");
  };

  const getSearchByText = async (value: string) => {
    const { data, error } = await giveSearchByLocationSearch(value);
    if (error || !data || data.length > 0) return;

    const features = data.features;
    if (features && features.length > 0) {
      return setAddressOptions(features);
    }
    setSearchInfoProperty(SearchFields.COORDINATES, undefined);
  };

  const checkIfMonthsAhead = (date: Date) => {
    const minDateEnd = checkMonthsInAdvance(date);
    return endDate.getTime() < minDateEnd.getTime() ? minDateEnd : endDate;
  };

  const setAddressByText = (value: string) => {
    setSearchInfoProperty(SearchFields.LOCATION, value);
    searchText(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchText = useCallback(
    _.debounce((value) => {
      getSearchByText(value);
    }, 500),
    []
  );

  const setSelectedOption = (value: string) => {
    if (!addressOptions) return;
    const option = addressOptions.find((option) => value === option.place_name);
    if (!option) return;

    const { lat, lng } = coordinatesArrayToGeoPoint(option.geometry.coordinates);
    setAddressOptions([]);
    setSearch({
      startDate,
      endDate,
      trimester_discount: null,
      semester_discount: null,
      guarantee_value: null,
      monthRent: null,
      guest_number: null,
      extra_per_host: null,
      coordinates: { type: option.geometry.type, coordinates: { lat, lng } },
      location: option.place_name,
    });
  };

  const placeholderFind = t("find") + " " + t("at");
  return (
    <>
      <div className="flex-row justify-center lg:mt-7 lg:flex">
        <div className="relative my-2 max-sm:mx-2 max-sm:w-full text-sm lg:mx-2">
          <div className="relative max-sm:mr-4">
            <FaHouse className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
            <input
              type="input"
              className="bg-terciary-50 h-14 !w-full rounded-xl border-2 border-primary-500 p-0 px-2 pl-10 focus:border-primary-500 focus:outline-none lg:w-72"
              onChange={(e) => setAddressByText(e.target.value)}
              placeholder={placeholderFind}
              value={location}
            />
          </div>
          {addressOptions && addressOptions.length > 0 && (
            <div className="absolute -left-2 z-900 mx-2 mt-2 w-full rounded border bg-white p-2">
              <div className="flex flex-col gap-2">
                {addressOptions.map((addressOption, index) => {
                  return (
                    <div key={index} onClick={(e) => setSelectedOption(addressOption.place_name)}>
                      {addressOption.place_name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-2 max-sm:flex-col lg:gap-0 mr-4">
          <div className="date-parent z-50 my-2 max-sm:mx-2 max-sm:w-full w-1/2 rounded-[14px] border-2 border-primary-500 lg:mx-2">
            <FeatherDatePicker
              placeholder={t("advertisements:date_in")}
              date={startDate}
              className="bg-terciary-50 h-14 w-full rounded-xl border-none pl-10 text-sm lg:h-full lg:w-52 "
              onChange={(date) => {
                setSearch({
                  ...userSearch,
                  startDate: date,
                  endDate: checkIfMonthsAhead(date),
                });
              }}
              minDate={new Date()}
              icon={<FaArrowAltCircleRight className="absolute left-3 top-1/2 -translate-y-1/2 transform" />}
            />
          </div>
          <div className="date-parent z-50 my-2 max-sm:mx-2 max-sm:w-full w-1/2 rounded-[14px] border-2 border-primary-500 lg:mx-2">
            <FeatherDatePicker
              placeholder={t("advertisements:date_out")}
              className="bg-terciary-50 h-14 w-full rounded-xl border-none pl-10 text-sm lg:h-full lg:w-52"
              date={endDate}
              onChange={(date) => setSearchInfoProperty(SearchFields.END_DATE, date)}
              minDate={checkMonthsInAdvance(startDate)}
              icon={<FaArrowAltCircleLeft className="absolute left-3 top-1/2 -translate-y-1/2 transform" />}
            />
          </div>
        </div>
        <div className="m-2">
          <button onClick={sendQueryRequest} className="h-14 w-full rounded-lg bg-primary-500 transition lg:w-[70px]">
            <Image height={25} width={25} src="/images/icon-search.svg" className="search-btn mx-auto my-auto" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInputField;
