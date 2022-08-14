import { Profile, Report } from "@prisma/client";
import Advertisement from "./advertisement";
import { Reservation } from "./reservation";
import { Review } from "./review";

export const STAYS_TABLE_NAME = "stays" as const;

export interface Stay {
  id?: string;
  startDate: Date;
  endDate: Date;

  // Advertisement
  advertisementId: string;
  advertisement?: Advertisement;
  // Tenant
  tenantId: string;
  tenant?: Profile;

  // Reservations associated with Stay
  reservations: Reservation[];

  report?: Report;
  review?: Review;
  createdAt?: Date;
  updatedAt?: Date;
}

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "advertisementId",
  REPORT: "reports",
  TENANT_ID: "tenantId",
  START_DATE: "startDate",
  END_DATE: "endDate",
} as const;
