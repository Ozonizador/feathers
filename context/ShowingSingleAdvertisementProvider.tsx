import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AdvertisementComplete } from "../models/advertisement";

/* STEPS */
const SingleAdvertisementContext = createContext<AdvertisementComplete | undefined>(undefined);
const SetSingleAdvertisementContext = createContext<Dispatch<SetStateAction<AdvertisementComplete | undefined>>>(
  () => {}
);

interface ShowingSingleAdvertisementProviderProps {
  advertisement: AdvertisementComplete;
  children: JSX.Element;
}

export const ShowingSingleAdvertisementProvider = ({
  advertisement,
  children,
}: ShowingSingleAdvertisementProviderProps): JSX.Element => {
  const [singleAdvertisement, setSingleAdvertisement] = useState<AdvertisementComplete | undefined>(advertisement);

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
  return (advertisement: AdvertisementComplete): void => {
    setAdvertisement(advertisement);
  };
};
