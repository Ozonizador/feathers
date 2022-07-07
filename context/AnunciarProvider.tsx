import { useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

/* STEPS */
const AnunciarStepContext = createContext<number>(0);
const SetAnunciarStepContext = createContext<Dispatch<SetStateAction<number>>>(() => {});

export const AnunciarProvider = ({ children }): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <AnunciarStepContext.Provider value={currentStep}>
      <SetAnunciarStepContext.Provider value={setCurrentStep}></SetAnunciarStepContext.Provider>
    </AnunciarStepContext.Provider>
  );
};

export const useCurrentStep = () => {
  return useContext(AnunciarStepContext);
};

export const useSetCurrentStep = () => {
  const setCurrentStep = useContext(SetAnunciarStepContext);
  return (step: number): void => {
    setCurrentStep(step);
  };
};
