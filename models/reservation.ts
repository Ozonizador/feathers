import { Database } from "../database.types";
import { Advertisement } from "./advertisement";
import { Profile } from "./profile";
import { Report } from "./report";
import { Review } from "./review";

export const RESERVATION_TABLE_NAME = "reservations" as const;
export const MODIFY_RESERVATION_FUNCTION = "modify_reservation" as const;

export type Reservations = Database["public"]["Tables"]["reservations"];
export type Reservation = Reservations["Row"];

export type ReservationWithAdvertisement = Reservation & { advertisement: Advertisement };

export type ReservationPaymentStays = Database["public"]["Enums"]["payment_status_type"];
export type ReservationStatus = Database["public"]["Enums"]["ReservationStatus"];

export const RESERVATION_TABLE = {
  ID: "id",
  ADVERT_ID: "advertisement_id",
  TENANT_ID: "tenant_id",
  STATUS: "status",
  HOST_ID: "advertisement.host_id",
  START_DATE: "start_date",
  END_DATE: "end_date",
  NUMBER_GUESTS: "number_guests",
  PAYMENT_STATUS: "payment_status",
} as const;

export enum ReservationStatusLabel {
  REQUESTED = "Pedido de Reserva",
  ACCEPTED = "Reserva Aceite",
  REJECTED = "Reserva Rejeitada",
  CHANGE_ACCEPTED = "Alteração de Reserva Aceite",
  CHANGE_REQUESTED = "Alteração de Reserva",
  CHANGE_REJECTED = "Alteração de Reserva Rejeitada",
}

export type ReservationWithReportsReviews = Reservation & {
  reports: Report[];
  reviews: Review[];
};

export type ReservationWithPrivateReview = Reservation & {
  reviews: Omit<Review, "public_review" | "id" | "updated_at">;
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
};

export type ReservationWithPublicReview = Reservation & {
  reviews: Omit<Review, "private_review" | "reservation_id" | "updated_at">[];
  tenant: Pick<Profile, "name" | "surname" | "avatar_url">;
};

export type ReservationGuest = ReservationWithAdvertisement & {
  tenant: Pick<Profile, "id" | "name" | "avatar_url">;
};

export type ReservationComplete = ReservationWithAdvertisement & {
  reviews: Review[];
  reports: Report[];
};
