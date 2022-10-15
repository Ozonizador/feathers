import { Database } from "../database.types";

export const STAYS_TABLE_NAME = "stays" as const;

export type Stays = Database["public"]["Tables"]["stays"];
export type Stay = Stays["Row"];

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
