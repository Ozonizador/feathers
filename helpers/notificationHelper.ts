import { Notification, NotificationType, NOTIFICATION_TYPES_INFORMATION } from "..//models/notification";
import { Profile } from "../models/profile";

/* Helpers */

export const createNotification = (type: NotificationType, profile: Profile) => {
  return {
    title: NOTIFICATION_TYPES_INFORMATION[type].title,
    description: NOTIFICATION_TYPES_INFORMATION[type].description,
    profile_id: profile.id,
    type,
  } as Notification;
};
