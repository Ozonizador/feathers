export const REPORTS_TABLE_NAME = "reports" as const;

export type Report = {
  id?: string;
  advertisementId: string;
  stayId: string;
  description?: string;
  type: ReportsType;

  createdAt?: Date;
  updatedAt?: Date;
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
  ADVERT_ID: "advertisementId",
  STAY_ID: "stayId",
} as const;
