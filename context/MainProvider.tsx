import { useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface GeneralUnihostInformation {
  toggleUserType: "SENHORIO" | "ESTUDANTE";
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({
  toggleUserType: "ESTUDANTE",
});
const SetUnihostsWebsiteContext = createContext<
  Dispatch<SetStateAction<GeneralUnihostInformation>>
>(() => {});

export const MainProvider = ({ children }): JSX.Element => {
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    toggleUserType: "ESTUDANTE",
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
