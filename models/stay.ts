import { Advertisement } from "./advertisement";
import { Profile } from "./profile";
import { Report } from "./report";
import { Reservation } from "./reservation";
import { Review } from "./review";

export const STAYS_TABLE_NAME = "stays" as const;

export type Stay = {
  id?: string;
  start_date: Date;
  end_date: Date;

  // Advertisement
  advertisement_id: string;
  tenant_id: string;

  // Reservations associated with Stay
  reservations: Reservation[];

  report?: Report;
  review?: Review;
  created_at?: Date;
  updated_at?: Date;
};

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "advertisement_id",
  REPORT: "reports",
  TENANT_ID: "tenant_id",
  START_DATE: "start_date",
  END_DATE: "end_date",
  ADVERTISEMENT_HOST: "advertisement.host",
} as const;

export type StayDates = Pick<Stay, "start_date" | "end_date">;

/*
 * composed types
 */

/* FOR GUESTS PANEL */

export type StayGuest = Stay & {
  advertisement: Partial<Advertisement>;
  tenant: Pick<Profile, "name" | "avatar_url">;
  "advertisement.host_id": string;
};
