import {
  Notification,
  NotificationsResponse,
  NOTIFICATION_PROPERTIES,
  NOTIFICATION_TABLE_NAME,
} from "../models/notification";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/* DB */
const useNotificationService = () => {
  const supabaseClient = useSupabaseClient();

  const addNotification = async (review: Notification) => {
    const { data, error } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .insert(review)
      .single();

    return { data, error };
  };

  const getNotifications = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .select()
      .eq(NOTIFICATION_PROPERTIES.PROFILE_ID, userId);
    return { data, error };
  };

  const setAsSeen = async (profileid: string) => {
    const {data, error} = await supabaseClient.rpc<"notification_seen", Notification>("notification_seen", {profileid});

  }

  return { addNotification, getNotifications, setAsSeen };
};

export default useNotificationService;
