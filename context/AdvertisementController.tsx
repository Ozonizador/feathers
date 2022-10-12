import Advertisement, {
  AboutHouseSections,
  AdvertisementStatus,
  HouseExpenses,
  HouseRules,
  InclusiveExpenses,
} from "../models/advertisement";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { createRandomUniqWord } from "../utils/utils";

/* ADVERTISEMENT */
const defaultAdvertisement = {
  slug: createRandomUniqWord(),
  type: "ENTIRE_SPACE",
  type_flex_host: "SUPER_FLEX",
  type_host: "PARTICULAR",
  place: "",
  street: "",
  street_number: "",
  floor: "",
  postal_code: "",
  title: "",
  description: "",
  host_id: "",
  about_house: {
    bathRoom: [],
    bedRoom: [],
    kitchen: [],
    livingRoom: [],
    exterior: [],
    general: [],
  } as AboutHouseSections,
  rooms: 1,
  beds: 1,
  tenant_number: 1,
  bathrooms: 1,
  month_rent: 0,
  extra_per_host: 0,
  guarantee_value: 0,
  house_rules: {} as HouseRules,
  expenses: {
    inclusive: InclusiveExpenses.INCLUDED,
    services: [],
  } as HouseExpenses,
  host_lives_property: false,
  available: AdvertisementStatus.DISABLED,
  geom: null,
  max_rooms: 1,
} as Advertisement;

const AdvertisementContext = createContext<Advertisement>(defaultAdvertisement);
const SetAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

export const AdvertisementController = ({ children }): JSX.Element => {
  const user = useUser();
  const [advertisement, setAdvertisement] = useState<Advertisement>(defaultAdvertisement);

  useEffect(() => {
    if (user) {
      setAdvertisement((oldAdvert) => {
        return { ...oldAdvert, host_id: user.id };
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
