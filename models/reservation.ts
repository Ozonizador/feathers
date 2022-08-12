import Advertisement from "./advertisement";
import { Profile } from "./profile";
import { Stay } from "./stay";

export const RESERVATION_TABLE_NAME = "reservations" as const;

export interface Reservation {
  id?: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  advertisementId: string;
  tenantId: string;

  advertisement?: Advertisement;
  tenant?: Profile;

  stay?: Stay;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ReservationStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CHANGE_REQUESTED = "CHANGE_REQUESTED",
  CHANGE_ACCEPTED = "CHANGE_ACCEPTED",
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
}
