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

  const setNotificationAsSeen = async (id: string) => {
    const { data, error } = await supabaseClient
    .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
    .update({seen: true})
    .eq(NOTIFICATION_PROPERTIES.ID, id);
    return { data, error };
  }

  return { addNotification, getNotifications, setNotificationAsSeen };
};

export default useNotificationService;
