import React, { useCallback, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import FeatherDatePicker from "../utils/FeatherDatepicker";
import { giveSearchByLocationSearch } from "../../hooks/mapService";
import _ from "lodash";
import { CoordinatesAsArray } from "../../models/utils";
import { useSetSearchLocation, useSetSearchLocationByProperty, useUserSearch } from "../../context/MainProvider";
import { coordinateArrayToLatitude } from "../../utils/map-services";

enum SearchFields {
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
  const router = useRouter();
  const { location, startDate, endDate } = useUserSearch();
  const setSearchInfoProperty = useSetSearchLocationByProperty();
  const setSearch = useSetSearchLocation();

  const [addressOptions, setAddressOptions] = useState<AddressOptionInfo[]>();

  const sendQueryRequest = () => {
    router.push("/procurar");
  };

  const getSearchByText = async (value: string) => {
    const { data, error } = await giveSearchByLocationSearch(value);
    if (!error && data) {
      const features = data.features;
      setAddressOptions(features);
    }
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
    const option = addressOptions.find((option) => value === option.place_name);
    if (option) {
      const { lat, lng } = coordinateArrayToLatitude(option.geometry.coordinates);
      setAddressOptions([]);
      setSearch({
        startDate,
        endDate,
        coordinates: { type: option.geometry.type, coordinates: { lat, lng } },
        location: option.place_name,
      });
    }
  };

  return (
    <>
      <div className="flex-row justify-center lg:mt-7 lg:flex">
        <div className="relative my-2 lg:mx-2">
          <div>
            <input
              type="search"
              className="bg-terciary-50 h-16 w-full rounded-xl border p-0 px-2 lg:w-72"
              onChange={(e) => setAddressByText(e.target.value)}
              placeholder="Encontrar &#x2302; em:"
              value={location}
            />
          </div>
          {addressOptions && addressOptions.length > 0 && (
            <div className="absolute -bottom-8 left-0 z-50 mx-2 w-full border p-2">
              <div>
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

        <div className="flex flex-row gap-2 lg:gap-0">
          <div className="z-50 my-2 w-1/2 lg:mx-2">
            <FeatherDatePicker
              date={startDate}
              className="bg-terciary-50 h-16 w-full rounded-xl border lg:w-52"
              onChange={(date) => setSearchInfoProperty(SearchFields.START_DATE, date)}
            />
          </div>
          <div className="z-50 my-2 w-1/2 lg:mx-2">
            <FeatherDatePicker
              className="bg-terciary-50 h-16 w-full rounded-xl border lg:w-52"
              date={endDate}
              onChange={(date) => setSearchInfoProperty(SearchFields.END_DATE, date)}
            />
          </div>
        </div>
        <div className="my-2">
          <button onClick={sendQueryRequest} className="h-16 w-full rounded-lg bg-primary-500 px-6 transition lg:w-32">
            <Image height={32} width={32} src="/images/icon-search.svg" className="my-auto mx-auto" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInputField;
