import { useUser } from "@supabase/auth-helpers-react";
import { useCallback, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Profile, UserTypes } from "../models/profile";
import { GEO, MapCoordinates } from "../models/utils";
import useFavouriteService from "../hooks/favouriteService";
import useProfileService from "../hooks/useProfileService";
import { useRouter } from "next/router";
import { TYPE_PROFILE_CHOICE_URL } from "../models/paths";

interface GeneralUnihostInformation {
  toggleUserType: UserTypes;
  profile: Profile | null;
  notificationNumber: number;
  messagesNumber: number;
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({
  toggleUserType: "TENANT",
  profile: null,
  notificationNumber: 0,
  messagesNumber: 0,
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
  const router = useRouter();
  const [locationAccess, setLocationAccess] = useState(false);
  const [userLocationCoordinates, setUserLocationCoordinates] = useState<GEO | null>(null);
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    toggleUserType: "TENANT",
    profile: null,
    notificationNumber: 0,
    messagesNumber: 0,
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
      if (data.type === null) router.push(TYPE_PROFILE_CHOICE_URL);
    }
  }, [user]);

  const checkUserNotificationsAndMessages = useCallback(async () => {
    if (!user) return;
    // todo use functions checkNotificationsNotSeen and checkMessagesNotSeen
  }, [user]);

  useEffect(() => {
    checkUserProfile();

    //check user location changes in navigator
    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      permissionStatus.onchange = () => {
        setLocationAccess(permissionStatus.state == "granted");
      };

      if (permissionStatus.state == "granted") {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            const newUserPos = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setUserLocationCoordinates(newUserPos);
          },
          function errorCallback(error) {
            console.log(error);
          },
          { maximumAge: 60000, timeout: 5000, enableHighAccuracy: false }
        );
      }
    });
  }, [checkUserProfile, locationAccess]);

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

export const useCurrentUser = () => {
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

/**
 * Notifications and messages
 */

export const useSetNotificationToBeSeen = () => {
  const setNotificationNumber = useContext(SetUnihostsWebsiteContext);
  return (notificationNumber: number) => {
    setNotificationNumber((currentUnihostState) => ({ ...currentUnihostState, notificationNumber }));
  };
};

export const useSetMessagesToBeSeen = () => {
  const setMessageNumber = useContext(SetUnihostsWebsiteContext);
  return (messagesNumber: number) => {
    setMessageNumber((currentUnihostState) => ({ ...currentUnihostState, messagesNumber }));
  };
};
