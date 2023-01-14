import { Database } from "../database.types";
import { Advertisement } from "./advertisement";
import { Profile } from "./profile";
import { Report } from "./report";
import { Reservation } from "./reservation";
import { Review } from "./review";

export const STAYS_TABLE_NAME = "stays" as const;

export type Stays = Database["public"]["Tables"]["stays"];
export type Stay = Stays["Row"];

export type StayWithReservation = Stay & {
  reservation: Reservation;
  advertisement: Advertisement;
};

export type StayGuest = StayWithReservation & {
  tenant: Pick<Profile, "id" | "name" | "avatar_url">;
};

// todo: confirm this
export type StayDates = Pick<StayWithReservation, "reservation">;

export type StayComplete = StayWithReservation & {
  report: Report;
  review: Review;
};

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "reservation_id",
  REPORT: "reports",
  TENANT_ID: "tenant_id",
} as const;
