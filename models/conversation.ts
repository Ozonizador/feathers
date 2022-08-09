import { Message } from "./message";
import { Profile } from "./profile";
import { Reservation } from "./reservation";

export const CONVERSATION_TABLE_NAME = "conversations" as const;

export interface Conversation {
  id?: string;
  tenantId: string;
  hostId: string;
  reservationId: string;

  host?: Profile;
  tenant?: Profile;
  messages?: Message[];
  reservation?: Reservation;

  createdAt?: Date;
  updatedAt?: Date;
}

/* VALUES FOR DB */
export const CONVERSATION_PROPERTIES = {
  TENANT_ID: "tenantId",
  HOST_ID: "hostId",
  RESERVATION_ID: "reservationId",
  ID: "id",
  UPDATED_ID: "updatedAt",
  CREATED_ID: "createdAt",
} as const;
