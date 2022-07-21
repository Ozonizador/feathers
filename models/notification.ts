
export const NOTIFICATION_TABLE_NAME = "notifications" as const;

export interface Notification {
    id: string,
    title: string,
    description: string,
    url: string,

    profileId: string,
    createdAt: Date,
    updatedAt: Date,
}

/* VALUES FOR DB */
export const NOTIFICATION_PROPERTIES = { 
    PROFILE_ID: "profileId",
    ID: "id"
}  as const;
