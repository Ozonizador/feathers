import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Profile, UserTypes } from "../models/profile";
import { GEO, MapCoordinates } from "../models/utils";
import useFavouriteService from "../hooks/favouriteService";
import useProfileService from "../hooks/useProfileService";

interface GeneralUnihostInformation {
  toggleUserType: UserTypes;
  profile: Profile | null;
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({
  toggleUserType: "TENANT",
  profile: null,
});
const SetUnihostsWebsiteContext = createContext<Dispatch<SetStateAction<GeneralUnihostInformation>>>(() => {});

/* user location */
const UserLocationContext = createContext<GEO | null>(null);
const SetUserLocationContext = createContext<Dispatch<SetStateAction<GEO>>>(() => {});

type UserSearchInfo = {
  location: string;
  startDate: Date;
  endDate: Date;
  coordinates: MapCoordinates | null;
};

/* searched location */

const UserLocationSearchContext = createContext<UserSearchInfo>({
  location: "",
  startDate: new Date(),
  endDate: new Date(),
  coordinates: null,
});

const SetUserLocationSearchContext = createContext<Dispatch<SetStateAction<UserSearchInfo>>>(() => {});

export const MainProvider = ({ children }): JSX.Element => {
  const [userLocationCoordinates, setUserLocationCoordinates] = useState<GEO | null>(null);
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    toggleUserType: "TENANT",
    profile: null,
  });
  const [userSearch, setUserSearch] = useState<UserSearchInfo>({
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    coordinates: null,
  });

  const user = useUser();
  const { checkProfileAndCreate } = useProfileService();

  const checkUserProfile = useCallback(async () => {
    // check if profile exists else create
    if (user) {
      const { data, error } = await checkProfileAndCreate(user.id, user.user_metadata);
      if (!error) setCurrentUnihostState((c) => ({ ...c, profile: data }));
    }
  }, [user]);

  useEffect(() => {
    checkUserProfile();

    navigator.geolocation.watchPosition(
      function (pos) {
        const newUserPos = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocationCoordinates(newUserPos);
      },
      function errorCallback(error) {},
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, [checkUserProfile]);

  console.log(userLocationCoordinates);
  return (
    <UnihostsWebsiteContext.Provider value={currentUnihostState}>
      <SetUnihostsWebsiteContext.Provider value={setCurrentUnihostState}>
        <UserLocationContext.Provider value={userLocationCoordinates}>
          <SetUserLocationContext.Provider value={setUserLocationCoordinates}>
            <UserLocationSearchContext.Provider value={userSearch}>
              <SetUserLocationSearchContext.Provider value={setUserSearch}>
                {children}
              </SetUserLocationSearchContext.Provider>
            </UserLocationSearchContext.Provider>
          </SetUserLocationContext.Provider>
        </UserLocationContext.Provider>
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
  return (userType: UserTypes): void => {
    setCurrentInfo((currentStatus) => ({ ...currentStatus, toggleUserType: userType }));
  };
};

export const useSetProfileInformation = () => {
  const setCurrentInfo = useContext(SetUnihostsWebsiteContext);
  return (profile: Profile): void => {
    setCurrentInfo((currentStatus) => ({ ...currentStatus, profile }));
  };
};

export const useSetProfileFavouritesInformation = () => {
  const { updateFavouriteFromUser } = useFavouriteService();
  const setCurrentInfo = useContext(SetUnihostsWebsiteContext);
  const currentInfo = useContext(UnihostsWebsiteContext);

  return async (favouriteRooms: string[]): Promise<void> => {
    const { data, error } = await updateFavouriteFromUser(currentInfo.profile.id, favouriteRooms);
    if (!error) {
      setCurrentInfo((currentStatus) => ({ ...currentStatus, profile: data }));
    }
  };
};

/* COORDINATES */

export const useGetUserCoordinates = () => {
  return useContext(UserLocationContext);
};

/* SEARCH */

export const useUserSearch = () => {
  return useContext(UserLocationSearchContext);
};

export const useSetSearchLocationByProperty = () => {
  const setSearch = useContext(SetUserLocationSearchContext);
  return (property: string, value: any) => {
    setSearch((currentSearch) => ({ ...currentSearch, [property]: value }));
  };
};

export const useSetSearchLocation = () => {
  const setSearch = useContext(SetUserLocationSearchContext);
  return (search: UserSearchInfo) => {
    setSearch(search);
  };
};
