import { Profile, Report } from "@prisma/client";
import { Advertisement } from "./advertisement";
import { Reservation } from "./reservation";
import { Review } from "./review";

export const STAYS_TABLE_NAME = "stays" as const;

export type Stay = {
  id?: string;
  startDate: Date;
  endDate: Date;

  // Advertisement
  advertisementId: string;
  tenantId: string;

  // Reservations associated with Stay
  reservations: Reservation[];

  report?: Report;
  review?: Review;
  createdAt?: Date;
  updatedAt?: Date;
};

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "advertisementId",
  REPORT: "reports",
  TENANT_ID: "tenantId",
  START_DATE: "startDate",
  END_DATE: "endDate",
  ADVERTISEMENT_HOST: "advertisement.host",
} as const;

export type StayDates = Pick<Stay, "startDate" | "endDate">;

/*
 * composed types
 */

/* FOR GUESTS PANEL */

export type StayGuest = Stay & { advertisement: Partial<Advertisement>; tenant: Partial<Profile> };
