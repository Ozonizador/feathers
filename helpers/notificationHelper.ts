
import { Notification, NOTIFICATION_DESCRIPTION, NOTIFICATION_LINKS, NOTIFICATION_TITLES } from "..//models/notification";
import { Profile } from "../models/profile";

/* Helpers */ 

export const createNotification = (title: String, description: string, url: String, profile: Profile) => {
    return { title: createNotificationTitle(profile,title), 
        description: createNotificationDescription(profile, description), 
        profileId: profile.id,
         url } as Notification;

}

const createNotificationDescription = (profile: Profile, description: String) => {
    let finalDescription = "";
    switch(description) {
        case NOTIFICATION_DESCRIPTION.ACCEPTED_RESERVATION:
            finalDescription = `${profile.name} ${NOTIFICATION_DESCRIPTION.ACCEPTED_RESERVATION}`;
        default: break;
    }
    return finalDescription
}


const createNotificationTitle = (profile: Profile, title: String) => {
    let finalTitle = "";
    switch(title) {
        case NOTIFICATION_TITLES.GOOD_NEWS:
            finalTitle = `${profile.name} ${NOTIFICATION_TITLES.GOOD_NEWS}`;
        default: break;
    }
    return finalTitle
}
