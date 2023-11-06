import { ReactNode, useContext } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

/* STEPS */
const DesativarStepContext = createContext<number>(0);
const DesativarReasonContext = createContext<string>("");
const SetDesativarStepContext = createContext<Dispatch<SetStateAction<number>>>(() => {});
const SetDesativarReasonContext = createContext<Dispatch<SetStateAction<string>>>(() => {});

interface DesativarProviderProps {
  children: ReactNode;
}

export const DesativarProvider = ({ children }: DesativarProviderProps): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentReason, setCurrentReason] = useState<string>("");

  return (
    <section>
      <DesativarStepContext.Provider value={currentStep}>
        <DesativarReasonContext.Provider value={currentReason}>
          <SetDesativarStepContext.Provider value={setCurrentStep}>
            <SetDesativarReasonContext.Provider value={setCurrentReason}>{children}</SetDesativarReasonContext.Provider>
          </SetDesativarStepContext.Provider>
        </DesativarReasonContext.Provider>
      </DesativarStepContext.Provider>
    </section>
  );
};

export const useCurrentStep = () => {
  return useContext(DesativarStepContext);
};

export const useCurrentReason = () => {
  return useContext(DesativarReasonContext);
};

export const useSetCurrentReason = () => {
  const setCurrentReason = useContext(SetDesativarReasonContext);
  return (reason: string): void => {
    setCurrentReason(reason);
  };
};

export const useSetCurrentStep = () => {
  const setCurrentStep = useContext(SetDesativarStepContext);
  return (step: number): void => {
    setCurrentStep(step);
  };
};

export const useIncrementStep = () => {
  const setCurrentStep = useContext(SetDesativarStepContext);
  return (): void => {
    setCurrentStep((oldStep) => oldStep + 1);
  };
};

export const useDecrementStep = () => {
  const setCurrentStep = useContext(SetDesativarStepContext);
  let currentStep = useContext(DesativarStepContext);
  return (): void => {
    setCurrentStep((oldStep) => (currentStep !== 0 && --currentStep) || 0);
  };
};
