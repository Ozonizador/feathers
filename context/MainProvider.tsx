import { useUser } from "@supabase/auth-helpers-react";
import { ReactNode, useCallback, useContext, useEffect } from "react";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Profile, UserTypes } from "../models/profile";
import { GEO, MapCoordinates } from "../models/utils";
import useFavouriteService from "../hooks/favouriteService";
import useProfileService from "../hooks/useProfileService";
import { useRouter } from "next/router";
import { TYPE_PROFILE_CHOICE_URL } from "../models/paths";
import { checkMonthsInAdvance } from "../utils/utils";

interface GeneralUnihostInformation {
  userAppMode: UserTypes;
  profile: Profile | null;
  notificationNumber: number;
  messagesNumber: number;
}

/* Contexts */
const UnihostsWebsiteContext = createContext<GeneralUnihostInformation>({
  userAppMode: "TENANT",
  profile: null,
  notificationNumber: 0,
  messagesNumber: 0,
});
const SetUnihostsWebsiteContext = createContext<Dispatch<SetStateAction<GeneralUnihostInformation>>>(() => {});

/* user location */
const UserLocationContext = createContext<GEO | undefined>(undefined);
const SetUserLocationContext = createContext<Dispatch<SetStateAction<GEO | undefined>>>(() => {});

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

interface MainProviderProps {
  children: ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps): JSX.Element => {
  const router = useRouter();
  const user = useUser();
  const [locationAccess, setLocationAccess] = useState(false);
  const [userLocationCoordinates, setUserLocationCoordinates] = useState<GEO | undefined>(undefined);
  const [currentUnihostState, setCurrentUnihostState] = useState<GeneralUnihostInformation>({
    userAppMode: "TENANT",
    profile: null,
    notificationNumber: 0,
    messagesNumber: 0,
  });
  const [userSearch, setUserSearch] = useState<UserSearchInfo>({
    location: "",
    startDate: new Date(),
    endDate: checkMonthsInAdvance(new Date()),
    coordinates: null,
  });

  const { checkProfileAndCreate, checkMessagesNotSeen, checkNotificationsNotSeen } = useProfileService();

  const checkUserProfile = useCallback(async () => {
    if (!user) return;

    const { data, error } = await checkProfileAndCreate(user.id, user.user_metadata);
    // @ts-ignore
    !error && setCurrentUnihostState((c) => ({ ...c, profile: data }));
    if (!data) return;
    // @ts-ignore
    if (data.type === null) {
      return router.push(TYPE_PROFILE_CHOICE_URL);
    }

    // @ts-ignore
    data.type !== null &&
      setCurrentUnihostState((currentInfo) => ({
        ...currentInfo,
        // @ts-ignore
        userAppMode: data.prefered_unidesk_state || "TENANT",
      }));
  }, [user]);

  const checkUserNotificationsAndMessages = useCallback(async () => {
    if (!user) return;

    Promise.allSettled([
      checkMessagesNotSeen(user.id, currentUnihostState?.profile?.type),
      checkNotificationsNotSeen(user.id),
    ]).then(([messagesData, notificationData]) => {
      if (messagesData.status == "fulfilled") {
        setCurrentUnihostState((c) => ({ ...c, messagesNumber: messagesData.value }));
      }

      if (notificationData.status == "fulfilled") {
        setCurrentUnihostState((c) => ({ ...c, notificationNumber: notificationData.value || 0 }));
      }
    });
  }, [currentUnihostState.profile]);

  useEffect(() => {
    checkUserNotificationsAndMessages();
  }, [checkUserNotificationsAndMessages]);
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

export const useToggleAppUserMode = () => {
  const setCurrentInfo = useContext(SetUnihostsWebsiteContext);
  return (userType: UserTypes): void => {
    setCurrentInfo((currentStatus) => ({ ...currentStatus, userAppMode: userType }));
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
    if (!currentInfo || !currentInfo.profile) return;
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

export const useGetUserDates = () => {
  const { startDate, endDate } = useContext(UserLocationSearchContext);
  return { startDate, endDate };
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

export const useClearNotifications = () => {
  const setNotificationNumber = useContext(SetUnihostsWebsiteContext);
  return () => {
    setNotificationNumber((currentUnihostState) => ({ ...currentUnihostState, notificationNumber: 0 }));
  };
};

export const useSetMessagesToBeSeen = () => {
  const setMessageNumber = useContext(SetUnihostsWebsiteContext);
  return (messagesNumber: number) => {
    setMessageNumber((currentUnihostState) => ({ ...currentUnihostState, messagesNumber }));
  };
};
