import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AdvertisementWithHost } from "../models/advertisement";

/* STEPS */
const SingleAdvertisementContext = createContext<AdvertisementWithHost>(null);
const SetSingleAdvertisementContext = createContext<Dispatch<SetStateAction<AdvertisementWithHost>>>(() => {});

interface ShowingSingleAdvertisementProviderProps {
  advertisement: AdvertisementWithHost;
  children: JSX.Element;
}

export const ShowingSingleAdvertisementProvider = ({
  advertisement,
  children,
}: ShowingSingleAdvertisementProviderProps): JSX.Element => {
  const [singleAdvertisement, setSingleAdvertisement] = useState<AdvertisementWithHost>(advertisement);

  return (
    <SingleAdvertisementContext.Provider value={singleAdvertisement}>
      <SetSingleAdvertisementContext.Provider value={setSingleAdvertisement}>
        {children}
      </SetSingleAdvertisementContext.Provider>
    </SingleAdvertisementContext.Provider>
  );
};

export const useGetSingleAdvertisement = () => {
  return useContext(SingleAdvertisementContext);
};

export const useSetSingleAdvertisement = () => {
  const setAdvertisement = useContext(SetSingleAdvertisementContext);
  return (advertisement: AdvertisementWithHost): void => {
    setAdvertisement(advertisement);
  };
};
