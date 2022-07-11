import Advertisement, { HouseExpenses } from "../models/advertisement";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

/* ADVERTISEMENT */
const defaultAdvertisement = {
  type: "ENTIRE_SPACE",
  place: "",
  street: "",
  streetNumber: "",
  floor: "",
  postalCode: "",
  rooms: 1,
  beds: 1,
  tenantNumber: 1,
  bathrooms: 1,
  title: "",
  description: "",
  typeFlexHost: "SUPER_FLEX",
  typeHost: "PARTICULAR",
  houseRules: "",
  aboutHouse: "",
  monthRent: 0,
  extraPerHost: 0,
  guaranteeValue: 0,
  expenses: {} as HouseExpenses,
  hostLivesProperty: false,
} as Advertisement;

const AdvertisementContext = createContext<Advertisement>(defaultAdvertisement);
const SetAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

export const AdvertisementController = ({ children }): JSX.Element => {
  const [advertisement, setAdvertisement] = useState<Advertisement>(defaultAdvertisement);
  return (
    <AdvertisementContext.Provider value={advertisement}>
      <SetAdvertisementContext.Provider value={setAdvertisement}>
        {children}
      </SetAdvertisementContext.Provider>
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisement = (): Advertisement => {
  return useContext(AdvertisementContext);
};

export const useSetAdvertisement = () => {
  const setAdvertisement = useContext(SetAdvertisementContext);
  return (advertisement: Advertisement) => {
    setAdvertisement(advertisement);
  };
};

export const useSetAdvertisementProperty = () => {
  const setAdvertisement = useContext(SetAdvertisementContext);
  const advertisement = useContext(AdvertisementContext);
  return (property: string, value: any) => {
    setAdvertisement({ ...advertisement, [property]: value });
  };
};
