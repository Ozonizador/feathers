import { Database } from "../database.types";
import { Profile } from "./profile";
import { ReservationWithAdvertisement } from "./reservation";

export const CONVERSATION_TABLE_NAME = "conversations" as const;

export type Conversations = Database["public"]["Tables"]["conversations"];
export type Conversation = Conversations["Row"];

export type ConversationWithTenant = Conversation & {
  tenant: Profile;
  reservation: ReservationWithAdvertisement;
};

/* VALUES FOR DB */
export const CONVERSATION_PROPERTIES = {
  TENANT_ID: "tenant_id",
  HOST_ID: "host_id",
  RESERVATION_ID: "reservation_id",
  ID: "id",
  UPDATED_ID: "updated_at",
  CREATED_ID: "created_at",
} as const;
