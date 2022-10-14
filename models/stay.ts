import { Database } from "../database.types";
import { Advertisement } from "./advertisement";
import { Profile } from "./profile";

export const STAYS_TABLE_NAME = "stays" as const;

export type StaysResponse = Database["public"]["Tables"]["stays"];
export type Stay = StaysResponse["Row"];

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
