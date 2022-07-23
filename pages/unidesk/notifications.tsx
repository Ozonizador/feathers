import { Spinner } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../components/notifications/Breadcrumbs/Breadcrumb";
import NotificationCard from "../../components/notifications/NotificationCard/NotificationCard";
import { useProfileInformation } from "../../context/MainProvider";
import { Notification } from "../../models/notification";
import { getNotifications } from "../../services/notificationsService";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const profile = useProfileInformation();

  const getUserNotifications = useCallback(async () => {
    setIsLoading(true);
    if (profile) {
      const { data, error } = await getNotifications(profile.id);
      if (!error) {
        setNotifications(data);
      }
    }
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    getUserNotifications();
  }, [getUserNotifications]);
  return (
    <>
      <Breadcrumb />
      <div className="container mx-auto my-16 w-3/5">
        <>
          {isLoading && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {!isLoading && (
            <>
              {notifications.map((notification, index) => {
                return <NotificationCard key={index} notification={notification} />;
              })}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default Notifications;
