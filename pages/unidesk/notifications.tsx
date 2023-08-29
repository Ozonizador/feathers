import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "flowbite-react";
import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import NotificationCard from "../../components/notifications/NotificationCard/NotificationCard";
import { useCurrentUser, useClearNotifications } from "../../context/MainProvider";
import { Notification } from "../../models/notification";
import useNotificationService from "../../hooks/notificationsService";
import BreadcrumbMiddle from "../../components/utils/BreadcrumbMiddle";
import iconfavorito from "../../public/images/icon-pg37-1.svg";

// image
import IconNotification from "../../public/images/notificationsIcon.svg";
import Breadcrumbs, { BreadcrumbPath } from "../../components/utils/Breadcrumbs";
import { UNIDESK_URL } from "../../models/paths";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const paths = [
  { url: UNIDESK_URL, label: "Unidesk" },
  { url: "", label: "inbox" },
] as BreadcrumbPath[];

const Notifications = () => {
  const { t } = useTranslation();
  const { getNotifications } = useNotificationService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const clearNotifications = useClearNotifications();
  const profile = useCurrentUser();

  const getUserNotifications = useCallback(async () => {
    setIsLoading(true);
    if (profile) {
      const { data, error } = await getNotifications(profile.id);
      if (!error) {
        setNotifications(data as Notification[]);
      }
    }
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    getUserNotifications();
  }, [getUserNotifications]);

  useEffect(() => {
    clearNotifications();
  }, []);

  return (
    <div className="mx-5 my-16 rounded-lg border lg:border-none">
      <div className="max-width my-20 rounded-2xl lg:container lg:my-20 lg:w-full lg:px-10">
        <Breadcrumbs icon={iconfavorito} paths={paths} />
      </div>
      <BreadcrumbMiddle icon={IconNotification} title="Notificações" />
      <div className="container mx-auto w-full lg:w-4/5">
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
    </div>
  );
};

export default Notifications;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
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
      ...(await serverSideTranslations(locale ?? "pt", ["navbar", "footer"])),
    },
  };
};
