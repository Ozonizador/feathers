import { Advertisement } from "../models/advertisement";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

/* ADVERTISEMENT */
const defaultAdvertisement = {
  type: "SUPER_FLEX",
  place: "",
  streetNumber: "",
  floor: "",
  postalCode: "",
  rooms: 1,
  beds: 1,
  tenantNumber: 1,
  bathrooms: 1,
  title: "",
  description: "",
  typeFlexHost: "ENTIRE_SPACE",
  typeHost: "PARTICULAR",
  houseRules: "",
  aboutHouse: "",
  monthRent: 0,
  extraPerHost: 0,
  guaranteeValue: 0,
  expenses: "",
  hostLivesProperty: false,
} as Advertisement;

const AdvertisementContext = createContext<Advertisement>(defaultAdvertisement);
const SetAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

export const AdvertisementController = ({ children }): JSX.Element => {
  const [advertisement, setAdvertisement] = useState<Advertisement>(defaultAdvertisement);

  return (
    <AdvertisementContext.Provider value={advertisement}>
      <SetAdvertisementContext.Provider value={setAdvertisement}>
        {" "}
        {children}
      </SetAdvertisementContext.Provider>
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisement = () => {
  return useContext(AdvertisementContext);
};

export const useSetAdvertisement = () => {
  const setAdvertisement = useContext(SetAdvertisementContext);
  return (advertisement: Advertisement) => {
    setAdvertisement(advertisement);
  };
};
