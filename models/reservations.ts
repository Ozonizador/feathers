import Advertisement from "./advertisement";
import { Profile } from "./profile";
import { Stay } from "./stay";

export const RESERVATION_TABLE_NAME = "reservations" as const;

export interface Reservation {
  id?: string;
  startDate: Date;
  endDate: Date;
  status: ReservationStatus;
  advertisementId: String;
  tenantId: String;

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
}

export const RESERVATION_TABLE = {
  ID: "id",
  ADVERT_ID: "advertisementId",
  TENANT_ID: "tenantId",
} as const;
