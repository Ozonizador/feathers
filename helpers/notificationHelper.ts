import { Notification, NOTIFICATION_TYPES, NOTIFICATION_TYPES_INFORMATION } from "..//models/notification";
import { Profile } from "../models/profile";

/* Helpers */

export const createNotification = (type: NOTIFICATION_TYPES, url: String, profile: Profile) => {
  return {
    title: NOTIFICATION_TYPES_INFORMATION[type].title,
    description: NOTIFICATION_TYPES_INFORMATION[type].description,
    profileId: profile.id,
    url,
  } as Notification;
};
