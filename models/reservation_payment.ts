import { Database } from "../database.types";

export const RESERVATION_PAYMENTS_TABLE_NAME = "reservation_payments" as const;

export type ReservationPayments = Database["public"]["Tables"]["reservation_payments"];
export type ReservationPayment = ReservationPayments["Row"];

export type PaymentStatus = Database["public"]["Enums"]["paymentstatus"];
export type PaymentType = Database["public"]["Enums"]["paymenttype"];
