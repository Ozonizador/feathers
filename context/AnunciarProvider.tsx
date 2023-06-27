import { ReactNode, useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

/* STEPS */
const AnunciarStepContext = createContext<number>(0);
const SetAnunciarStepContext = createContext<Dispatch<SetStateAction<number>>>(() => {});

interface AnunciarProviderProps {
  children: ReactNode;
}

export const AnunciarProvider = ({ children }: AnunciarProviderProps): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <AnunciarStepContext.Provider value={currentStep}>
      <SetAnunciarStepContext.Provider value={setCurrentStep}>{children}</SetAnunciarStepContext.Provider>
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

export const useIncrementStep = () => {
  const setCurrentStep = useContext(SetAnunciarStepContext);
  return (): void => {
    setCurrentStep((oldStep) => oldStep + 1);
  };
};

export const useDecrementStep = () => {
  const setCurrentStep = useContext(SetAnunciarStepContext);
  let currentStep = useContext(AnunciarStepContext);
  return (): void => {
    setCurrentStep((oldStep) => (currentStep !== 0 && --currentStep) || 0);
  };
};
