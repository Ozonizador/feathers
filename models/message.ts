import { Database } from "../database.types";
import { Profile } from "./profile";

export const MESSAGE_TABLE_NAME = "messages" as const;

export type Messages = Database["public"]["Tables"]["messages"];
export type Message = Messages["Row"];

export type MessageWithProfile = Message & { profile: Profile };

export const MESSAGE_TABLE_PROPERTIES = {
  ID: "id",
  MESSAGE: "message",
  CONVERSATION_ID: "conversation_id",
  PROFILE_ID: "profile_id",
  SEEN: "seen",
} as const;
