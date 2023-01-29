import { Database } from "../database.types";
import { Advertisement } from "./advertisement";
import { Profile } from "./profile";
import { Report } from "./report";
import { Reservation } from "./reservation";
import { Review } from "./review";

export const STAYS_TABLE_NAME = "stays" as const;

export const STAY_TABLE = {
  ID: "id",
  RESERVATION_ID: "reservation_id",
  REPORT: "reports",
  TENANT_ID: "tenant_id",
  START_DATE: "reservation.start_date",
  END_DATE: "reservation.end_date",
} as const;

export type StayWithDate = Database["public"]["Views"]["stays_with_dates"]["Row"];
export type Stays = Database["public"]["Tables"]["stays"];
export type Stay = Stays["Row"];

export type StayWithReservation = Stay & {
  reservation: Reservation;
  advertisement: Advertisement;
};

export type StayGuest = StayWithReservation & {
  tenant: Pick<Profile, "id" | "name" | "avatar_url">;
};

export type StayComplete = StayWithReservation & {
  reports: Report[];
  reviews: Review[];
};

export type StayWithPrivateReview = Stay & {
  reviews: Omit<Review, "public_review" | "id" | "updated_at">;
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
};

export type StayWithPublicReview = Stay & {
  reviews: Omit<Review, "private_review" | "stay_id" | "updated_at">[];
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
};

/* ENUMS */
export type StayStatus = Database["public"]["Enums"]["staysstatus"];
