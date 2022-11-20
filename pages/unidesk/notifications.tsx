import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "flowbite-react";
import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import NotificationCard from "../../components/notifications/NotificationCard/NotificationCard";
import { useProfileInformation } from "../../context/MainProvider";
import { Notification } from "../../models/notification";
import useNotificationService from "../../hooks/notificationsService";
import BreadcrumbMiddle from "../../components/utils/BreadcrumbMiddle";

// image
import IconNotification from "../../public/images/notificationsIcon.svg";

const Notifications = () => {
  const { getNotifications } = useNotificationService();
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
      <BreadcrumbMiddle icon={IconNotification} title="Notificações" />
      <div className="container mx-auto my-16 w-full lg:w-4/5">
        <>
          {isLoading && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {!isLoading && (
            <div className="flex flex-col gap-1">
              {notifications.map((notification, index) => {
                return <NotificationCard key={index} notification={notification} />;
              })}
              {!notifications ||
                (notifications.length == 0 && <div className="flex justify-center text-xl">Sem notificações.</div>)}
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default Notifications;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
