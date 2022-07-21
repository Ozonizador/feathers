import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Notification, NOTIFICATION_PROPERTIES, NOTIFICATION_TABLE_NAME } from "../models/notification";

export const addNotification = async (review: Notification, profileId: string) => {
    const { data, error } = await supabaseClient.from<Notification>(NOTIFICATION_TABLE_NAME).insert({...review, updatedAt: new Date(), profileId});
    return { data, error }
}

export const getNotifications = async (userId: string) => {
    const { data, error } = await supabaseClient.from<Notification>(NOTIFICATION_TABLE_NAME).select().eq(NOTIFICATION_PROPERTIES.PROFILE_ID, userId);
    return { data, error }
}
