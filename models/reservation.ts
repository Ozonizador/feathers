import Advertisement from "./advertisement";
import { Profile } from "./profile";
import { Stay } from "./stay";

export const RESERVATION_TABLE_NAME = "reservations" as const;

export type Reservation = {
  id?: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  advertisementId: string;
  tenantId: string;
  stayId?: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type ReservationWithAdvertisement = Reservation & {
  advertisement: Partial<Advertisement>;
  tenant: Pick<Profile, "name">;
  "advertisement.hostId": string;
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
  ADVERT_ID: "advertisementId",
  TENANT_ID: "tenantId",
  START_DATE: "startDate",
  END_DATE: "endDate",
  STATUS: "status",
  HOST_ID: "advertisement.hostId",
} as const;

export enum ReservationStatusLabel {
  REQUESTED = "Pedido de Reserva",
  ACCEPTED = "Reserva Aceite",
  REJECTED = "Reserva Rejeitada",
  CHANGE_ACCEPTED = "Alteração de Reserva Aceite",
  CHANGE_REQUESTED = "Alteração de Reserva",
  CHANGE_REJECTED = "Alteração de Reserva Rejeitada",
}
