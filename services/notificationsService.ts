import {
  Notification,
  NotificationsResponse,
  NOTIFICATION_PROPERTIES,
  NOTIFICATION_TABLE_NAME,
} from "../models/notification";
import { v4 as uuidv4 } from "uuid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

/* DB */
const useNotificationService = () => {
  const supabaseClient = useSupabaseClient();

  const addNotification = async (review: Notification) => {
    const { data, error } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .insert({ ...review, id: uuidv4(), updated_at: new Date().toDateString() });

    return { data, error };
  };

  const getNotifications = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from<"notifications", NotificationsResponse>(NOTIFICATION_TABLE_NAME)
      .select()
      .eq(NOTIFICATION_PROPERTIES.PROFILE_ID, userId);
    return { data, error };
  };
  return { addNotification, getNotifications };
};

export default useNotificationService;
