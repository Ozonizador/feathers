
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