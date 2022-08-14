import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface FilterAdvertisements {
  filter: any;
  order: any;
}

const defaultFilter = {
  filter: [],
  order: [],
} as FilterAdvertisements;

/* STEPS */
const AnunciarStepContext = createContext<FilterAdvertisements>(defaultFilter);
const SetAnunciarStepContext = createContext<Dispatch<SetStateAction<FilterAdvertisements>>>(() => {});

export const ProcurarAdvertisementsProvider = ({ children }): JSX.Element => {
  const [currentFilter, setCurrentFilter] = useState<FilterAdvertisements>(defaultFilter);

  return (
    <AnunciarStepContext.Provider value={currentFilter}>
      <SetAnunciarStepContext.Provider value={setCurrentFilter}>{children}</SetAnunciarStepContext.Provider>
    </AnunciarStepContext.Provider>
  );
};

export const useCurrentStep = () => {
  return useContext(AnunciarStepContext);
};
