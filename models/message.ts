import { Profile } from "./profile";

export const MESSAGE_TABLE_NAME = "messages" as const;

export interface Message {
    id: string,
    message: string,

    profileId: string,
    profile?: Profile
    conversationId: string,
    createdAt?: Date,
    updatedAt?: Date
}

export const MESSAGE_TABLE_PROPERTIES = {
    ID: "id",
    MESSAGE: "message",
    CONVERSATION_ID: "conversationId",
    PROFILE_ID: "profileId"
} as const;