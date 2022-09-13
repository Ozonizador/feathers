import { Message } from "./message";
import { Profile } from "./profile";
import { Reservation, ReservationWithAdvertisement } from "./reservation";

export const CONVERSATION_TABLE_NAME = "conversations" as const;

export type Conversation = {
  id?: string;
  tenant_id: string;
  host_id: string;
  reservation_id: string;

  messages?: Message[];

  created_at?: Date;
  updated_at?: Date;
};

export type ConversationWithTenant = Conversation & {
  tenant: Partial<Profile>;
  reservation: Partial<ReservationWithAdvertisement>;
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
