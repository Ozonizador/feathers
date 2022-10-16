import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Advertisement } from "../models/advertisement";

/* Senhorio anuncio context */
const MenuSenhorioAnuncioContext = createContext<Advertisement>(null);
const SetMenuSenhorioAnuncioContext = createContext<Dispatch<SetStateAction<Advertisement>>>(() => {});

export const MenuSenhorioProvider = ({ children }): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<Advertisement>(null);

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
