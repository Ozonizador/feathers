import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Advertisement } from "../models/advertisement";

/* STEPS */
const SingleAdvertisementContext = createContext<Advertisement>(null);
const SetSingleAdvertisementContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

interface ShowingSingleAdvertisementProviderProps {
  advertisement: Advertisement;
  children: JSX.Element;
}

export const ShowingSingleAdvertisementProvider = ({
  advertisement,
  children,
}: ShowingSingleAdvertisementProviderProps): JSX.Element => {
  const [singleAdvertisement, setSingleAdvertisement] = useState<Advertisement>(advertisement);

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
  return (advertisement: Advertisement): void => {
    setAdvertisement(advertisement);
  };
};
