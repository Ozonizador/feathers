import { Database } from "../database.types";
import { Advertisement } from "./advertisement";

export const RESERVATION_TABLE_NAME = "reservations" as const;
export const MODIFY_RESERVATION_FUNCTION = "modify_reservation" as const;

export type ReservationsResponse = Database["public"]["Tables"]["reservations"];
export type Reservation = ReservationsResponse["Row"];

export type ReservationWithAdvertisement = Reservation & { advertisement: Advertisement };

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
  STATUS: "status",
  HOST_ID: "advertisement.host_id",
  START_DATE: "start_date",
  END_DATE: "end_date",
} as const;

export enum ReservationStatusLabel {
  REQUESTED = "Pedido de Reserva",
  ACCEPTED = "Reserva Aceite",
  REJECTED = "Reserva Rejeitada",
  CHANGE_ACCEPTED = "Alteração de Reserva Aceite",
  CHANGE_REQUESTED = "Alteração de Reserva",
  CHANGE_REJECTED = "Alteração de Reserva Rejeitada",
}
