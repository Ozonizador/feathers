import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Notification, NOTIFICATION_PROPERTIES, NOTIFICATION_TABLE_NAME } from "../models/notification";
import { v4 as uuidv4 } from 'uuid';

/* DB */

export const addNotification = async (review: Notification) => {
    const { data, error } = await supabaseClient.from<Notification>(NOTIFICATION_TABLE_NAME).insert({...review, id: uuidv4(), updatedAt: new Date()}, { returning: "minimal"}).single();
    return { data, error }
}

export const getNotifications = async (userId: string) => {
    const { data, error } = await supabaseClient.from<Notification>(NOTIFICATION_TABLE_NAME).select().eq(NOTIFICATION_PROPERTIES.PROFILE_ID, userId);
    return { data, error }
}
