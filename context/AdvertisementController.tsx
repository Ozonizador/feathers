import Advertisement, {
  AboutHouseSections,
  AdvertisementStatus,
  HouseExpenses,
  HouseRules,
  INCLUSIVE_EXPENSES,
} from "../models/advertisement";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";

/* ADVERTISEMENT */
const defaultAdvertisement = {
  type: "ENTIRE_SPACE",
  typeFlexHost: "SUPER_FLEX",
  typeHost: "PARTICULAR",
  place: "",
  street: "",
  streetNumber: "",
  floor: "",
  postalCode: "",
  title: "",
  description: "",
  hostId: "",
  aboutHouse: {
    bathRoom: [],
    bedRoom: [],
    kitchen: [],
    livingRoom: [],
    exterior: [],
    general: [],
  } as AboutHouseSections,
  rooms: 1,
  beds: 1,
  tenantNumber: 1,
  bathrooms: 1,
  monthRent: 0,
  extraPerHost: 0,
  guaranteeValue: 0,
  houseRules: {} as HouseRules,
  expenses: {
    inclusive: INCLUSIVE_EXPENSES.INCLUDED,
    servicesExcluded: [],
    servicesIncluded: [],
  } as HouseExpenses,
  hostLivesProperty: false,
  available: AdvertisementStatus.AVAILABLE,
} as Advertisement;

const AdvertisementContext = createContext<Advertisement>(defaultAdvertisement);
const SetAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

export const AdvertisementController = ({ children }): JSX.Element => {
  const { user } = useUser();
  const [advertisement, setAdvertisement] = useState<Advertisement>(defaultAdvertisement);

  useEffect(() => {
    if (user) {
      setAdvertisement((oldAdvert) => {
        return { ...oldAdvert, hostId: user.id };
      });
    }
  }, [user]);

  return (
    <AdvertisementContext.Provider value={advertisement}>
      <SetAdvertisementContext.Provider value={setAdvertisement}>{children}</SetAdvertisementContext.Provider>
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
