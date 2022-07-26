export const REPORTS_TABLE_NAME = "reports" as const;

export interface Report {
  id?: string;
  advertisementId: string;
  tenantId: string;
  description: string;
  type: ReportsType;

  createdAt?: Date;
  updatedAt?: Date;
}

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
  TENANT_ID: "tenantId",
} as const;
