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
import { UnideskStructure } from "../../components/unidesk/UnideskStructure";
import MenuSenhorio from "../../components/unidesk/Menus/MenuSenhorio";
import { getCookie } from "cookies-next";
import MenuEstudante from "../../components/unidesk/Menus/MenuEstudante";

const paths = [
  { url: UNIDESK_URL, label: "Unidesk" },
  { url: "", label: "notifications" },
] as BreadcrumbPath[];

const Notifications = () => {
  const { t } = useTranslation();
  const { getNotifications, setAsSeen } = useNotificationService();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const clearNotifications = useClearNotifications();
  const profile = useCurrentUser();
  const state = getCookie("navbar");

  const getUserNotifications = useCallback(async () => {
    setIsLoading(true);
    if (profile) {
      // @ts-ignore
      const { data, error } = await getNotifications(profile[0].id);
      if (!error) {
        setNotifications(data as Notification[]);
        // @ts-ignore
        setAsSeen(profile[0].id);
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
    <section>
      <Breadcrumbs icon={iconfavorito} paths={paths} />
      <UnideskStructure>
        <UnideskStructure.Menu>
          {state == "TENANT" ? (
            <MenuEstudante activeSection="notifications" activeUrl="general" />
          ) : (
            <MenuSenhorio activeSection="notifications" activeUrl="main_panel" />
          )}
        </UnideskStructure.Menu>

        <div className="flex min-[1020px]:w-5/6 flex-col gap-3 px-3 pt-12 lg:mx-auto">
          <div className="container mx-auto w-full">
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
                    (notifications.length == 0 && (
                      <div className="flex justify-center text-xl">{t("adimn:unidesk.no_notifications")}</div>
                    ))}
                </div>
              )}
            </>
          </div>
        </div>
      </UnideskStructure>
    </section>
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
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
