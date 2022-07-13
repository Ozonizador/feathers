import { useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface GeneralUnihostInformation {
  toggleUserType: "SENHORIO" | "ESTUDANTE" | null;
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({ toggleUserType: null });
const SetUnihostsWebsiteContext = createContext<
  Dispatch<SetStateAction<GeneralUnihostInformation>>
>(() => {});

export const MainProvider = ({ children }): JSX.Element => {
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    toggleUserType: null,
  });

  return (
    <UnihostsWebsiteContext.Provider value={currentUnihostState}>
      <SetUnihostsWebsiteContext.Provider value={setCurrentUnihostState}>
        {children}
      </SetUnihostsWebsiteContext.Provider>
    </UnihostsWebsiteContext.Provider>
  );
};

export const useGetUserType = () => {
  return useContext(UnihostsWebsiteContext);
};

export const useToggleUserType = () => {
  const setCurrentStep = useContext(SetUnihostsWebsiteContext);
  return (userType: "SENHORIO" | "ESTUDANTE"): void => {
    setCurrentStep({ toggleUserType: userType });
  };
};
