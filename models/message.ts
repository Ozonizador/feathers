import { Profile } from "./profile";

export const MESSAGE_TABLE_NAME = "messages" as const;

export interface Message {
  id: string;
  message: string;

  profile_id: string;
  profile?: Profile;
  conversation_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export const MESSAGE_TABLE_PROPERTIES = {
  ID: "id",
  MESSAGE: "message",
  CONVERSATION_ID: "conversation_id",
  PROFILE_ID: "profile_id",
} as const;
