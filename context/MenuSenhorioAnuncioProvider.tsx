import { ReactNode, useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Advertisement } from "../models/advertisement";

/* Senhorio anuncio context */
const MenuSenhorioAnuncioContext = createContext<Advertisement | undefined>(undefined);
const SetMenuSenhorioAnuncioContext = createContext<Dispatch<SetStateAction<Advertisement | undefined>>>(() => {});

interface MenuSenhorioProviderProps {
  children: ReactNode;
}

export const MenuSenhorioProvider = ({ children }: MenuSenhorioProviderProps): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<Advertisement | undefined>(undefined);

  return (
    <MenuSenhorioAnuncioContext.Provider value={currentStep}>
      <SetMenuSenhorioAnuncioContext.Provider value={setCurrentStep}>{children}</SetMenuSenhorioAnuncioContext.Provider>
    </MenuSenhorioAnuncioContext.Provider>
  );
};

export const useSelectedAnuncioMenuSenhorio = () => {
  return useContext(MenuSenhorioAnuncioContext);
};

export const useSetSelectedAnuncioMenuSenhorio = () => {
  const setCurrentAdvertisement = useContext(SetMenuSenhorioAnuncioContext);
  return (advertisement: Advertisement): void => {
    setCurrentAdvertisement(advertisement);
  };
};
