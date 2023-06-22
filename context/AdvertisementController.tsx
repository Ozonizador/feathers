import {
  Advertisement,
  AboutHouseSections,
  AdvertisementStatus,
  HouseExpenses,
  HouseRules,
  InclusiveExpenses,
  HostType,
  HostFlexType,
  TypeAdvertisement,
} from "../models/advertisement";
import { v4 as uuidv4 } from "uuid";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { createRandomUniqWord } from "../utils/utils";

/* ADVERTISEMENT */
const defaultAdvertisement = {
  id: uuidv4(),
  slug: createRandomUniqWord(),
  type: "ENTIRE_SPACE" as TypeAdvertisement,
  type_flex_host: "SUPER_FLEX" as HostFlexType,
  type_host: "PARTICULAR" as HostType,
  place: "",
  street: "",
  street_number: "",
  floor: "",
  postal_code: "",
  title: "",
  description: "",
  host_id: "",
  rooms: 1,
  beds: 1,
  tenant_number: 1,
  bathrooms: 1,
  month_rent: 0,
  extra_per_host: 0,
  guarantee_value: 0,
  house_rules: {
    smokeAllowed: false,
    eventsAllowed: false,
    otherRules: "",
    animalsAllowed: false,
    cleaning: "MENSAL",
  } as HouseRules,
  expenses: {
    inclusive: InclusiveExpenses.INCLUDED,
    services: [
      { name: "GAS", included: "INCLUDED" },
      { name: "INTERNET", included: "INCLUDED" },
      { name: "WATER", included: "INCLUDED" },
      { name: "LIGHTS", included: "INCLUDED" },
    ],
  } as HouseExpenses,
  host_lives_property: false,
  available: "DISABLED" as AdvertisementStatus,
  geom: null,
  agreementsinfo: {},
} as Advertisement;

const AdvertisementContext = createContext<Advertisement>(defaultAdvertisement);
const SetAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

interface MemoryFiles {
  files: File[];
  filesUrl: string[];
}

// memory files
const ImageFilesContext = createContext<MemoryFiles>({ files: [], filesUrl: [] });
const SetImageFilesContext = createContext<Dispatch<SetStateAction<MemoryFiles>>>(() => {});

interface AdvertisementControllerProps {
  children: ReactNode;
}

export const AdvertisementController = ({ children }: AdvertisementControllerProps): JSX.Element => {
  const user = useUser();
  const [advertisement, setAdvertisement] = useState<Advertisement>(defaultAdvertisement);
  const [fileInfo, setFileInfo] = useState<MemoryFiles>({ files: [], filesUrl: [] });

  useEffect(() => {
    if (user) {
      setAdvertisement((oldAdvert) => {
        return { ...oldAdvert, host_id: user.id };
      });
    }
  }, [user]);

  return (
    <AdvertisementContext.Provider value={advertisement}>
      <SetAdvertisementContext.Provider value={setAdvertisement}>
        <ImageFilesContext.Provider value={fileInfo}>
          <SetImageFilesContext.Provider value={setFileInfo}>{children}</SetImageFilesContext.Provider>
        </ImageFilesContext.Provider>
      </SetAdvertisementContext.Provider>
    </AdvertisementContext.Provider>
  );
};

export const useAdvertisement = (): Advertisement => {
  return useContext(AdvertisementContext);
};

// advertisement main information

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

// images

export const useImageFiles = () => {
  return useContext(ImageFilesContext);
};

export const useSetImageFiles = () => {
  const setMemoryFiles = useContext(SetImageFilesContext);
  return (files: MemoryFiles) => {
    setMemoryFiles(files);
  };
};
