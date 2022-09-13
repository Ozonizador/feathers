export const REPORTS_TABLE_NAME = "reports" as const;

export type Report = {
  id?: string;
  advertisement_id: string;
  stay_id: string;
  description?: string;
  type: ReportsType;

  created_at?: Date;
  updated_at?: Date;
};

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
