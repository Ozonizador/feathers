import { Message } from "./message";
import { Profile } from "./profile";
import { Reservation, ReservationWithAdvertisement } from "./reservation";

export const CONVERSATION_TABLE_NAME = "conversations" as const;

export type Conversation = {
  id?: string;
  tenantId: string;
  hostId: string;
  reservationId: string;

  messages?: Message[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type ConversationWithTenant = Conversation & {
  tenant: Partial<Profile>;
  reservation: Partial<ReservationWithAdvertisement>;
};

/* VALUES FOR DB */
export const CONVERSATION_PROPERTIES = {
  TENANT_ID: "tenantId",
  HOST_ID: "hostId",
  RESERVATION_ID: "reservationId",
  ID: "id",
  UPDATED_ID: "updatedAt",
  CREATED_ID: "createdAt",
} as const;
