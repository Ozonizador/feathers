import { Database } from "../database.types";

export const REPORTS_TABLE_NAME = "reports" as const;

export type ReportsResponse = Database["public"]["Tables"]["reports"];
export type Report = ReportsResponse["Row"];

export enum ReportsType {
  IMPRECISE = "IMPRECISE",
  NOT_REALITY = "NOT_REALITY",
  SCAM = "SCAM",
  OFFENSIVE = "OFFENSIVE",
  OTHER = "OTHER",
}

export const REPORT_TABLE = {
  ID: "id",
  ADVERT_ID: "advertisement_id",
  STAY_ID: "stay_id",
} as const;
