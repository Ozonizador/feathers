import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Profile } from "../models/profile";
import { checkProfileAndCreate } from "../services/profileService";

interface GeneralUnihostInformation {
  toggleUserType: "SENHORIO" | "ESTUDANTE";
  profile: Profile | null;
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({
  toggleUserType: "ESTUDANTE",
  profile: null,
});
const SetUnihostsWebsiteContext = createContext<
  Dispatch<SetStateAction<GeneralUnihostInformation>>
>(() => {});

export const MainProvider = ({ children }): JSX.Element => {
  const { user } = useUser();
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    toggleUserType: "ESTUDANTE",
    profile: null,
  });

  const checkUserProfile = useCallback(async (userID) => {
    // check if profile exists else create
    const { data, error } = await checkProfileAndCreate(userID);
    if (!error) {
      setCurrentUnihostState((c) => ({ ...c, profile: data }));
    }
  }, []);

  useEffect(() => {
    if (user) {
      checkUserProfile(user.id);
    }
  }, [user, checkUserProfile]);

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

export const useProfileInformation = () => {
  const { profile } = useContext(UnihostsWebsiteContext);
  return profile;
};

export const useToggleUserType = () => {
  const setCurrentInfo = useContext(SetUnihostsWebsiteContext);
  const currentInfo = useContext(UnihostsWebsiteContext);
  return (userType: "SENHORIO" | "ESTUDANTE"): void => {
    setCurrentInfo({ ...currentInfo, toggleUserType: userType });
  };
};

export const useSetProfileInformation = () => {
  const setCurrentInfo = useContext(SetUnihostsWebsiteContext);
  const currentInfo = useContext(UnihostsWebsiteContext);
  return (profile: Profile): void => {
    setCurrentInfo({ ...currentInfo, profile });
  };
};
