import Advertisement from "./advertisement";
import { Profile } from "./profile";

export const RESERVATION_TABLE_NAME = "reservations" as const;

export type Reservation = {
  id?: string;
  start_date: Date;
  end_date: Date;
  status: ReservationStatus;
  advertisement_id: string;
  tenant_id: string;
  stay_id?: string;

  created_at?: Date;
  updated_at?: Date;
};

export type ReservationWithAdvertisement = Reservation & {
  advertisement: Partial<Advertisement>;
  tenant: Pick<Profile, "name">;
  "advertisement.host_id": string;
};

export enum ReservationStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CHANGE_REQUESTED = "CHANGE_REQUESTED",
  CHANGE_ACCEPTED = "CHANGE_ACCEPTED",
  CHANGE_REJECTED = "CHANGE_REJECTED",
}

export const RESERVATION_TABLE = {
  ID: "id",
  ADVERT_ID: "advertisement_id",
  TENANT_ID: "tenant_id",
  START_DATE: "start_date",
  END_DATE: "end_date",
  STATUS: "status",
  HOST_ID: "advertisement.host_id",
} as const;

export enum ReservationStatusLabel {
  REQUESTED = "Pedido de Reserva",
  ACCEPTED = "Reserva Aceite",
  REJECTED = "Reserva Rejeitada",
  CHANGE_ACCEPTED = "Alteração de Reserva Aceite",
  CHANGE_REQUESTED = "Alteração de Reserva",
  CHANGE_REJECTED = "Alteração de Reserva Rejeitada",
}
